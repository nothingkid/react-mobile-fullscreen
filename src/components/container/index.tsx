import React from "react";

const style: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    transform: "translateZ(0px)",
};

interface IMaskProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    zIndex: number;
}

export const Container = React.memo(({ children, zIndex, ...delegated }: IMaskProps) => {
    return (
        <div {...delegated} style={{ ...style, zIndex }}>
            {children}
        </div>
    );
});
