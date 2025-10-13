import { newAcrossTickTask } from "utils/AcrossTick";
import { AcrossTickMemory, AcrossTickReturnCode } from "utils/AcrossTick/type";
import { SegmentManager } from "utils/SegmentManager";
import { roomControlDataSegmentNameList } from "./type";

export const RoomControlBoardValues = {
    getPower: {
        run: true
    },
    harvestMineral: {
        run: true
    },
    claimNewRoom: {
        run: true
    },
    outwardsSource: {
        run: true
    }
};

export function doTaskInSegmentData(task: (arg0: AcrossTickMemory) => AcrossTickReturnCode) {
    SegmentManager.addId(roomControlDataSegmentNameList);
    SegmentManager.activeSegment();
    newAcrossTickTask(
        {
            taskName: "loadRoomControlData",
            executeTick: Game.time + 1,
            intervalTick: 1,
            args: roomControlDataSegmentNameList,
            log: true
        },
        task
    );
}
