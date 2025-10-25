import { SpecifiedStructureNameList } from "frame/construct/type";
import { getStructureMemory } from "frame/construct/utils";
import { registerFN } from "utils/profiler";
import { PosStr } from "utils/RoomPositionToStr";
import { resourceLimit } from "../control/constants/roomResource";
export const getLink = registerFN((room: Room, linkName: SpecifiedStructureNameList<"link">): StructureLink[] => {
    if (!room.memory.construct.layout) return [];
    const memory = getStructureMemory(room.name, "link", linkName);
    if (!memory) return [];
    return memory.structureList.map(({ id }) => {
        return Game.structures[id] as StructureLink;
    });
}, "structure.link.getLink");

const unwrappedLink = {
    run: (room: Room): void => {
        const centerLinkList = getLink(room, "centerLink");
        const controllerLinkList = getLink(room, "controllerLink");
        const sourceLinkList = getLink(room, "sourceLink");
        const centerLinkToControllerLinkList = cartesianProduct(centerLinkList, controllerLinkList);
        const sourceLinkToCenterLinkList = cartesianProduct(sourceLinkList, centerLinkList);
        sourceLinkToCenterLinkList.forEach(linkList => {
            if (linkList[0].cooldown > 0) return;
            if (linkList[0].store.energy > 700 && linkList[1].store.energy < 100) {
                linkList[0].transferEnergy(linkList[1]);
            }
        });
        if (room.storage) {
            if (room.storage.store.energy > resourceLimit.storage.energy.min) {
                centerLinkToControllerLinkList.forEach(linkList => {
                    if (linkList[0].cooldown > 0) return;
                    if (linkList[0].store.energy > 400 && linkList[1].store.energy < 400) {
                        linkList[0].transferEnergy(linkList[1]);
                    }
                });
            }
        }
    }
};
unwrappedLink.run = registerFN(unwrappedLink.run, "structure.link.run");
export const link = unwrappedLink;

function cartesianProduct<T, U extends unknown>(arrayA: T[], arrayB: U[]): [T, U][] {
    const returnList: [T, U][] = [];
    for (const a of arrayA) {
        for (const b of arrayB) {
            returnList.push([a, b]);
        }
    }
    return returnList;
}
