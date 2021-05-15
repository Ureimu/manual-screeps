export type ControllerLevels = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

declare global {
    interface Memory {
        creepBodyConfig: {
            [name: string]: Partial<
                {
                    [p in ControllerLevels]: {
                        body: string;
                    };
                }
            >;
        };
    }
}
