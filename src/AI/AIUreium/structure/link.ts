import { SpecifiedStructureNameList } from "frame/construct/type";
import { registerFN } from "utils/profiler";
import { PosStr } from "utils/RoomPositionToStr";
import { resourceLimit } from "../mainControl/constants/roomResource";
const linkCache: { [name in SpecifiedStructureNameList<"link">]?: Id<StructureLink>[] } = {};
export const getLink = registerFN((room: Room, linkName: SpecifiedStructureNameList<"link">): StructureLink[] => {
    const specifiedLinkCache = linkCache[linkName];
    if (!room.memory.construct.layout) return [];
    const linkPosStrList = room.memory.construct.layout.link?.[linkName]?.posStrList;
    if (!linkPosStrList || !room.memory.construct.construction.link?.[linkName]?.hasBuilt) return [];
    if (!specifiedLinkCache) {
        const linkList = [];
        for (const linkPosStr of linkPosStrList) {
            const linkPos = PosStr.getPosFromStr(linkPosStr);
            const theLink = linkPos.lookFor(LOOK_STRUCTURES).filter(i => i.structureType === "link")[0];
            if (theLink) linkList.push(theLink as StructureLink);
        }
        linkCache[linkName] = linkList.map(i => i.id);
        return linkList;
    } else {
        const linkList = specifiedLinkCache.map(i => Game.getObjectById(i));
        if (linkList.some(i => !i) || linkPosStrList.length !== linkList.length) {
            // 刷新缓存
            linkCache[linkName] = [];
            return getLink(room, linkName);
        } else {
            return linkList as StructureLink[];
        }
    }
}, "structure.link.getLink");

const unwrappedLink = {
    run: (room: Room): void => {
        const centerLinkList = getLink(room, "centerLink");
        const controllerLinkList = getLink(room, "controllerLink");
        const sourceLinkList = getLink(room, "sourceLink");
        const centerLinkToControllerLinkList = cartesianProduct(centerLinkList, controllerLinkList);
        const sourceLinkToCenterLinkList = cartesianProduct(sourceLinkList, centerLinkList);
        sourceLinkToCenterLinkList.forEach(linkList => {
            if (linkList[0].store.energy > 700 && linkList[1].store.energy < 100) {
                linkList[0].transferEnergy(linkList[1]);
            }
        });
        if (room.storage) {
            if (room.storage.store.energy > resourceLimit.storage.energy.min) {
                centerLinkToControllerLinkList.forEach(linkList => {
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
