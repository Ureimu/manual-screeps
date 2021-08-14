/* eslint-disable no-useless-escape */
import { Base64 } from "js-base64";
import { ProjectNetworkDiagram } from "utils/Project/storage";
import { getUpgradeSpeed } from "frame/visual/roomInf/upgradeSpeed";
import { ScreepsData } from "./type";

export function stats(): string {
    const data: ScreepsData = {
        userData: {
            name: Object.values(Game.spawns)[0].owner.username,
            gcl: Game.gcl,
            gpl: Game.gpl
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
            _.flatten(
                Object.values(room.memory?.AIUreium.outwardsSource).map(value => {
                    return Object.entries(value);
                })
            ).map(
                diagramMemory =>
                    (outwardsSourceDiagram[diagramMemory[0]] = {
                        diagram: Base64.encode(new ProjectNetworkDiagram(diagramMemory[1]).getDiagramCode(false)),
                        name: diagramMemory[0]
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
    return `<script>
        const sendMemoryInfo = ({ source }) => {
            removeEventListener('message', sendMemoryInfo);
            source.postMessage("${Base64.encodeURI(JSON.stringify(data))}", '*')
        };
        addEventListener('message', sendMemoryInfo);
        open('https://ureimu.github.io/manual-screeps-ui/index.html', '_blank', 'fullscreen=yes');

        setTimeout(function () {
            $(".console-controls .md-button:eq(1)").trigger('click');
        });
    <\/script>`.replace(/((\s\s)|\n)/g, "");
}
