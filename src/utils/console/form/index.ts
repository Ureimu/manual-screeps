import template from "./template.html";
import style from "./style.html";
import { replaceHtml, fixRetraction } from "../utils";
import { HTMLElementDetail, HTMLElements, HTMLCreator, ButtonDetail } from "./types";

const [
    formTemplate,
    selectTemplate,
    optionTemplate,
    inputTemplate,
    checkboxTemplate,
    radioTemplate,
    buttonTemplate,
    fieldTemplate,
    accordionTemplate,
    accordionOptionTemplate,
    accordionSecondOptionTemplate,
    uploadTemplate
] = template.split(";;");

/**
 * 所有的 html 元素构造器
 */
export const creators: {
    [type in keyof HTMLElements]: (detail: HTMLElements[type]) => string;
} = {
    /**
     * 创建 input 输入框
     * @param detail 创建需要的信息
     */
    input({ name, label = "", placeholder = "" }: HTMLElements["input"]): string {
        const content = replaceHtml(inputTemplate, { name, placeholder });
        return replaceHtml(fieldTemplate, { label, content });
    },

    /**
     * 创建 select 下拉框
     * @param detail 创建需要的信息
     */
    select({ name, label = "", options }: HTMLElements["select"]): string {
        const optionHtml = options.map(opt => replaceHtml(optionTemplate, opt));
        const content = replaceHtml(selectTemplate, { name, option: optionHtml.join("") });
        return replaceHtml(fieldTemplate, { label, content });
    },

    /**
     * 创建 radio 单选框
     * @param detail 创建需要的信息
     */
    radio({ name, label = "", options }: HTMLElements["radio"]): string {
        const content = options.map(opt => replaceHtml(radioTemplate, { ...opt, name })).join("");
        return replaceHtml(fieldTemplate, { label, content });
    },

    /**
     * 创建 checkout 复选框
     * @param detail 创建需要的信息
     */
    checkbox({ name, label = "", options }: HTMLElements["checkbox"]): string {
        const content = options.map(opt => replaceHtml(checkboxTemplate, { ...opt, name })).join("");
        return replaceHtml(fieldTemplate, { label, content });
    },

    /**
     * 创建 button 选框
     * @param detail 创建需要的信息
     */
    button({ content, command = "" }: HTMLElements["button"]): string {
        const HTMLContent = replaceHtml(buttonTemplate, { buttonLabel: content, command });
        return fixRetraction(style + replaceHtml(fieldTemplate, { label: content, content: HTMLContent }));
    },

    /**
     * 创建 accordion 手风琴式菜单框
     * @param detail 创建需要的信息
     */
    accordion({ name, label = "", option }: HTMLElements["accordion"]): string {
        const fullList = [];
        for (const optionName in option.value) {
            const accordionOption: string[] = [];
            option.value[optionName].forEach(secondOption => {
                accordionOption.push(replaceHtml(accordionSecondOptionTemplate, { value: secondOption }));
            });
            fullList.push(
                replaceHtml(accordionOptionTemplate, { listValues: accordionOption.join(""), label: optionName })
            );
        }
        return replaceHtml(accordionTemplate, { value: fullList.join(""), label, name });
    },

    /**
     * 创建 button 选框
     * @param detail 创建需要的信息
     */
    upload({ name, label = "", id }: HTMLElements["upload"]): string {
        const content = replaceHtml(uploadTemplate, { name, id });
        return replaceHtml(fieldTemplate, { label, content });
    }
};

/**
 * 创建表单
 * @param name 表单的名称
 * @param details 表单元素列表
 * @param buttonDetail 按钮的信息
 */
export const createForm = function (
    uniqueName: string,
    details: HTMLElementDetail[],
    buttonDetail: ButtonDetail
): string {
    // 创建唯一的表单名
    const formName = uniqueName + Game.time.toString();

    // 获取所有表单内容
    const elementNames = details.map(({ name }) => `'${name}'`).toString();
    const { content: buttonLabel, command } = buttonDetail;
    const formContent = details.map(detail => (creators[detail.type] as HTMLCreator)(detail)).join("");

    const formHtml =
        style +
        replaceHtml(formTemplate, {
            formName,
            formContent,
            elementNames,
            command,
            buttonLabel
        });

    return fixRetraction(formHtml);
};
