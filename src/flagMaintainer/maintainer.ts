import { ObjectPosDetail, ObjectPosType } from "flagMaintainer/type";
import colorful from "utils/console/colorful";
import { flagTools } from "./tools";

export const flagNameRegExp = /^[EW]\d{1,2}[NS]\d{1,2}[a-z]+(\d{1,2})$/;
export const constructionSiteRegExp = /(ConstructionSite)/;

export function maintainPos(room: Room, typeList: ObjectPosType[]): void {
    if (!room.memory.objectNum) {
        room.memory.objectNum = {};
    }

    for (const type of typeList) {
        const flagList = room.find(FIND_FLAGS, { filter: i => i.name.indexOf(type) !== -1 });
        if (constructionSiteRegExp.test(type)) {
            switch (type) {
                default:
                    createFlagsForObjects(
                        room,
                        type,
                        FIND_CONSTRUCTION_SITES,
                        i => i.structureType === type.split("ConstructionSite")[0]
                    );
                    break;
            }
        } else {
            switch (type) {
                case "source":
                    createFlagsForObjects(room, type, FIND_SOURCES);
                    break;
                case "mineral":
                    createFlagsForObjects(room, type, FIND_MINERALS);
                    break;
                default:
                    createFlagsForObjects(room, type, FIND_STRUCTURES, i => i.structureType === type);
                    break;
            }
        }
        // 移除多余的flag
        flagList.forEach(flag => {
            if (Number(flag.name.split(flagNameRegExp)[1]) >= (room.memory.objectNum[type]?.num as number)) {
                console.log(colorful(`移除旗帜 ${flag.name}`, "yellow"));
                flag.remove();
            }
        });
    }
}

export function createFlagList<T extends ObjectPosType>(room: Room, typeList: T[]): Record<T, string[]> {
    maintainPos(room, typeList);
    return getFlagList(room, typeList);
}

export function getFlagList<T extends ObjectPosType>(room: Room, typeList: T[]): Record<T, string[]> {
    const returnObject: Partial<Record<T, string[]>> = {};
    for (const type of typeList) {
        const objectFlagList: string[] = [];
        if (room.memory.objectNum[type]) {
            for (let index = 0; index < (room.memory.objectNum[type]?.num as number); index++) {
                objectFlagList.push(flagTools.getName(room.name, type, index));
            }
        }
        returnObject[type] = objectFlagList;
    }
    return returnObject as Record<T, string[]>;
}

function createFlagsForObjects<T extends Exclude<FindConstant, FindOptionWithoutPos>>(
    room: Room,
    type: ObjectPosType,
    find: T,
    filter?: FilterFunction<T>
): void {
    const objects = room.find(find, { filter: filter ? filter : () => true });
    objects.forEach((object, index) => {
        const name = flagTools.getName(room.name, type, index);
        if (!Game.flags[name]) {
            object.pos.createFlag(name);
        } else {
            Game.flags[name].setPosition(object.pos);
        }
    });
    (room.memory.objectNum[type] as ObjectPosDetail<typeof type>) = {
        num: objects.length,
        type
    };
}

type FindOptionWithoutPos = FIND_EXIT | FIND_EXIT_BOTTOM | FIND_EXIT_LEFT | FIND_EXIT_RIGHT | FIND_EXIT_TOP;
