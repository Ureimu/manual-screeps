/* eslint-disable no-useless-escape */
import { Base64 } from "js-base64";
import { ProjectNetworkDiagram } from "utils/Project/storage";
import { getUpgradeSpeed } from "frame/visual/roomInf/upgradeSpeed";
import { ScreepsData } from "./type";
import { AcrossTick, newAcrossTickTask } from "utils/AcrossTick";
import { ErrorMapper } from "utils/ErrorMapper";
import { AcrossTickMemory, AcrossTickReturnCode } from "utils/AcrossTick/type";

function getStats(task: AcrossTickMemory): AcrossTickReturnCode {
    const data: ScreepsData = {
        userData: {
            name: Object.values(Game.spawns)[0].owner.username,
            gcl: Game.gcl,
            gpl: Game.gpl,
            error: ErrorMapper.getErrorSegmentMemory()
        },
        shardData: {
            shardName: Game.shard.name
        },
        roomData: {},
        timeData: {
            tick: Game.time,
            time: Date.now()
        },
        globalData: {
            creepBodyConfig: Memory.creepBodyConfig,
            creepGroups: Memory.creepGroups
        }
    };
    _.forEach(Game.rooms, room => {
        if (room.controller?.my && room.find(FIND_MY_SPAWNS).length !== 0) {
            const upgradeSpeed = getUpgradeSpeed(room.name);
            const diagram = new ProjectNetworkDiagram(room.memory?.AIUreium?.maintainRoom);
            const outwardsSourceDiagram: {
                [sourceName: string]: {
                    name: string;
                    diagram: string;
                };
            } = {};

            Object.values(room.memory?.AIUreium.outwardsSource).forEach(sourceRoomMemory =>
                Object.entries(sourceRoomMemory).forEach(sourceMemory => {
                    outwardsSourceDiagram[sourceMemory[0]] = {
                        diagram: Base64.encode(new ProjectNetworkDiagram(sourceMemory[1]).getDiagramCode(false)),
                        name: sourceMemory[0]
                    };
                })
            );
            data.roomData[room.name] = {
                controller: {
                    progress: room.controller.progress,
                    progressTotal: room.controller.progressTotal,
                    progressSpeed: upgradeSpeed[0].toFixed(4),
                    ticksToUpgrade: upgradeSpeed[1].toFixed(0),
                    level: room.controller.level
                },
                creep: {
                    num: Object.keys(room.memory.spawnPool).length
                },
                projectDiagram: {
                    maintenance: Base64.encode(diagram.getDiagramCode(false)),
                    outwardsSource: outwardsSourceDiagram
                },
                name: room.name,
                spawnPool: room.memory.spawnPool
            };
        }
    });
    console.log(
        `<script>
        const sendMemoryInfo = ({ source }) => {
            removeEventListener('message', sendMemoryInfo);
            source.postMessage("${Base64.encodeURI(JSON.stringify(data))}", '*')
        };
        addEventListener('message', sendMemoryInfo);
        open('https://ureimu.github.io/manual-screeps-ui/index.html', '_blank', 'fullscreen=yes');

        setTimeout(function () {
            $(".console-controls .md-button:eq(1)").trigger('click');
        });
    <\/script>`.replace(/((\s\s)|\n)/g, "")
    );
    return "finish";
}

export function stats(): void {
    ErrorMapper.setErrorSegmentActive();
    if (!global.AcrossTickTaskFunction.getStats) {
        AcrossTick.mountTaskFunction({ taskName: "getStats" }, getStats);
    }
    newAcrossTickTask({ taskName: "getStats", args: [], executeTick: Game.time + 1, intervalTick: 1, log: true });
}
