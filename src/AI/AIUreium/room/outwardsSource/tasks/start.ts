import { outwardsSourceTaskObject } from "../type";

const start: outwardsSourceTaskObject = {
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
