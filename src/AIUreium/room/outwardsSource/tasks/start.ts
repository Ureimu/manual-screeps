import { TaskObject } from "utils/Project";
import { outwardsSourceTaskArgs } from "../taskRelation";

const start: TaskObject<outwardsSourceTaskArgs> = {
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
