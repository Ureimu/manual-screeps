import { getStructureMemory } from "frame/construct/utils";
import { registerFN } from "utils/profiler";
import { getSurroundingRoomNames } from "utils/roomNameUtils";
import { recordRoomData } from "../mainControl/recordRoomData";
const unwrappedObserver = {
    run: (room: Room): void => {
        observe(room);
    }
};
unwrappedObserver.run = registerFN(unwrappedObserver.run, "structure.observer.run");
export const observer = unwrappedObserver;

const observeData: { [roomName: string]: ObserveData } = {};

const checkInterval = 3;

interface ObserveData {
    roomList: string[];
    index: number;
}

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
        observeData[room.name] = {
            roomList: getSurroundingRoomNames(room.name, 5),
            index: 0
        };
    }

    const obData = observeData[room.name];
    const obRoomName = obData.roomList[obData.index];

    if (Game.time % checkInterval === 0) {
        observer.observeRoom(obRoomName);
    }
    if (Game.time % checkInterval === 1) {
        //console.log(obRoomName);
        if (Game.rooms[obRoomName]) recordRoomData(Game.rooms[obRoomName]);
        obData.index += 1;
        if (obData.index >= obData.roomList.length) {
            obData.index = 0;
        }
    }
    // TODO 使用getSurroundingRoomNames
    // observer.observeRoom()
}
