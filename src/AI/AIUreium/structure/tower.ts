import { registerFN } from "utils/profiler";
const unwrappedTower = {
    run: (room: Room): void => {
        if (!defend(room)) {
            repair(room, 3300);
        }
    }
};
unwrappedTower.run = registerFN(unwrappedTower.run, "structure.tower.run");
export const tower = unwrappedTower;

function defend(room: Room) {
    const hostiles = room.find(FIND_HOSTILE_CREEPS);
    if (hostiles.length > 0) {
        const username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in room ${room.name}`);
        const towers = room.find(FIND_MY_STRUCTURES, {
            filter: {
                structureType: STRUCTURE_TOWER
            }
        });
        towers.forEach(singleTower => (singleTower as StructureTower).attack(hostiles[0]));

        if (
            hostiles.some(
                creep =>
                    creep.owner.username !== "Invader" &&
                    creep.body.some(
                        body =>
                            body.type === "attack" ||
                            body.type === "work" ||
                            body.type === "carry" ||
                            body.type === "ranged_attack" ||
                            body.type === "heal" ||
                            body.type === "claim"
                    )
            )
        ) {
            room.controller?.activateSafeMode();
        }
        return true;
    } else {
        const damagedCreeps = room.find(FIND_MY_CREEPS).filter(i => i.hits < i.hitsMax);
        if (damagedCreeps.length > 0) {
            const towers = room.find(FIND_MY_STRUCTURES, {
                filter: {
                    structureType: STRUCTURE_TOWER
                }
            });
            towers.forEach(singleTower => (singleTower as StructureTower).heal(damagedCreeps[0]));
            return true;
        }
    }
    return false;
}

function repair(room: Room, hitsMin: number) {
    const towers = room.find(FIND_MY_STRUCTURES, {
        filter: {
            structureType: STRUCTURE_TOWER
        }
    });
    const targets = room.find(FIND_STRUCTURES, {
        filter: object => object.hits < object.hitsMax && object.hits < hitsMin
    });
    targets.sort((a, b) => a.hits - b.hits);
    if (targets.length > 0) {
        towers.forEach(singleTower => (singleTower as StructureTower).repair(targets[0]));
    }
}
