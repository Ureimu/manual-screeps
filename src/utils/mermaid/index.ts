import { Colors, colors } from "utils/console/colorful";
import {
    BoxStyle,
    BoxStyleCorrespond,
    ConnectStyle,
    ConnectStyleCorrespond,
    DiagramDirection,
    DiagramDirectionCorrespond
} from "./type";
import { Base64 } from "js-base64";

export class mermaid {
    public mermaidContentList: string[];
    public constructor() {
        this.mermaidContentList = [];
    }

    public chooseDirection(direction: DiagramDirection): void {
        this.mermaidContentList.push(`graph ${DiagramDirectionCorrespond[direction]}`);
    }
    public addEdge(
        startNodeID: string,
        startNodeContent: string,
        endNodeID: string,
        endNodeContent: string,
        opts: { annotation: string; boxStyle: BoxStyle; connectStyle: ConnectStyle } = {
            annotation: "",
            boxStyle: "rounded rectangle",
            connectStyle: "solid arrow"
        }
    ): void {
        const { annotation = "", boxStyle = "rounded rectangle", connectStyle = "solid arrow" } = opts;
        this.mermaidContentList.push(
            `${startNodeID}${this.boxed(startNodeContent, boxStyle)} ${ConnectStyleCorrespond[connectStyle]}${
                annotation !== "" ? `|${annotation}|` : ""
            } ${endNodeID}${this.boxed(endNodeContent, boxStyle)}`
        );
    }
    public setNodeStyle(nodeID: string, opts: { fill: Colors; stroke: string; strokeWidth: string }): void {
        const { fill = "blue", stroke = "#333", strokeWidth = "2px" } = opts;
        this.mermaidContentList.push(
            `style ${nodeID} fill:${colors[fill]},stroke:${stroke},stroke-width:${strokeWidth}`
        );
    }
    public draw(): string {
        const base64Code = Base64.encodeURI(this.mermaidContentList.join("\n"));
        return `<a href="https://mermaid-js.github.io/mermaid-live-editor/#/edit/${base64Code}">点击查看流程图</a>`;
    }
    public printCode(): string {
        return this.mermaidContentList.join("\n");
    }
    public showInBrowser(): string {
        return `<script>
        const sendMemoryInfo = ({ source }) => {
            removeEventListener('message', sendMemoryInfo);
            source.postMessage(${this.mermaidContentList.join(" ")}, '*')
        };
        addEventListener('message', sendMemoryInfo);
        open('https://screeps-cn.github.io/memory-analyzer/main.html', '_blank', 'fullscreen=no');

        setTimeout(function () {
        $(".console-controls .md-button:eq(1)").trigger('click');
        });
    </script>`.replace(/\n/g, "");
    }
    private boxed(content: string, boxStyle: BoxStyle) {
        return `${BoxStyleCorrespond[boxStyle].left}"${content}"${BoxStyleCorrespond[boxStyle].right}`;
    }
}
