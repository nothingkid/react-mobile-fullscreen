import { View, FullscreenType } from "..";
import React, { useContext, SetStateAction, Dispatch } from "react";
import { undefinedContextMsg } from "../services/utils";

export interface IFullscreenBag {
    view: View;
    setView: Dispatch<SetStateAction<View>>;
    fullscreenType: FullscreenType;
    setFullscreenType: Dispatch<SetStateAction<FullscreenType>>;
}

export interface IFullScreen {
    view: View;
    fullscreenType: FullscreenType;
}

export const FullScreenBagContext = React.createContext<IFullscreenBag | null>(
    null,
);

export const useFullscreenBagContext = (): IFullscreenBag => {
    const fullscreenBag = useContext(FullScreenBagContext);
    if (!fullscreenBag) {
        throw new Error(
            undefinedContextMsg("FullScreen", "useFullScreenContext"),
        );
    }

    return fullscreenBag;
};

export const useFullScreenContext = (): IFullScreen => {
    const fullscreenBag = useFullscreenBagContext();
    return {
        view: fullscreenBag.view,
        fullscreenType: fullscreenBag.fullscreenType,
    };
};
