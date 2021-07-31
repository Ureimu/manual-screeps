/* eslint-disable no-useless-escape */
import { Base64 } from "js-base64";
import { ProjectNetworkDiagram } from "utils/ProjectNetworkDiagram";
import { getUpgradeSpeed } from "visual/roomInf/upgradeSpeed";
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
        }
    };
    _.forEach(Game.rooms, room => {
        if (room.controller?.my && room.find(FIND_MY_SPAWNS).length !== 0) {
            const upgradeSpeed = getUpgradeSpeed(room.name);
            const diagram = new ProjectNetworkDiagram(room.memory?.AIUreium?.maintainRoom);
            data.roomData[room.name] = {
                controller: {
                    progress: room.controller.progress,
                    progressTotal: room.controller.progressTotal,
                    progressSpeed: upgradeSpeed[0].toFixed(4),
                    ticksToUpgrade: upgradeSpeed[1].toFixed(0),
                    level: room.controller.level
                },
                creep: {
                    num: 999
                },
                projectDiagram: {
                    maintenance: Base64.encode(diagram.getDiagramCode(false)),
                    outwardsSource: {}
                },
                name: room.name
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
