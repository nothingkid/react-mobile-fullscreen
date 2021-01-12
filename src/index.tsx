import fscreen from "fscreen";

export type RequestFullSreen = () => void;
export type ExitFullScreen = () => void;

export type View = "full" | "default";
export type FullScreenType = "native" | "minimal-ui";
export interface IMaskComponentProps {
    view: View;
    fullScreenType: FullScreenType;
}
export type MaskComponent = React.ComponentType<IMaskComponentProps>;

const nativeSupported = fscreen.fullscreenElement !== undefined;

export const MobileFullscreen = () => {
    return null;
};
