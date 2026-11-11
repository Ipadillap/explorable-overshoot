// src/App.tsx

import { useState } from "react";
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
    const [currentChapter, setCurrentChapter] = useState(2);
    const totalChapters = 7;

    const ActiveView = CHAPTER_VIEWS[currentChapter] || Chapter2View;

    const handleNext = () => currentChapter < totalChapters && setCurrentChapter((p) => p + 1);
    const handlePrev = () => currentChapter > 1 && setCurrentChapter((p) => p - 1);

    return (
        <main className="relative w-screen h-screen overflow-hidden bg-[#F4F7F6] flex flex-col items-center justify-between p-4 select-none">
            {/* Lienzo del Capítulo Activo */}
            <div className="w-full flex-1 max-w-[1440px] max-h-[704px] flex items-center justify-center overflow-hidden my-auto">
                <ActiveView onNext={handleNext} onPrev={handlePrev} />
            </div>

            {/* Navegación Inferior Estilo "Evolution of Trust" */}
            <nav className="flex items-center gap-6 bg-white/80 backdrop-blur-sm border border-[#DFE8E2] px-5 py-2 rounded-full shadow-sm z-50">
                <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentChapter <= 1}
                    className="text-xs font-bold text-slate-500 hover:text-[#233C35] disabled:opacity-30 transition"
                >
                    PREV
                </button>

                {/* Pelotas / Dots de los Capítulos 1 al 7 */}
                <div className="flex items-center gap-2">
                    {Array.from({ length: totalChapters }, (_, i) => i + 1).map((num) => (
                        <button
                            key={num}
                            type="button"
                            onClick={() => setCurrentChapter(num)}
                            title={`Capítulo ${num}`}
                            className={`rounded-full transition-all ${
                                currentChapter === num
                                    ? "w-3.5 h-3.5 bg-[#233C35]"
                                    : "w-2.5 h-2.5 bg-slate-300 hover:bg-[#4C9289]"
                            }`}
                        />
                    ))}

                    <div className="w-px h-3 bg-slate-300 mx-1" />

                    {/* Dot Especial para el Sandbox de Pruebas */}
                    <button
                        type="button"
                        onClick={() => setCurrentChapter(0)}
                        title="Sandbox de Pruebas"
                        className={`rounded-full transition-all ${
                            currentChapter === 0
                                ? "w-3.5 h-3.5 bg-amber-600"
                                : "w-2.5 h-2.5 bg-amber-300 hover:bg-amber-500"
                        }`}
                    />
                </div>

                <button
                    type="button"
                    onClick={handleNext}
                    disabled={currentChapter >= totalChapters || currentChapter === 0}
                    className="text-xs font-bold text-[#233C35] hover:text-[#4C9289] disabled:opacity-30 transition"
                >
                    NEXT
                </button>
            </nav>
        </main>
    );
}
