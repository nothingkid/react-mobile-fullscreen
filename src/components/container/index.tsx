import React from "react";

const style: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    transform: "translateZ(0px)",
};

export interface IContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    zIndex: number;
}

export const Container = React.memo((props: IContainerProps) => {
    const { children, zIndex, ...delegated } = props;

    return (
        <div
            {...delegated}
            style={{ ...style, zIndex }}
        >
            {children}
        </div>
    );
});
