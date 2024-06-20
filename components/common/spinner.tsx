import { Spinner, SpinnerVariantProps } from "@nextui-org/react";
import React, { useEffect, useState, useRef, useMemo } from "react";
import styles from "./spinner.module.css";

type Colors = SpinnerVariantProps["color"];

function LoadingSpinner() {
  const [color, setColor] = useState<Colors>("default");

  const colors = useMemo<Colors[]>(
    () => ["default", "primary", "secondary", "success", "warning", "danger"],
    []
  );

  const colorIndexRef = useRef(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    setColor(colors[randomIndex]);
    // const intervalId = setInterval(() => {
    //   colorIndexRef.current = (colorIndexRef.current + 1) % colors.length;
    //   setColor(colors[colorIndexRef.current]);
    // }, 800);

    // return () => clearInterval(intervalId);
  }, [colors]);

  return (
    <Spinner color={color} classNames={{ base: styles["spinner-wrapper"] }} />
  );
}

export default LoadingSpinner;
