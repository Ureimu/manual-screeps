export type DiagramDirection = "top bottom" | "bottom top" | "right left" | "left right";
export type DiagramDirectionShortCut = "TB" | "BT" | "RL" | "LR";
export const DiagramDirectionCorrespond: Record<DiagramDirection, DiagramDirectionShortCut> = {
    "top bottom": "TB",
    "bottom top": "BT",
    "left right": "LR",
    "right left": "RL"
};

export type BoxStyle = "rounded rectangle" | "rectangle" | "circle" | "bookmark" | "rhombus";
export const BoxStyleCorrespond: Record<BoxStyle, { left: string; right: string }> = {
    circle: { left: "((", right: "))" },
    "rounded rectangle": { left: "(", right: ")" },
    rectangle: { left: "[", right: "]" },
    bookmark: { left: ">", right: "]" },
    rhombus: { left: "{", right: "}" }
};

export type ConnectStyle = "solid arrow" | "full line" | "dotted arrow" | "big arrow";
export type ConnectStyleShortCut = "-->" | "---" | "-.->" | "==>";
export const ConnectStyleCorrespond: Record<ConnectStyle, ConnectStyleShortCut> = {
    "big arrow": "==>",
    "dotted arrow": "-.->",
    "full line": "---",
    "solid arrow": "-->"
};
