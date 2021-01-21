import React from "react";
import fscreen from "fscreen";
import { isMobile } from "is-mobile";
import {
    FullScreenBagContext,
    IFullscreenBag,
} from "./hooks/use-fullscreen-context";
import { useState } from "react";
import { isBrowser } from "./services/utils";
import { Fallback } from "./components/fallback";
import { Native } from "./components/native";
import { MinimalUI } from "./components/minimal-ui";
import { Container } from "./components/container";

export type RequestFullsreen = () => void;
export type ExitFullscreen = () => void;
export type View = "full" | "default";
export type FullscreenType = "native" | "minimal-ui" | null;

export interface IMaskProps {
    fullscreenType: FullscreenType;
}

export type MaskComponent = React.ComponentType<IMaskProps>;
// export type MainComponent = React.ComponentType<IContainerProps>;

const nativeSupported = fscreen.fullscreenElement !== undefined;

let MobileFullscreenComponent: React.FC<IFullscreenBag>;
if (!isBrowser() || !isMobile()) {
    MobileFullscreenComponent = Fallback;
} else if (nativeSupported) {
    MobileFullscreenComponent = Native;
} else {
    MobileFullscreenComponent = MinimalUI;
}

export { useFullScreenContext } from "./hooks/use-fullscreen-context";
export type { IFullScreen } from "./hooks/use-fullscreen-context";

export interface IMobileFullscreenProps {
    mask: MaskComponent;
    children: React.ReactNode | React.ReactNodeArray;
}

export const MobileFullscreen = React.memo(
    ({ mask: Mask, children }: IMobileFullscreenProps) => {
        const [view, setView] = useState<View>("default");
        const [fullscreenType, setFullscreenType] = useState<FullscreenType>(
            null,
        );

        // TODO: detect.

        return (
            <FullScreenBagContext.Provider
                value={{ view, setView, fullscreenType, setFullscreenType }}
            >
                {view === "default" && (
                    <Container id="mask" zIndex={30}>
                        <Mask fullscreenType={fullscreenType} />
                    </Container>
                )}
                <Container id="main" zIndex={20}>
                    {children}
                </Container>
            </FullScreenBagContext.Provider>
        );
    },
);
