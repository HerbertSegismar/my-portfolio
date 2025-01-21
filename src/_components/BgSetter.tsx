import { useState } from "react";
import { BackgroundBeamsWithCollision } from "../_components/BgBeams";
import { BackgroundLines } from "../_components/BgLines";
import { BackgroundGradientAnimation } from "../_components/BgGradient";
import { ParticlesContainer } from "../_components/BgWeb";
import { Vortex2 } from "../_components/Vortex2";
import SideBar from "../_components/SideBar";

type Props = {};

export default function BgSetter({}: Props) {
  const [bgStyle, setBgStyle] = useState("lines");

  const renderBackground = (name: string | undefined) => {
    switch (name) {
      case "lines":
        return (
          <BackgroundLines>
            <div/>
          </BackgroundLines>
        );
      case "beams":
        return (
          <BackgroundBeamsWithCollision>
            <div />
          </BackgroundBeamsWithCollision>
        );
      case "floats":
        return (
          <BackgroundGradientAnimation>
            <div />
          </BackgroundGradientAnimation>
        );
      case "webs":
        return (
          <ParticlesContainer>
            <div />
          </ParticlesContainer>
        );
      case "vortex":
        return (
          <Vortex2>
            <div />
          </Vortex2>
        );
      default:
        return null;
    }
  };

  return (
    <div className="-z-20">
      <SideBar handleBgChange={setBgStyle} />
      <div>{renderBackground(bgStyle)}</div>
    </div>
  );
}
