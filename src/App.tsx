import { useState } from 'react';
import { Phase1View } from './phases/Phase1/Phase1View';
import { Phase2view } from './phases/Phase2/Phase2view';
import { Phase3 } from './phases/Phase3';
import { useScaleToFit } from './shared/hooks/useScaleToFit';

const DESIGN_W = 1440;
const DESIGN_H = 704;
const TOTAL_PHASES = 3;

export function App() {
    const [currentPhase, setCurrentPhase] = useState<1 | 2 | 3>(1);
    const scale = useScaleToFit();

    const nextPhase = () => setCurrentPhase((prev) => Math.min(prev + 1, TOTAL_PHASES) as 1 | 2 | 3);
    const prevPhase = () => setCurrentPhase((prev) => Math.max(prev - 1, 1) as 1 | 2 | 3);

    return (
        <main className="relative w-screen h-screen overflow-hidden bg-[#F4F7F6] flex items-center justify-center p-4">
            {/* Lienzo Escalado de la Fase Activa */}
            <div
                style={{
                    width: DESIGN_W,
                    height: DESIGN_H,
                    transform: `scale(${scale})`,
                    transformOrigin: "center center"
                }}
                className="shrink-0 flex items-center justify-center"
            >
                {currentPhase === 1 && (
                    <Phase1View onNext={nextPhase} />
                )}

                {currentPhase === 2 && (
                    <Phase2view />
                )}

                {currentPhase === 3 && (
                    <Phase3 onPrev={prevPhase} />
                )}
            </div>

            <nav className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/90 backdrop-blur-md px-6 py-2.5 rounded-full shadow-lg flex items-center gap-4 select-none">
                {Array.from({ length: TOTAL_PHASES }).map((_, index) => {
                    const phaseNumber = (index + 1) as 1 | 2 | 3;
                    const isActive = currentPhase === phaseNumber;

                    return (
                        <button
                            key={phaseNumber}
                            type="button"
                            onClick={() => setCurrentPhase(phaseNumber)}
                            aria-label={`Ir a la fase ${phaseNumber}`}
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
