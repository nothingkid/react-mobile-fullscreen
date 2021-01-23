import React, { useCallback } from "react";
import fscreen from "fscreen";
import { IFullscreenBag } from "../../hooks/use-fullscreen-context";
import { IContainerProps, Container } from "../container";

interface IMaskProps extends IContainerProps {
    nativeSupported: boolean;
    setView: IFullscreenBag["setView"];
}

export const MaskContainer = (props: IMaskProps) => {
    const { nativeSupported, setView, ...delegated } = props;

    const requestFullscreen = useCallback(() => {
        if (nativeSupported) {
            fscreen.requestFullscreen(document.documentElement);
            setView("full");
        }
    }, [nativeSupported, setView]);

    return <Container onClick={requestFullscreen} {...delegated} />;
};
