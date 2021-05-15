/* eslint-disable no-useless-escape */
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
        endNodeID: string,
        opts: { annotation: string; boxStyle: BoxStyle; connectStyle: ConnectStyle } = {
            annotation: "",
            boxStyle: "rounded rectangle",
            connectStyle: "solid arrow"
        }
    ): void {
        const { annotation = "", connectStyle = "solid arrow" } = opts;
        this.mermaidContentList.push(
            `${startNodeID} ${ConnectStyleCorrespond[connectStyle]}${
                annotation !== "" ? `|${annotation}|` : ""
            } ${endNodeID}`
        );
    }
    public setNodeText(nodeID: string, nodeContent: string, opts: { boxStyle: BoxStyle }): void {
        const { boxStyle = "rounded rectangle" } = opts;
        this.mermaidContentList.push(`${nodeID}${this.boxed(nodeContent, boxStyle)}`);
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
    public printFlattenCode(): string {
        return this.mermaidContentList.join(" ");
    }
    public printMarkdownCode(): string {
        return "```mermaid\n" + this.mermaidContentList.join("\n") + "\n```";
    }
    public static showInBrowser(data: string): string {
        return `<script>
        const sendMemoryInfo = ({ source }) => {
            removeEventListener('message', sendMemoryInfo);
            source.postMessage("${Base64.encodeURI(data)}", '*')
        };
        addEventListener('message', sendMemoryInfo);
        open('https://ureimu.github.io/manual-screeps/tools/mermaid.html', '_blank', 'fullscreen=yes');

        setTimeout(function () {
            $(".console-controls .md-button:eq(1)").trigger('click');
        });
    <\/script>`.replace(/((\s\s)|\n)/g, "");
    }
    private boxed(content: string, boxStyle: BoxStyle) {
        return `${BoxStyleCorrespond[boxStyle].left}"${content}"${BoxStyleCorrespond[boxStyle].right}`;
    }
}
