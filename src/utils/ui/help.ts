import { stats } from ".";

export default [
    {
        alias: "ui",
        exec(): string {
            return stats();
        }
    }
];
