import { RouteMidpointDetail } from "frame/creep/routePlan/type";
import { PosStr } from "utils/RoomPositionToStr";
import { CreepAction } from ".";
import { state } from "..";

function run(creep: Creep, actionArgs?: string[]): state {
    const pos = PosStr.getPosFromStr(
        (Memory.routes[creep.memory.route.name].routeDetailArray[creep.memory.route.index] as RouteMidpointDetail)
            .pathMidpointPos
    );
    if (!actionArgs) throw new Error("withdraw actionArgs 缺失");
    const [resourceType, ifFill] = actionArgs as [ResourceConstant, "true" | "false"];
    let resourceNumber = 0;

    let droppedResource: Resource<ResourceConstant> | undefined;
    let storableObject: Structure<StructureConstant> | Ruin | Tombstone | undefined;
    const structure = pos.lookFor(LOOK_STRUCTURES).filter(i => "store" in i)[0] as AnyStoreStructure;

    if (existStoredResource(structure, resourceType)) {
        storableObject = structure;
    } else {
        droppedResource = pos.lookFor(LOOK_RESOURCES).filter(resource => resource.resourceType === resourceType)[0];
        if (droppedResource) resourceNumber = droppedResource.amount;
        else {
            const ruin = pos.lookFor(LOOK_RUINS)[0];
            if (existStoredResource(ruin, resourceType)) storableObject = ruin;
            else {
                const tombStone = pos.lookFor(LOOK_TOMBSTONES)[0];
                if (existStoredResource(tombStone, resourceType)) storableObject = tombStone;
            }
        }
    }
    if (storableObject) {
        if (ifFill === "false" ? false : true) {
            return fillCapacity(creep, resourceType, storableObject);
        } else {
            return tryWithdraw(creep, resourceType, storableObject);
        }
    } else {
        if (droppedResource && resourceNumber) {
            creep.pickup(droppedResource);
            return "moving";
        } else {
            return "moving";
        }
    }
}

function fillCapacity(
    creep: Creep,
    resourceType: ResourceConstant,
    storableObject: Structure<StructureConstant> | Ruin | Tombstone
): state {
    const ifWithdrawing = creep.store.getFreeCapacity() !== 0;

    if (ifWithdrawing) {
        creep.withdraw(storableObject, resourceType);
        return "arrived";
    } else {
        return "moving";
    }
}

function tryWithdraw(
    creep: Creep,
    resourceType: ResourceConstant,
    storableObject: Structure<StructureConstant> | Ruin | Tombstone
): state {
    // console.log("tryWithdraw");
    creep.withdraw(storableObject, resourceType);
    return "moving";
}

function existStoredResource(storableObject: { store: Store<ResourceConstant, false> }, resourceType: string) {
    if (storableObject?.store?.[resourceType as ResourceConstant]) return true;
    else return false;
}

export const withdraw: CreepAction = {
    run,
    name: "withdraw",
    description: "拿出",
    type: "stay"
};
