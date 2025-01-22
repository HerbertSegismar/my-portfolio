import React, { useRef, useEffect, useState, forwardRef } from "react";
import { cn } from "../lib/utils";

export const BackgroundGradientAnimation = forwardRef<
  HTMLDivElement,
  {
    gradientBackgroundStart?: string;
    gradientBackgroundEnd?: string;
    firstColor?: string;
    secondColor?: string;
    thirdColor?: string;
    fourthColor?: string;
    fifthColor?: string;
    pointerColor?: string;
    size?: string;
    blendingValue?: string;
    children?: React.ReactNode;
    className?: string;
    interactive?: boolean;
  }
>(
  (
    {
      gradientBackgroundStart = "rgb(108, 0, 162)",
      gradientBackgroundEnd = "rgb(0, 17, 82)",
      firstColor = "18, 113, 255",
      secondColor = "221, 74, 255",
      thirdColor = "100, 220, 255",
      fourthColor = "200, 50, 50",
      fifthColor = "180, 180, 50",
      pointerColor = "140, 100, 255",
      size = "80%",
      blendingValue = "hard-light",
      children,
      className,
      interactive = true,
    },
    ref
  ) => {
    const interactiveRef = useRef<HTMLDivElement>(null);

    const [curX, setCurX] = useState(0);
    const [curY, setCurY] = useState(0);
    const [tgX, setTgX] = useState(0);
    const [tgY, setTgY] = useState(0);
    const [isSafari, setIsSafari] = useState(false);

    useEffect(() => {
      document.body.style.setProperty(
        "--gradient-background-start",
        gradientBackgroundStart
      );
      document.body.style.setProperty(
        "--gradient-background-end",
        gradientBackgroundEnd
      );
      document.body.style.setProperty("--first-color", firstColor);
      document.body.style.setProperty("--second-color", secondColor);
      document.body.style.setProperty("--third-color", thirdColor);
      document.body.style.setProperty("--fourth-color", fourthColor);
      document.body.style.setProperty("--fifth-color", fifthColor);
      document.body.style.setProperty("--pointer-color", pointerColor);
      document.body.style.setProperty("--size", size);
      document.body.style.setProperty("--blending-value", blendingValue);
    }, [
      gradientBackgroundStart,
      gradientBackgroundEnd,
      firstColor,
      secondColor,
      thirdColor,
      fourthColor,
      fifthColor,
      pointerColor,
      size,
      blendingValue,
    ]);

    useEffect(() => {
      const move = () => {
        if (interactiveRef.current) {
          setCurX((prevCurX) => prevCurX + (tgX - prevCurX) / 20);
          setCurY((prevCurY) => prevCurY + (tgY - prevCurY) / 20);
          interactiveRef.current.style.transform = `translate(${Math.round(
            curX
          )}px, ${Math.round(curY)}px)`;
        }
      };

      const animationFrame = requestAnimationFrame(move);
      return () => cancelAnimationFrame(animationFrame);
    }, [tgX, tgY, curX, curY]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      if (interactiveRef.current) {
        const rect = interactiveRef.current.getBoundingClientRect();
        setTgX(event.clientX - rect.left);
        setTgY(event.clientY - rect.top);
      }
    };

    useEffect(() => {
      setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
    }, []);

    return (
      <div
        className={cn(
          "h-screen w-screen overflow-hidden absolute flex items-center justify-center -z-10 scale-y-[1.35] md:scale-[1.3]",
          className
        )}
        ref={ref}
      >
        <svg className="hidden">
          <defs>
            <filter id="blurMe">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div>{children}</div>
        <div
          className={cn(
            "gradients-container h-full w-full blur-lg",
            isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
          )}
        >
          <div className="left-0 w-full h-full relative">
            <div
              className={cn(
                `absolute`,
                `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                `[transform-origin:center_center]`,
                `animate-first`,
                `opacity-100`
              )}
            ></div>
            <div
              className={cn(
                `absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
                `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                `[transform-origin:calc(50%-200px)]`,
                `animate-second`,
                `opacity-100`
              )}
            ></div>
            <div
              className={cn(
                `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
                `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                `[transform-origin:calc(50%+200px)]`,
                `animate-third`,
                `opacity-100`
              )}
            ></div>
            <div
              className={cn(
                `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
                `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                `[transform-origin:calc(50%-200px)]`,
                `animate-fourth`,
                `opacity-70`
              )}
            ></div>
            <div
              className={cn(
                `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
                `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                `[transform-origin:calc(50%-200px)_calc(50%+200px)]`,
                `animate-fifth`,
                `opacity-100`
              )}
            ></div>
            {interactive && (
              <div
                ref={interactiveRef}
                onMouseMove={handleMouseMove}
                className={cn(
                  `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
                  `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`,
                  `opacity-70`
                )}
              ></div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
