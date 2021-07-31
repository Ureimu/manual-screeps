import { stayByRoad } from "creep/action/doOnArrived/stayByRoad";
import { getAvailableNearbyRooms } from "utils/roomTools";
import { checkArray } from "utils/typeCheck";
import { recordRoomData } from "./recordRoomData";

export function scouter(creep: Creep): void {
    if (!global.creepMemory[creep.name]) global.creepMemory[creep.name] = {};
    const scoutRoomName = global.creepMemory[creep.name].scoutRoomName;
    if (scoutRoomName) {
        const targetRoom = Game.rooms[scoutRoomName];

        if (typeof targetRoom !== "undefined") {
            console.log(`进入room${targetRoom.name}`);
            // getNewSource(targetRoom);
            // getScoutInfo(targetRoom);
            // manageOutwardsSourceMaintain(targetRoom);
            global.creepMemory[creep.name].scoutRoomName = undefined;
        }

        if (creep.room.name !== scoutRoomName) {
            creep.moveTo(new RoomPosition(25, 25, scoutRoomName));
        }
    } else {
        if (creep.room.controller?.my && checkArray(creep.room.memory.construct.freeSpacePosList)) {
            stayByRoad.run(creep);
        }
    }
}

export function manageScoutTask(): void {
    const scoutRoomSet = new Set(global.scoutRoomList);
    let myUserName;
    _.forEach(Game.rooms, room => {
        if (room.controller?.my && room.controller.my === true) {
            myUserName = room.controller?.owner?.username;
            const availableRoomNameSet = new Set(getAvailableNearbyRooms(room.name));
            let expandedRoomNameList: string[] = [];
            for (const roomName of availableRoomNameSet) {
                if (Game.rooms[roomName]) {
                    expandedRoomNameList = expandedRoomNameList.concat(getAvailableNearbyRooms(roomName));
                }
            }
            expandedRoomNameList.forEach(roomName => availableRoomNameSet.add(roomName));
            availableRoomNameSet.forEach(roomName => {
                scoutRoomSet.add(roomName);
            });
        }
    });
    if (!global.roomMemory) global.roomMemory = {};
    for (const roomName of scoutRoomSet) {
        const roomScoutMemory = global.roomMemory[roomName]?.scoutInfo;
        if (roomScoutMemory) {
            const room = Game.rooms[roomName];
            if (Game.time - roomScoutMemory.time < 3000 || room?.controller?.owner?.username === myUserName) {
                // 数据未过时或是自己的房间则不用重新侦察
                scoutRoomSet.delete(roomName);
            } else {
                if (!room) {
                    roomScoutMemory.isInScoutProgress = true;
                } else {
                    recordRoomData(room);
                    roomScoutMemory.time = Game.time;
                    roomScoutMemory.roomOwner = room.controller?.owner?.username;
                    roomScoutMemory.isInScoutProgress = false;
                    scoutRoomSet.delete(roomName);
                    console.log(`${roomName}侦察完成，roomOwner:${String(roomScoutMemory.roomOwner)}`);
                }
            }
        } else {
            if (!global.roomMemory[roomName]) global.roomMemory[roomName] = {};
            global.roomMemory[roomName].scoutInfo = {
                time: -Infinity,
                isInScoutProgress: false,
                roomOwner: undefined
            };
        }
    }

    for (const creepName in Game.creeps) {
        if (Game.creeps[creepName].memory.role === "scouter") {
            if (!global.creepMemory[creepName].scoutRoomName) {
                const newRoomName = Array.from(scoutRoomSet.keys())[0];
                global.creepMemory[creepName].scoutRoomName = newRoomName;
                scoutRoomSet.delete(newRoomName);
            }
        }
    }
    global.scoutRoomList = Array.from(scoutRoomSet);
}

declare global {
    namespace NodeJS {
        interface Global {
            scoutRoomList: string[];
        }
    }
    interface GlobalCreepMemory {
        scoutRoomName?: string;
    }
    interface GlobalRoomMemory {
        scoutInfo?: ScoutInfo;
    }
}
export interface ScoutInfo {
    time: number; // timestamp保证数据不会太过时
    isInScoutProgress: boolean;
    roomOwner?: string;
}
