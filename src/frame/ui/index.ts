/* eslint-disable no-useless-escape */
import { Base64 } from "js-base64";
import { ProjectNetworkDiagram } from "utils/Project/storage";
import { getUpgradeSpeed } from "frame/visual/roomInf/upgradeSpeed";
import { FrameStats, OriginScreepsData, SingleData, SingleTypedTreeData, StoreData } from "./type";
import { AcrossTick, newAcrossTickTask } from "utils/AcrossTick";
import { ErrorMapper } from "utils/ErrorMapper";
import { AcrossTickMemory, AcrossTickReturnCode } from "utils/AcrossTick/type";
import { statsEngine } from "frame/stats";
import loader from "utils/Project/loader";
import { SegmentManager } from "utils/SegmentManager/SegmentManager";
import { waitThenLog } from "utils/AcrossTick/utils";
import { logManager } from "utils/log4screeps";
import { DiagramMemory } from "utils/Project/type";
import { maintainRoomProjectMemoryType } from "AI/AIUreium/projects/maintain/type";
import { newRoomProjectMemoryType } from "AI/AIUreium/projects/newRoom/type";
const logger = logManager.createLogger("debug", "UI");
const segmentsCache: { [id: number]: string } = {};
const debugging = false;
function getStats(task: AcrossTickMemory): AcrossTickReturnCode {
    const inactiveId = statsEngine.getSegmentIdList().find(id => !SegmentManager.isActive(id));
    if (inactiveId) {
        logger.log(`未active id:${inactiveId}`);
        return "finish";
    }
    const seriesData = statsEngine.readData() as unknown as FrameStats<number[]> & {
        timeStamp: SingleData<number[]>;
        gameTime: SingleData<number[]>;
    };
    // waitThenLog(5, `seriesData: \n${JSON.stringify(seriesData, null, 4)}`);
    const data: OriginScreepsData = {
        timeSeriesData: seriesData,
        userData: {
            name: Object.values(Game.spawns)[0].owner.username,
            gcl: Game.gcl,
            gpl: Game.gpl,
            error: ErrorMapper.getErrorSegmentMemory(),
            memoryString: RawMemory.get()
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
            const outwardsSourceDiagram: {
                [sourceName: string]: {
                    name: string;
                    diagram: string;
                };
            } = {};

            Object.values(room.memory?.AIUreium.outwardsSource).forEach(sourceRoomMemory =>
                Object.entries(sourceRoomMemory).forEach(sourceMemory => {
                    outwardsSourceDiagram[sourceMemory[0]] = {
                        diagram: Base64.encode(new ProjectNetworkDiagram(sourceMemory[1], false).getDiagramCode(false)),
                        name: sourceMemory[0]
                    };
                })
            );
            data.roomData[room.name] = {
                store: {
                    terminal: room.terminal as unknown as StoreData,
                    storage: room.storage as unknown as StoreData
                },
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
                    maintenance: Base64.encode(
                        new ProjectNetworkDiagram(
                            room.memory?.AIUreium?.maintainRoom as DiagramMemory<maintainRoomProjectMemoryType>,
                            false
                        ).getDiagramCode(false)
                    ),
                    outwardsSource: outwardsSourceDiagram,
                    getPower: "",
                    // getPower: Base64.encode(
                    //     new ProjectNetworkDiagram(room.memory?.AIUreium?.getPower, false).getDiagramCode(false)
                    // ),
                    newRoom: ""
                    // newRoom: Base64.encode(
                    //     new ProjectNetworkDiagram<newRoomProjectMemoryType>(
                    //         room.memory?.AIUreium?.newRoom as DiagramMemory<newRoomProjectMemoryType>,
                    //         false
                    //     ).getDiagramCode(false)
                    // )
                },
                name: room.name,
                spawnPool: room.memory.spawnPool
            };
        }
    });
    const dataHere = `<script>
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

    if (debugging) {
        loader.download(`export const rawData = \`${Base64.encodeURI(JSON.stringify(data))}\`;`, "rawData.ts");
    } else {
        console.log(dataHere);
    }
    return "finish";
}

AcrossTick.mount("getStats", getStats);

export function stats(): void {
    const idList = ([] as number[]).concat(statsEngine.getSegmentIdList(), ErrorMapper.getErrorSegmentId());
    // TODO 当idList的长度大于十的时候，需要依次取出所有数据放入全局cache再打开ui。
    const addedList = SegmentManager.addId(idList);
    // waitThenLog(5, `try active: ${idList.toString()}, success: ${addedList.toString()}`);

    newAcrossTickTask({ taskName: "getStats", args: [], executeTick: Game.time + 1, intervalTick: 1, log: true });
}
