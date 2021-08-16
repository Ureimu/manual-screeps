import { stats } from ".";

export default [
    {
        alias: "ui",
        exec(): void {
            return stats();
        }
    }
];
