export function versionCheck(): void {
    if (Memory.version) {
        switch (Memory.version) {
            case "0.1.1":
            case "0.1.2":
            default:
                break;
        }
    } else {
        Memory.version = global.version;
    }
    console.log(`[version] ${Memory.version}`);
}
