import { useState } from 'react';
import { INTRODUCTION_NARRATIVE } from './narrative/1_IntroductionScript';
import { SimulationButton } from '../../shared/components/SimulationButton';

interface Chapter1ViewProps {
    onNext?: () => void;
}

export function Chapter1View({ onNext }: Chapter1ViewProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const totalSteps = INTRODUCTION_NARRATIVE.length;

    const handleNextStep = () => {
        if (currentStepIndex < totalSteps - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        } else {
            onNext?.();
        }
    };

    return (
        <div className="w-full h-full relative overflow-hidden select-none bg-[#F4F7F6]">

            {currentStepIndex === 0 && (
                <section className="w-full h-full flex flex-col items-center justify-center p-8 animate-fadeIn">
                    <div className="w-[600px] bg-white border border-[#DFE8E2] rounded-2xl p-10 shadow-sm flex flex-col items-center text-center gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#4C9289]">
                                Capítulo 1 — Paso 1 / {totalSteps}
                            </span>
                            <h2 className="text-2xl font-bold text-slate-800">
                                Recursos y Sociedad
                            </h2>
                        </div>

                        <p className="text-base text-slate-600 leading-relaxed">
                            {INTRODUCTION_NARRATIVE[0].text}
                        </p>

                        <div className="w-48 pt-2">
                            <SimulationButton
                                icon="➔"
                                label={INTRODUCTION_NARRATIVE[0].buttonLabel || "Siguiente"}
                                onClick={handleNextStep}
                            />
                        </div>
                    </div>
                </section>
            )}


            {currentStepIndex === 1 && (
                <section className="w-full h-full grid grid-cols-[500px_1fr] gap-8 items-center p-12 animate-fadeIn">
                    {/* Tarjeta Narrativa Posicionada a la Izquierda */}
                    <div className="bg-white border border-[#DFE8E2] rounded-2xl p-8 shadow-sm flex flex-col justify-between gap-6">
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#4C9289]">
                                Capítulo 1 — Paso 2 / {totalSteps}
                            </span>
                            <h3 className="text-xl font-bold text-slate-800">
                                El límite de los recursos
                            </h3>
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                            {INTRODUCTION_NARRATIVE[1].text}
                        </p>

                        <div className="w-44 pt-2">
                            <SimulationButton
                                icon="➔"
                                label={INTRODUCTION_NARRATIVE[1].buttonLabel || "Siguiente"}
                                onClick={handleNextStep}
                            />
                        </div>
                    </div>

                    {/* Espacio reservado para cualquier elemento visual / gráfico / ilustración propia de este paso */}
                    <div className="w-full h-[450px] bg-emerald-900/5 border-2 border-dashed border-[#DFE8E2] rounded-2xl flex items-center justify-center text-slate-400 font-medium">
                        [Imagen referencial]
                    </div>
                </section>
            )}

            {currentStepIndex === 2 && (
                <section className="w-full h-full flex flex-col items-center justify-between p-12 animate-fadeIn">
                    <div className="w-full max-w-3xl bg-white border border-[#DFE8E2] rounded-2xl p-8 shadow-sm flex flex-col items-center text-center gap-6">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#4C9289]">
                            Capítulo 1 — Paso 3 / {totalSteps}
                        </span>

                        <p className="text-lg text-slate-700 font-medium leading-relaxed">
                            {INTRODUCTION_NARRATIVE[2].text}
                        </p>

                        <div className="w-48">
                            <SimulationButton
                                icon="➔"
                                label={INTRODUCTION_NARRATIVE[2].buttonLabel || "Siguiente"}
                                onClick={handleNextStep}
                            />
                        </div>
                    </div>

                </section>
            )}

            {currentStepIndex === 3 && (
                <section className="w-full h-full flex flex-col items-center justify-center p-8 animate-fadeIn">
                    <div className="w-[580px] bg-white border-2 border-[#4C9289] rounded-2xl p-10 shadow-md flex flex-col items-center text-center gap-8">
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#4C9289]">
                                Capítulo 1 — Paso 4 / {totalSteps}
                            </span>
                            <h2 className="text-3xl font-extrabold text-slate-800">
                                ¿Estás listo?
                            </h2>
                        </div>

                        <p className="text-base text-slate-600 leading-relaxed font-medium">
                            {INTRODUCTION_NARRATIVE[3].text}
                        </p>

                        <div className="w-56">
                            <SimulationButton
                                icon=""
                                label={INTRODUCTION_NARRATIVE[3].buttonLabel || "¡Manos a la obra!"}
                                onClick={handleNextStep}
                            />
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
