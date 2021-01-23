# React Mobile Fullscreen

Lib tries to use native fullscreen api and only if api is not supported it fallbacks to use `MinimalUI` (name of react component used internally).
minimal-ui (name of safari mode when adress bar is hidden) is what brim uses (https://github.com/gajus/brim), but unlike react-mobile-fullscreen, android devices are not supported by brim.

If native fullscreen api is supported, then fullscreen can be activated from user action such as click.

Otherwise, `MinimalUI` component will be used. In this case, user must swipe up to hide adress bar.

To detect device type (mobile or desktop) you can use `react-device-detect` (https://github.com/duskload/react-device-detect).

Use `useFullScreenContext` if you need to know about current `view` and/or `fullscreenType` in children components for some reason.

# Usage

### Install

```bash
npm install -S react-mobile-fullscreen
```

### Basic Setup

```jsx
const Mask = (props: IMaskProps) => {
    return (
        <div
            style={{
                background:
                    props.fullscreenType === "native" ? "blue" : "green",
                width: "100%",
                height: "100%",
            }}
        >
            {props.fullscreenType === "native"
                ? "Click Me!"
                : props.fullscreenType === "minimal-ui"
                ? "Swipe Up!"
                : "Mask won't be rendered"}
        </div>
    );
};

export function App() {
    return (
        <MobileFullscreen mask={Mask}>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    background: "pink",
                }}
            >
                <div>Main Content</div>
            </div>
        </MobileFullscreen>
    );
}
```

## Types

```ts
type View = "full" | "default";
type FullscreenType = "native" | "minimal-ui" | null;

interface IMaskProps {
    fullscreenType: FullscreenType;
}

type MaskComponent = React.ComponentType<IMaskProps>;

interface IFullScreen {
    view: View;
    fullscreenType: FullscreenType;
}

const useFullScreenContext: () => IFullSscreen;

interface IMobileFullscreenProps {
    mask: MaskComponent;
    children: React.ReactNode | React.ReactNodeArray;
}
```
