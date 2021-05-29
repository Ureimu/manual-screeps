import { RouteMidpointDetail } from "creep/routePlan/type";
import { PosStr } from "utils/RoomPositionToStr";
import { CreepAction } from ".";
import { state } from "..";

function run(creep: Creep, actionArgs?: string[]): state {
    const pos = PosStr.getPosFromStr(
        (Memory.routes[creep.memory.route.name].routeDetailArray[creep.memory.route.index] as RouteMidpointDetail)
            .pathMidpointPos
    );
    let resourceNumber = 0;
    const resourceType = "energy";
    let droppedResource: Resource<ResourceConstant> | undefined;
    let storableObject: Structure<StructureConstant> | Ruin | Tombstone | undefined;
    const structure = pos.lookFor(LOOK_STRUCTURES)[0] as AnyStoreStructure;
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
        if (actionArgs) {
            const [ifFill] = actionArgs;
            if (ifFill === "false" ? false : true) {
                return fillCapacity(creep, storableObject);
            } else {
                return tryWithdraw(creep, storableObject);
            }
        } else {
            return fillCapacity(creep, storableObject);
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

function fillCapacity(creep: Creep, storableObject: Structure<StructureConstant> | Ruin | Tombstone): state {
    const ifWithdrawing = creep.store.getFreeCapacity() !== 0;

    if (ifWithdrawing) {
        creep.withdraw(storableObject, RESOURCE_ENERGY);
        return "arrived";
    } else {
        return "moving";
    }
}

function tryWithdraw(creep: Creep, storableObject: Structure<StructureConstant> | Ruin | Tombstone): state {
    // console.log("tryWithdraw");
    creep.withdraw(storableObject, RESOURCE_ENERGY);
    return "moving";
}

function existStoredResource(storableObject: { store: Store<ResourceConstant, false> }, resourceType: string) {
    if (storableObject?.store?.[resourceType as ResourceConstant]) return true;
    else return false;
}

export const withdrawEnergy: CreepAction = {
    run,
    name: "withdrawEnergy",
    description: "拿出能量",
    type: "stay"
};
