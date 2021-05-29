import { constructionSiteInf, formedLayout } from "construct/type";
import { PosStr } from "utils/RoomPositionToStr";
import { gridLayoutBuildNumberLimit } from "./gridLayout";

export function runLayout(room: Room, layoutName: string, layoutFunc: (room: Room) => void): void {
    if (!room.memory.construct.firstSpawnName) return;
    if (!room.memory.construct.layout) {
        layoutFunc(room);
    }

    let totalSitesNum = room.find(FIND_CONSTRUCTION_SITES).length;

    for (const constructionName in room.memory.construct.layout as formedLayout) {
        const construction = (room.memory.construct.layout as formedLayout)[
            constructionName as BuildableStructureConstant
        ];
        for (const specifiedName in construction) {
            let levelToBuild = 0;
            if (
                typeof (
                    construction[specifiedName as keyof typeof construction] as {
                        levelToBuild?: number;
                    }
                ).levelToBuild !== "undefined"
            ) {
                levelToBuild = (
                    construction[specifiedName as keyof typeof construction] as {
                        levelToBuild?: number;
                    }
                ).levelToBuild as number;
            }
            const buildNumberLimit =
                levelToBuild <= (room.controller as StructureController).level
                    ? gridLayoutBuildNumberLimit[constructionName as BuildableStructureConstant][
                          (room.controller as StructureController).level
                      ]
                    : 0;
            const posStrList = (
                construction[specifiedName as keyof typeof construction] as {
                    posStrList?: string[];
                }
            ).posStrList;
            if (!posStrList) {
                console.log(`[build] ${specifiedName} posStrList不存在,跳过`);
                continue;
            }
            totalSitesNum += putConstructionSites(
                room,
                posStrList,
                specifiedName,
                constructionName as BuildableStructureConstant,
                buildNumberLimit,
                totalSitesNum
            );
            if (totalSitesNum >= 100) {
                break;
            }
        }
    }
}

function initConstructionMemory(room: Room, name: string, structureType: BuildableStructureConstant): void {
    if (!room.memory.construct.construction[structureType]) {
        room.memory.construct.construction[structureType] = {};
    }
    if (!room.memory.construct.construction[structureType]?.[name]) {
        (
            room.memory.construct.construction[structureType] as {
                [name: string]: constructionSiteInf<typeof structureType>;
            }
        )[name] = {
            sitePosList: [],
            hasPutSites: false,
            hasBuilt: false,
            type: structureType,
            num: 0,
            memory: {}
        };
    }
}

function putConstructionSites(
    room: Room,
    posStrList: string[],
    name: string,
    structureType: BuildableStructureConstant,
    buildNumberLimit: number,
    totalSitesNum: number
): number {
    if (room.memory.construct.construction[structureType]?.[name]?.hasPutSites === true) return 0;
    if (buildNumberLimit === 0) return 0;
    const listC = [];
    const posList: RoomPosition[] = [];
    posStrList.forEach(posStr => {
        if (!posStr) {
            console.log(`[build] ${structureType} posStr不存在,跳过`);
            return;
        }
        posList.push(PosStr.getPosFromStr(posStr));
    });
    initConstructionMemory(room, name, structureType);
    for (let i = 0; i < posList.length; i++) {
        const countX = [0, 0];
        let structures: {
            structureType: string;
            pos: RoomPosition;
            destroy?: () => number;
            remove?: () => number;
        }[] = room.find(FIND_STRUCTURES, {
            filter: structure => {
                return structure.structureType === structureType;
            }
        });
        const constructionSites = room.find(FIND_CONSTRUCTION_SITES, {
            filter: constructionSite => {
                return constructionSite.structureType === structureType;
            }
        });
        structures = structures.concat(constructionSites);
        for (const structure of structures) {
            if (structure.pos.isEqualTo(posList[i])) {
                for (const id in room.memory.construct.construction[structureType]?.[name].memory) {
                    const pos = PosStr.getPosFromStr(
                        room.memory.construct.construction[structureType]?.[name].memory[id].pos as string
                    );
                    if (pos.isEqualTo(posList[i])) {
                        countX[1] = 1;
                        break;
                    }
                }
                if (countX[1] === 1) {
                    break;
                }
                (
                    room.memory.construct.construction[structureType] as {
                        [name: string]: constructionSiteInf<typeof structureType>;
                    }
                )[name].num++;
                const sitePosSet = new Set<string>(
                    (
                        room.memory.construct.construction[structureType] as {
                            [name: string]: constructionSiteInf<typeof structureType>;
                        }
                    )[name].sitePosList
                );
                sitePosSet.add(PosStr.setPosToStr(posList[i]));
                (
                    room.memory.construct.construction[structureType] as {
                        [name: string]: constructionSiteInf<typeof structureType>;
                    }
                )[name].sitePosList = Array.from(sitePosSet);
                countX[0] = 1;
                break;
            }
        }
        if (countX[0] === 0) {
            listC[i] = room.createConstructionSite(posList[i], structureType);
            if (listC[i] === OK) {
                totalSitesNum++;
                (
                    room.memory.construct.construction[structureType] as {
                        [name: string]: constructionSiteInf<typeof structureType>;
                    }
                )[name].num++;
                const sitePosSet = new Set<string>(
                    (
                        room.memory.construct.construction[structureType] as {
                            [name: string]: constructionSiteInf<typeof structureType>;
                        }
                    )[name].sitePosList
                );
                sitePosSet.add(PosStr.setPosToStr(posList[i]));
                (
                    room.memory.construct.construction[structureType] as {
                        [name: string]: constructionSiteInf<typeof structureType>;
                    }
                )[name].sitePosList = Array.from(sitePosSet);
                if (totalSitesNum >= 100) {
                    return totalSitesNum;
                }
            }
        }
    }
    if (
        (
            room.memory.construct.construction[structureType] as {
                [name: string]: constructionSiteInf<typeof structureType>;
            }
        )[name].num === posList.length ||
        (
            room.memory.construct.construction[structureType] as {
                [name: string]: constructionSiteInf<typeof structureType>;
            }
        )[name].num === buildNumberLimit
    ) {
        (
            room.memory.construct.construction[structureType] as {
                [name: string]: constructionSiteInf<typeof structureType>;
            }
        )[name].hasPutSites = true;
    }
    return totalSitesNum;
}
