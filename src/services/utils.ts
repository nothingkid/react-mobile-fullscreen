export const isBrowser = () => {
    return window !== undefined;
};

export function undefinedContextMsg(context: string, useContext: string) {
    return `${context} context is undefined, please verify you are calling ${useContext}() as child of a <${context}> component.`;
}

export const noop = function () {};
