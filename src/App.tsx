import { useState } from 'react';
import { Chapter1View } from './chapters/1_Introduction/1_IntroductionView';
import { Chapter2View } from './chapters/2_BaseContext/Chapter2View';
import { Chapter3View } from './chapters/3_BalanceEcosystem/Chapter3View';
import { Chapter4View } from './chapters/4_EcologicalOvershoot/Chapter4View';
import { Chapter5View } from './chapters/5_EnvironmentFalls/Chapter5View';
import { Chapter6View } from './chapters/6_GeneralAnalysis/Chapter6View';
import { Chapter7View } from './chapters/7_YourTurn/Chapter7View';
import { useScaleToFit } from './shared/hooks/useScaleToFit';

const DESIGN_W = 1440;
const DESIGN_H = 704;
const TOTAL_CHAPTERS = 7;

type ChapterNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export function App() {
    const [currentChapter, setCurrentChapter] = useState<ChapterNumber>(1);
    const scale = useScaleToFit();

    const nextChapter = () =>
        setCurrentChapter((prev) => Math.min(prev + 1, TOTAL_CHAPTERS) as ChapterNumber);
    const prevChapter = () =>
        setCurrentChapter((prev) => Math.max(prev - 1, 1) as ChapterNumber);

    return (
        <main className="relative w-screen h-screen overflow-hidden bg-[#F4F7F6] flex items-center justify-center p-4">
            {/* Lienzo Escalado del Capítulo Activo con desmontaje limpio vía key */}
            <div
                key={currentChapter}
                style={{
                    width: DESIGN_W,
                    height: DESIGN_H,
                    transform: `scale(${scale})`,
                    transformOrigin: "center center"
                }}
                className="shrink-0 flex items-center justify-center"
            >
                {currentChapter === 1 && (
                    <Chapter1View onNext={nextChapter} />
                )}

                {currentChapter === 2 && (
                    <Chapter2View onNext={nextChapter} onPrev={prevChapter} />
                )}

                {currentChapter === 3 && (
                    <Chapter3View onNext={nextChapter} onPrev={prevChapter} />
                )}

                {currentChapter === 4 && (
                    <Chapter4View onNext={nextChapter} onPrev={prevChapter} />
                )}

                {currentChapter === 5 && (
                    <Chapter5View onNext={nextChapter} onPrev={prevChapter} />
                )}

                {currentChapter === 6 && (
                    <Chapter6View onNext={nextChapter} onPrev={prevChapter} />
                )}

                {currentChapter === 7 && (
                    <Chapter7View onPrev={prevChapter} />
                )}
            </div>

            {/* Navbar Inferior Fijo para los 7 Capítulos */}
            <nav className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/90 backdrop-blur-md px-6 py-2.5 rounded-full shadow-lg flex items-center gap-4 select-none">
                {Array.from({ length: TOTAL_CHAPTERS }).map((_, index) => {
                    const chapterNumber = (index + 1) as ChapterNumber;
                    const isActive = currentChapter === chapterNumber;

                    return (
                        <button
                            key={chapterNumber}
                            type="button"
                            onClick={() => setCurrentChapter(chapterNumber)}
                            aria-label={`Ir al capítulo ${chapterNumber}`}
                            className={`w-4 h-4 rounded-full border-2 border-white transition-all duration-300 ${
                                isActive
                                    ? "bg-white scale-125"
                                    : "bg-transparent hover:border-slate-300 opacity-60 hover:opacity-100"
                            }`}
                        />
                    );
                })}
            </nav>
        </main>
    );
}
