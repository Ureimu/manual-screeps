import { getStructureMemory } from "frame/construct/utils";
import { logManager } from "utils/log4screeps";
import { registerFN } from "utils/profiler";
import {
    checkCenterRoomName,
    checkControllerRoomName,
    checkHighwayRoomName,
    getSurroundingRoomNames
} from "utils/roomNameUtils";
import { recordRoomData } from "../control/recordRoomData";
const unwrappedObserver = {
    run: (room: Room): void => {
        observe(room);
    }
};
unwrappedObserver.run = registerFN(unwrappedObserver.run, "structure.observer.run");
export const observer = unwrappedObserver;

const logger = logManager.createLogger("info", "observer");

const observeData: { [roomName: string]: ObserveData } = {};

const checkInterval = 10;
// 按照权值观察房间。权值越大，平均观察次数越多。
const roomTypePower: { [name: string]: number } = {
    highwayRoom: 10,
    controllerRoom: 1,
    centerRoom: 0
};
const powerRightValueEntries = (Object.entries(roomTypePower) as [RoomType, number][])
    .filter(i => i[1] !== 0)
    .map((i, index, array) => [
        i[0],
        array.slice(0, index + 1).reduce((sum, num) => {
            sum += num[1];
            return sum;
        }, 0)
    ]) as [RoomType, number][];

const sumPower = _.reduce(
    roomTypePower,
    (sum, num) => {
        sum += num;
        return sum;
    },
    0
);

interface ObserveData {
    specifiedRooms: { [name in RoomType]: string[] };

    indexList: { [name in RoomType]: number };
    count: number;
}

type RoomType = "highwayRoom" | "controllerRoom" | "centerRoom";

function observe(room: Room) {
    if ((room.controller?.level ?? 0) < 8) return;
    const id: Id<StructureObserver> | undefined = getStructureMemory(room.name, "observer", "observer")
        ?.structureList?.[0]?.id;
    if (!id) return;
    const observer = Game.structures[id] as StructureObserver;
    if (!observer) return;

    if (!(room.name in observeData)) {
        if (checkInterval <= 2) {
            throw new Error(`checkInterval cannot be smaller than 2`);
        }
        const fullRoomList = getSurroundingRoomNames(room.name, 5);
        logger.debug(JSON.stringify(fullRoomList, null, 4));
        observeData[room.name] = {
            specifiedRooms: {
                highwayRoom: fullRoomList.filter(i => checkHighwayRoomName.test(i)),
                controllerRoom: fullRoomList.filter(i => checkControllerRoomName.test(i)),
                centerRoom: fullRoomList.filter(i => checkCenterRoomName.test(i))
            },

            indexList: {
                highwayRoom: 0,
                centerRoom: 0,
                controllerRoom: 0
            },
            count: 0
        };
    }

    //logger.debug(JSON.stringify(observeData[room.name], null, 4));

    const obData = observeData[room.name];
    const sign = obData.count % sumPower;
    const entry = powerRightValueEntries.find(i => i[1] > sign);
    if (!entry) throw new Error("how");
    const roomType = entry[0];

    const obRoomName = obData.specifiedRooms[roomType][obData.indexList[roomType]];

    if (Game.time % checkInterval === 0) {
        observer.observeRoom(obRoomName);
    }
    if (Game.time % checkInterval === 1) {
        logger.debug(`${room.name} observe ${obRoomName}`);
        if (Game.rooms[obRoomName]) recordRoomData(Game.rooms[obRoomName]);

        obData.count += 1;
        obData.indexList[roomType] += 1;
        if (obData.indexList[roomType] >= obData.specifiedRooms[roomType].length) {
            obData.indexList[roomType] = 0;
        }
    }
}
