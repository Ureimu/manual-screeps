import { registerFN } from "profiler";
import { GUIfun } from "utils/roomVisualGUI";
import { printMulText } from "utils/roomVisualGUI/utils";
import { getCreepNum, getBpSumInSpawnQueue } from "../roomInf/creeps";
import { getUpgradeSpeed } from "../roomInf/upgradeSpeed";

export const roomVisualize = registerFN((room: Room): void => {
    const upgradeSpeed = getUpgradeSpeed(room.name);
    room.memory.stats = {
        upgradeSpeed: upgradeSpeed[0].toFixed(4),
        creepNum: getCreepNum(room.name),
        ticksToUpgrade: upgradeSpeed[1].toFixed(0),
        creepBodySizeInSpawnQueue: {}
    };
    for (const spawn of room.find(FIND_MY_SPAWNS)) {
        room.memory.stats.creepBodySizeInSpawnQueue[spawn.name] = getBpSumInSpawnQueue(spawn);
    }
    GUIfun().draw(new RoomVisual(room.name), [
        {
            type: "Div",
            layout: {
                x: 0,
                y: 0,
                width: 15,
                height: 5,
                background: "#000000",
                opacity: 0.5
            },
            child: printMulText({
                content: `现在的游戏时间是${Game.time}tick\n能量值：\n工地数：\n升级速度：${room.memory.stats.upgradeSpeed}/tick,还有${room.memory.stats.ticksToUpgrade}ticks升到下一级`,
                x: 0,
                y: 0,
                align: "left"
            }).concat([
                {
                    type: "Progress",
                    layout: {
                        width: 10,
                        value: (room.energyAvailable / room.energyCapacityAvailable) * 100,
                        x: 3,
                        y: 1.215
                    }
                },
                {
                    type: "Text",
                    layout: {
                        content: `${room.energyAvailable}/${room.energyCapacityAvailable}`,
                        x: 5 + 3,
                        y: 1,
                        align: "center",
                        stroke: "#000000"
                    }
                },
                {
                    type: "Progress",
                    layout: {
                        width: 10,
                        value: (room.memory.construct.roomControlStatus[3] / 100) * 100,
                        x: 3,
                        y: 2.215
                    }
                },
                {
                    type: "Text",
                    layout: {
                        content: `${room.memory.construct.roomControlStatus[3]}/${100}`,
                        x: 5 + 3,
                        y: 2,
                        align: "center",
                        stroke: "#000000"
                    }
                }
            ])
        }
    ]);
}, "roomVisualize");
