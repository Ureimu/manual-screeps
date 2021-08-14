export function getUpgradeSpeed(roomName: string): number[] {
    const room = Game.rooms[roomName];
    if (room?.controller?.my) {
        if (!global.monitor) global.monitor = {};
        if (!global.monitor[roomName] || global.monitor[roomName].level !== room.controller.level) {
            global.monitor[roomName] = {
                level: room.controller.level,
                upgradeSpeed: [],
                time: Game.time
            };
        }
        if (global.monitor[roomName].time !== Game.time) {
            global.monitor[roomName].upgradeSpeed.push(room.controller?.progress);
            global.monitor[roomName].time = Game.time;
            if (global.monitor[roomName].upgradeSpeed.length > 1500) {
                global.monitor[roomName].upgradeSpeed.shift();
            }
        }

        const progressSpeedList: number[] = [];
        global.monitor[roomName].upgradeSpeed.forEach((progress, index, list) => {
            if (index > 0) {
                progressSpeedList.push(progress - list[index - 1]);
            }
        });
        const sum = progressSpeedList.reduce((sumX, progress) => sumX + progress, 0);
        return [
            sum / progressSpeedList.length,
            (room.controller?.progressTotal - room.controller.progress) /
                Number((sum / progressSpeedList.length).toFixed(4))
        ];
    } else {
        return [0, 0];
    }
}
