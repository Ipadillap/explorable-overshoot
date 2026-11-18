// src/App.tsx

import { useState, useRef, useEffect } from "react";
import { SimulationTestView } from "./chapters/SimulationTestView";
import { Chapter1View } from "./chapters/1_Introduction/1_IntroductionView.tsx";
import { Chapter2View } from "./chapters/2_BaseContext/Chapter2View.tsx";
import { Chapter3View } from "./chapters/3_BalanceEcosystem/Chapter3View.tsx";
import { Chapter4View } from "./chapters/4_EcologicalOvershoot/Chapter4View.tsx";
import { Chapter5View } from "./chapters/5_EnvironmentFalls/Chapter5View.tsx";
import { Chapter6View } from "./chapters/6_GeneralAnalysis/Chapter6View.tsx";
import { Chapter7View } from "./chapters/7_YourTurn/Chapter7View.tsx";

const CHAPTER_VIEWS: Record<number, React.FC<{ onNext?: () => void; onPrev?: () => void }>> = {
    1: Chapter1View,
    2: Chapter2View,
    3: Chapter3View,
    4: Chapter4View,
    5: Chapter5View,
    6: Chapter6View,
    7: Chapter7View,
    0: SimulationTestView,
};

export function App() {
    const [currentChapter, setCurrentChapter] = useState(1);
    const totalChapters = 7;

    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        if (!containerRef.current) return;

        const updateScale = () => {
            if (!containerRef.current) return;
            const { clientWidth, clientHeight } = containerRef.current;
            if (clientWidth === 0 || clientHeight === 0) return;

            const scaleX = clientWidth / 1440;
            const scaleY = clientHeight / 704;
            setScale(Math.min(scaleX, scaleY));
        };

        const observer = new ResizeObserver(updateScale);
        observer.observe(containerRef.current);
        updateScale();

        return () => observer.disconnect();
    }, []);

    const ActiveView = CHAPTER_VIEWS[currentChapter] || Chapter1View;

    const handleNext = () => currentChapter < totalChapters && setCurrentChapter((p) => p + 1);
    const handlePrev = () => currentChapter > 1 && setCurrentChapter((p) => p - 1);

    return (
        <main className="relative w-screen h-screen overflow-hidden bg-[#F4F7F6] flex flex-col items-center justify-between p-4 select-none">
            {/* Contenedor con Escalado Maestro (1440 x 704) */}
            <div
                ref={containerRef}
                className="w-full flex-1 flex items-center justify-center overflow-hidden"
            >
                <div
                    style={{
                        width: 1440,
                        height: 704,
                        transform: `scale(${scale})`,
                        transformOrigin: "center center",
                    }}
                    className="shrink-0 relative overflow-hidden"
                >
                    <ActiveView onNext={handleNext} onPrev={handlePrev} />
                </div>
            </div>

            {/* Navegación Inferior Simple (Solo Dots) */}
            <nav className="flex items-center gap-2 py-1 z-50">
                {Array.from({ length: totalChapters }, (_, i) => i + 1).map((num) => (
                    <button
                        key={num}
                        type="button"
                        onClick={() => setCurrentChapter(num)}
                        title={`Capítulo ${num}`}
                        className={`w-2.5 h-2.5 rounded-full ${
                            currentChapter === num ? "bg-slate-800" : "bg-slate-300"
                        }`}
                    />
                ))}

                <span className="text-slate-300 text-xs mx-1">|</span>

                {/* Dot Sandbox */}
                <button
                    type="button"
                    onClick={() => setCurrentChapter(0)}
                    title="Sandbox"
                    className={`w-2.5 h-2.5 rounded-full ${
                        currentChapter === 0 ? "bg-amber-600" : "bg-amber-300"
                    }`}
                />
            </nav>
        </main>
    );
}
