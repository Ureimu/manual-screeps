import { TaskObject } from "utils/Project";
import { outwardsSourceTaskArgs } from "../type";

const start: TaskObject<outwardsSourceTaskArgs, outwardsSourceTaskArgs> = {
    name: "start",
    description: "start",
    start() {
        return "end";
    },
    working() {
        return "end";
    },
    justFinished() {
        return "end";
    }
};
