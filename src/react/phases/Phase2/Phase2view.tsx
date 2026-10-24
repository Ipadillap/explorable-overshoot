// src/views/Phase2view.tsx
import { useRef, useEffect, useState } from "react";
import { ResourceSlider } from "./components/ResourceSlider";
import { SimulationButton } from "./components/SimulationButton";
import { HexagonBlock } from "./components/HexagonBlock";
import { RabbitBlock } from "./components/RabbitBlock";
import { useSimulation } from "../../../hooks/useSimulation.ts";
import { SimulationCanvas, type SimulationCanvasRef } from "../../components/SimulationCanvas.tsx";

const DESIGN_W = 1440;
const DESIGN_H = 704;

function useScaleToFit() {
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

export function Phase2view() {
    const {
        rabbitStats,
        grassStats,
        ecosystemMetrics,
        nextCicle,
        updateInitialRabbits,
        updateConsumptionRate,
        updateDeathRate,
        updateRegenerationRate,
    } = useSimulation();

    const scale = useScaleToFit();
    const canvasRef = useRef<SimulationCanvasRef>(null);

    // Estado para bloquear/desbloquear todos los sliders
    const [isBlocked, setIsBlocked] = useState<boolean>(false);

    // Toggle simple para alterar el estado de bloqueo
    const toggleBlockSliders = () => {
        setIsBlocked((prev) => !prev);
    };

    // Función envolvente para avanzar ciclo matemático y visual sincrónicamente
    const handleNextCycle = () => {
        if (canvasRef.current) {
            // Aplicar consumo de pasto
            canvasRef.current.endCycle(ecosystemMetrics.consumedGrass);
        }

        // Avanzar métricas matemáticas en el SimulationEngine
        nextCicle();

        if (canvasRef.current) {
            // Iniciar regeneración de biocapacidad en la isla
            canvasRef.current.startCycle(ecosystemMetrics.biocapacity);
        }
    };

    return (
        <main className="relative w-screen h-screen overflow-hidden flex items-center justify-center">
            <main className="w-screen h-screen flex items-center justify-center p-4 overflow-hidden">
                <div
                    style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})`, transformOrigin: "center center" }}
                    className="grid grid-cols-[240px_804px_300px] gap-[20px] items-stretch justify-center shrink-0"
                >
                    <aside className="h-full rounded-lg grid grid-rows-[432px_178px_34px] gap-4">
                        {/* Estado del ecosistema */}
                        <div className="bg-[#ffffff] border border-[#DFE8E2] rounded-lg flex flex-col justify-around">
                            <div className="h-[94px] p-5">
                                <p className="text-sm text-gray-500">Biocapacidad</p>
                                <p className="text-xl font-semibold">{ecosystemMetrics.biocapacity}</p>
                            </div>

                            <div className="w-full h-px bg-[#DFE8E2]" />

                            <div className="h-[94px] p-5">
                                <p className="text-sm text-gray-500">Huella ecológica</p>
                                <p className="text-xl font-semibold">{ecosystemMetrics.ecologicalFootprint}</p>
                            </div>

                            <div className="w-full h-px bg-[#DFE8E2]" />

                            <div className="h-[94px] p-5">
                                <p className="text-sm text-gray-500">Hierba consumida</p>
                                <p className="text-xl font-semibold">{ecosystemMetrics.consumedGrass}</p>
                            </div>
                        </div>

                        {/* Sobregiro ecológico */}
                        <div className="bg-[#ffffff] border border-[#DFE8E2] rounded-lg flex flex-col items-center justify-center">
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-sm text-gray-600">¿Sobregiro ecológico?</p>
                                <p className={`text-2xl font-bold ${ecosystemMetrics.isOvershoot ? "text-red-500" : "text-green-600"}`}>
                                    {ecosystemMetrics.isOvershoot ? "SÍ" : "NO"}
                                </p>
                            </div>
                        </div>

                        {/* Zona Libre */}
                        <div className="bg-[#ffffff] border border-[#DFE8E2] rounded-lg" />
                    </aside>

                    {/* Lienzo de simulación */}
                    <section className="h-full rounded-lg flex flex-col justify-between">
                        <div className="h-full w-full flex flex-col justify-center">
                            <div className="w-[804px] h-[602px] flex items-center justify-center">
                                <SimulationCanvas
                                    ref={canvasRef}
                                    ecosystemMetrics={ecosystemMetrics}
                                />
                            </div>
                        </div>

                        {/* Resumen de simulación */}
                        <div className="w-full h-[102px] flex flex-row justify-center items-center border border-[#DFE8E2] rounded-lg bg-[#fafafa]">
                            <div className="w-[174px] h-[42px] flex flex-row items-center gap-3 justify-center">
                                <RabbitBlock color="#e6f3f1" />
                                <p className="font-bold">{ecosystemMetrics.totalRabbits}</p>
                            </div>

                            <div className="w-[174px] h-[42px] flex flex-row items-center gap-3 justify-center">
                                <HexagonBlock color="#e9f0e6" />
                                <p className="font-bold">{ecosystemMetrics.totalGrass}</p>
                            </div>

                            <div className="w-[174px] h-[42px] flex flex-row items-center gap-3 justify-center">
                                <HexagonBlock color="#f8edc9" />
                                <p className="font-bold">{ecosystemMetrics.biocapacity}</p>
                            </div>

                            <div className="w-[174px] h-[42px] flex flex-row items-center gap-3 justify-center">
                                <HexagonBlock color="#f5e3de" />
                                <p className="font-bold">{Math.max(0, ecosystemMetrics.grassMaxLC - ecosystemMetrics.totalGrass - ecosystemMetrics.biocapacity)}</p>
                            </div>
                        </div>
                    </section>

                    {/* Parámetros modificables */}
                    <aside className="h-full bg-white border border-[#DFE8E2] rounded-lg flex flex-col items-center justify-between p-4">
                        <div className="w-full flex flex-col items-center">
                            <div className="w-[260px] h-[86px]">
                                <ResourceSlider
                                    label="Cantidad inicial de conejos"
                                    value={rabbitStats.initialCount}
                                    min={1}
                                    max={10}
                                    isBlocked={isBlocked}
                                    onChange={updateInitialRabbits}
                                />
                            </div>

                            <div className="w-full h-px bg-[#DFE8E2] my-1" />

                            <div className="w-[260px] h-[86px]">
                                <ResourceSlider
                                    label="Consumo per cápita"
                                    value={rabbitStats.consumptionRate}
                                    min={1}
                                    max={10}
                                    isBlocked={isBlocked}
                                    onChange={updateConsumptionRate}
                                />
                            </div>

                            <div className="w-full h-px bg-[#DFE8E2] my-1" />

                            <div className="w-[260px] h-[86px]">
                                <ResourceSlider
                                    label="Tasa de muerte natural"
                                    value={rabbitStats.deathRate}
                                    min={1}
                                    max={10}
                                    isBlocked={isBlocked}
                                    onChange={updateDeathRate}
                                />
                            </div>

                            <div className="w-full h-px bg-[#DFE8E2] my-1" />

                            <div className="w-[260px] h-[86px]">
                                <ResourceSlider
                                    label="Regeneración por unidad de hierba"
                                    value={grassStats.regenerationRate}
                                    min={0}
                                    max={1}
                                    step={0.1}
                                    isBlocked={isBlocked}
                                    onChange={updateRegenerationRate}
                                />
                            </div>

                            {/* Botón simple para Bloquear / Desbloquear controles */}
                            <button
                                onClick={toggleBlockSliders}
                                className={`mt-3 px-4 py-1.5 rounded-md text-xs font-semibold transition-colors duration-200 border ${
                                    isBlocked
                                        ? "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                                        : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                                }`}
                            >
                                {isBlocked ? "Desbloquear Sliders" : "Bloquear Sliders"}
                            </button>
                        </div>

                        <div className="w-full h-px bg-[#DFE8E2] my-2" />

                        {/* Botones de control */}
                        <div className="w-[260px] grid grid-cols-2 grid-rows-2 gap-4 place-items-center">
                            <div className="w-24">
                                <SimulationButton icon={1} label="Play" />
                            </div>
                            <div className="w-24">
                                <SimulationButton icon={2} label="Stop" />
                            </div>
                            <div className="w-24">
                                <SimulationButton icon={3} label="Next" onClick={handleNextCycle} />
                            </div>
                            <div className="w-24">
                                <SimulationButton icon={4} label="Reboot" />
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </main>
    );
}
