import { AiRoomSettingForm } from "../control/room/form";

declare global {
    namespace NodeJS {
        interface Global {
            AIUreiumFC: { AiRoomSettingForm: typeof AiRoomSettingForm };
        }
    }
}

// 挂载全局拓展
export default function mountGlobalFunctionClass(): void {
    global.AIUreiumFC = { AiRoomSettingForm };
}
