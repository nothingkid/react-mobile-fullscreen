import { View } from "..";
import React, { useContext, SetStateAction, Dispatch } from "react";
import { undefinedContextMsg } from "../services/utils";

export type FullscreenBag = [View, Dispatch<SetStateAction<View>>];

export interface IFullScreen {
    view: View;
}

export const FullScreenBagContext = React.createContext<FullscreenBag | null>(
    null,
);

export const useFullscreenBagContext = (): FullscreenBag => {
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
    return { view: fullscreenBag[0] };
};
