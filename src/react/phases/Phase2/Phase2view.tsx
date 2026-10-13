import { ResourceSlider } from "./components/ResourceSlider";
import { SimulationButton } from "./components/SimulationButton";
import { HexagonBlock } from "./components/HexagonBlock";
import { RabbitBlock } from "./components/RabbitBlock";
import { useSimulation } from "../../../hooks/useSimulation.ts";
import {SimulationCanvas} from "../../components/SimulationCanvas.tsx";

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

    return (
        <main className="w-screen h-screen bg-[#f3f6f3] grid grid-cols-[240px_804px_300px] items-center justify-center gap-5">

            {/* Column 1: Estadísticas y resumen */}
            <aside className="h-[704px] rounded-lg grid grid-rows-[432px_178px_34px] gap-4">

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

            {/* Column 2: Lienzo de simulación (PixiJS irá aquí) */}
            <section className="h-[704px] w-[804px] bg-[#ffffff] border border-[#DFE8E2] rounded-lg flex flex-col justify-end">

                <div className="h-full w-full   flex flex-col justify-center">
                    <div className="w-full h-[456px] flex-col items-center gap-2">
                        <SimulationCanvas />
                    </div>
                </div>

                {/* Zona resumen superior/inferior de simulación */}
                <div className="w-full h-[107px] flex flex-row justify-center items-center border border-[#DFE8E2] rounded-lg bg-[#fafafa]">


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

            {/* Column 3: Parámetros modificables */}
            <aside className="h-[704px] bg-[#ffffff] border border-[#DFE8E2] rounded-lg flex flex-col items-center justify-center p-4">

                {/* Sliders de configuración */}
                <div className="w-[260px] h-[86px]">
                    <ResourceSlider
                        label="Cantidad inicial de conejos"
                        value={rabbitStats.initialCount}
                        min={1}
                        max={10}
                        onChange={updateInitialRabbits}
                    />
                </div>

                <div className="w-full h-px bg-[#DFE8E2] my-2" />

                <div className="w-[260px] h-[86px]">
                    <ResourceSlider
                        label="Consumo per cápita"
                        value={rabbitStats.consumptionRate}
                        min={1}
                        max={10}
                        onChange={updateConsumptionRate}
                    />
                </div>

                <div className="w-full h-px bg-[#DFE8E2] my-2" />

                <div className="w-[260px] h-[86px]">
                    <ResourceSlider
                        label="Tasa de muerte natural"
                        value={rabbitStats.deathRate}
                        min={1}
                        max={10}
                        onChange={updateDeathRate}
                    />
                </div>

                <div className="w-full h-px bg-[#DFE8E2] my-2" />

                <div className="w-[260px] h-[86px]">
                    <ResourceSlider
                        label="Regeneración por unidad de hierba"
                        value={grassStats.regenerationRate}
                        min={1}
                        max={10}
                        onChange={updateRegenerationRate}
                    />
                </div>

                <div className="w-full h-px bg-[#DFE8E2] my-3" />

                {/* Botones de control de simulación */}
                <div className="w-[260px] grid grid-cols-2 grid-rows-2 gap-4 place-items-center">
                    <div className="w-24">
                        <SimulationButton icon={1} label="Play" />
                    </div>
                    <div className="w-24">
                        <SimulationButton icon={2} label="Stop" />
                    </div>
                    <div className="w-24">
                        <SimulationButton icon={3} label="Next" onClick={nextCicle} />
                    </div>
                    <div className="w-24">
                        <SimulationButton icon={4} label="Reboot" />
                    </div>
                </div>
            </aside>

        </main>
    );
}
