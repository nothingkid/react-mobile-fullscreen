import React from "react";
import fscreen from "fscreen";
import mobile, { isMobile } from "is-mobile";
import {
    FullScreenBagContext,
    FullscreenBag,
} from "./hooks/use-fullscreen-context";
import { useState } from "react";
import { isBrowser } from "./services/utils";
import { Fallback } from "./components/fallback";
import { Native } from "./components/native";
import { MinimalUI } from "./components/minimal-ui";

export type RequestFullsreen = () => void;
export type ExitFullscreen = () => void;
export type View = "full" | "default";
export type FullscreenType = "native" | "minimal-ui";
export interface IMaskComponentProps {
    view: View;
    fullScreenType: FullscreenType;
}
export type MaskComponent = React.ComponentType<IMaskComponentProps>;

const nativeSupported = fscreen.fullscreenElement !== undefined;

let MobileFullscreenComponent: React.FC<FullscreenBag>;
if (!isBrowser() || !isMobile()) {
    MobileFullscreenComponent = Fallback;
} else if (nativeSupported) {
    MobileFullscreenComponent = Native;
} else {
    MobileFullscreenComponent = MinimalUI;
}

export { useFullScreenContext } from "./hooks/use-fullscreen-context";
export type { IFullScreen } from "./hooks/use-fullscreen-context";

export const MobileFullscreen = () => {
    const viewState = useState<View>("default");

    return (
        <FullScreenBagContext.Provider value={viewState}>
            <MobileFullscreenComponent {...viewState} />
        </FullScreenBagContext.Provider>
    );
};
