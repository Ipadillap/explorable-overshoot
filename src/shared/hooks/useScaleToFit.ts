import { useState, useEffect } from "react";

const DESIGN_W = 1440;
const DESIGN_H = 704;

export function useScaleToFit() {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const update = () => {
            setScale(Math.min(window.innerWidth / DESIGN_W, window.innerHeight / DESIGN_H) * 0.8);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return scale;
}