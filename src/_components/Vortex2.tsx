import React from "react";
import { Vortex } from "../_components/Vortex";

export const Vortex2 = ({ children }: { children: React.ReactNode }) => {
  return (
      <Vortex
        rangeY={400}
        particleCount={30}
        baseHue={80}
        className=""
      >
        {children}
      </Vortex>
    
  );
};
