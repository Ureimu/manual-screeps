export function getTotalSiteNum(): number {
    if (!Game.constructionSites) return 0;
    return Object.keys(Game.constructionSites).length;
}
