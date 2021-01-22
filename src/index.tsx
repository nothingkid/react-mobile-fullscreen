import React, { useEffect } from "react";
import fscreen from "fscreen";
import { FullScreenBagContext } from "./hooks/use-fullscreen-context";
import { useState } from "react";
import { Container } from "./components/container";
import { MinimalUI } from "./components/minimal-ui";

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

export { useFullScreenContext } from "./hooks/use-fullscreen-context";
export type { IFullScreen } from "./hooks/use-fullscreen-context";

export interface IMobileFullscreenProps {
    mask: MaskComponent;
    children: React.ReactNode | React.ReactNodeArray;
}

const requestFullscreen = () => {
    if (nativeSupported) {
        fscreen.requestFullscreen(document.documentElement);
    }
};

export const MobileFullscreen = React.memo(
    ({ mask: Mask, children }: IMobileFullscreenProps) => {
        const [view, setView] = useState<View>("default");
        const [fullscreenType, setFullscreenType] = useState<FullscreenType>(
            null,
        );

        useEffect(() => {
            if (nativeSupported) {
                setFullscreenType("native");
            } else {
                setFullscreenType("minimal-ui");
            }
        }, []);

        return (
            <FullScreenBagContext.Provider
                value={{ view, setView, fullscreenType, setFullscreenType }}
            >
                {view === "default" && (
                    <Container
                        onClick={requestFullscreen}
                        id="mask"
                        zIndex={30}
                    >
                        <Mask fullscreenType={fullscreenType} />
                    </Container>
                )}
                <Container id="main" zIndex={20}>
                    {children}
                </Container>
                {fullscreenType === "minimal-ui" && (
                    <MinimalUI view={view} setView={setView} />
                )}
            </FullScreenBagContext.Provider>
        );
    },
);
