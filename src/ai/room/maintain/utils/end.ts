export const endState = {
    name: "endState",
    run: () => {
        return "endState";
    },
    description: `endState`
};

export function getStartState(linkState: string) {
    return {
        name: "startState",
        run: () => {
            return linkState;
        },
        description: `startState`
    };
}
