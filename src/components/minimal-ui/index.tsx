import React, { useEffect } from "react";
import { IFullscreenBag } from "../../hooks/use-fullscreen-context";
import debounce from "debounce";

interface IMinimalUIProps {
    view: IFullscreenBag["view"];
    setView: IFullscreenBag["setView"];
}

const treadmillStyle: React.CSSProperties = {
    visibility: "hidden",
    position: "relative",
    zIndex: 10,
    left: 0,
    width: "1px",
    height: "9999999999999999px",
};

export const MinimalUI = (props: IMinimalUIProps) => {
    const { view, setView } = props;
    useEffect(() => {
        const mq = matchMedia("(orientation: landscape)");
        let isLandscape = mq.matches;
        let windowHeight = window.innerHeight;

        const onResize = debounce(() => {
            if (mq.matches !== isLandscape) {
                isLandscape = mq.matches;
                // orientation changed;
                // ensure app stays in "full" mode.
                scrollTo(0, 1000);
            } else if (view === "full") {
                if (window.innerHeight < windowHeight) {
                    setView("default");
                }
            } else {
                if (window.innerHeight > windowHeight) {
                    setView("full");
                }
            }

            windowHeight = window.innerHeight;
        }, 100);

        window.addEventListener("resize", onResize);
        mq.addListener(onResize);

        return () => {
            window.removeEventListener("resize", onResize);
            mq.removeListener(onResize);
        };
    }, [setView, view]);

    return <div style={treadmillStyle} />;
};
