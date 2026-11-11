import { useRef, useState } from "react";
import {
    FullSimulationSandbox,
    type FullSimulationSandboxRef
} from "../shared/components/simulation/FullSimulationSandbox.tsx";


export function SimulationTestView() {
    const sandboxRef = useRef<FullSimulationSandboxRef>(null);

    const [vis, setVis] = useState({
        showBiocapacity: true,
        showFootprint: true,
        showConsumed: true,
        showOvershoot: true,

        showCanvas: true,
        showCycleIndicator: true,
        showTotalRabbits: true,
        showTotalGrass: true,
        showGrassToBeRenewed: true,
        showGrassToNotBeRenewed: true,

        showInitialRabbitsSlider: true,
        showConsumptionRateSlider: true,
        showDeathRateSlider: true,
        showRegenerationRateSlider: true,
        showPlayButton: true,
        showStopButton: true,
        showNextButton: true,
        showRebootButton: true,
    });

    const toggleLeft = (key: keyof typeof vis) => {
        const nextVal = !vis[key];
        setVis((prev) => ({ ...prev, [key]: nextVal }));
        sandboxRef.current?.setLeftPanelVisibility({ [key]: nextVal });
    };

    const toggleCenter = (key: keyof typeof vis) => {
        const nextVal = !vis[key];
        setVis((prev) => ({ ...prev, [key]: nextVal }));
        sandboxRef.current?.setCenterPanelVisibility({ [key]: nextVal });
    };

    const toggleRight = (key: keyof typeof vis) => {
        const nextVal = !vis[key];
        setVis((prev) => ({ ...prev, [key]: nextVal }));
        sandboxRef.current?.setRightPanelVisibility({ [key]: nextVal });
    };

    const toggleAll = (show: boolean) => {
        const nextVis = Object.keys(vis).reduce((acc, k) => {
            acc[k as keyof typeof vis] = show;
            return acc;
        }, {} as typeof vis);

        setVis(nextVis);
        sandboxRef.current?.setVisibility({
            leftPanel: { showBiocapacity: show, showFootprint: show, showConsumed: show, showOvershoot: show },
            centerPanel: { showCanvas: show, showCycleIndicator: show, showTotalRabbits: show, showTotalGrass: show, showGrassToBeRenewed: show, showGrassToNotBeRenewed: show },
            rightPanel: { showInitialRabbitsSlider: show, showConsumptionRateSlider: show, showDeathRateSlider: show, showRegenerationRateSlider: show, showPlayButton: show, showStopButton: show, showNextButton: show, showRebootButton: show }
        });
    };

    return (
        <div className="w-full h-full flex flex-col gap-3 select-none p-2">
            {/* Barra Superior */}
            <header className="w-full flex items-center justify-between bg-white px-4 py-2 rounded-lg border border-[#DFE8E2] shadow-sm shrink-0">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => toggleAll(true)}
                        className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded hover:bg-slate-200 transition"
                    >
                        Mostrar Todo
                    </button>
                    <button
                        type="button"
                        onClick={() => toggleAll(false)}
                        className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded hover:bg-slate-200 transition"
                    >
                        Ocultar Todo
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => sandboxRef.current?.play()}
                        className="px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded hover:bg-slate-800 transition shadow-sm"
                    >
                        Run
                    </button>
                    <button
                        type="button"
                        onClick={() => sandboxRef.current?.stop()}
                        className="px-3 py-1 bg-slate-200 text-slate-800 text-xs font-semibold rounded hover:bg-slate-300 transition"
                    >
                        Stop
                    </button>
                    <button
                        type="button"
                        onClick={() => sandboxRef.current?.nextCycle()}
                        className="px-3 py-1 bg-slate-200 text-slate-800 text-xs font-semibold rounded hover:bg-slate-300 transition"
                    >
                        Next
                    </button>
                    <button
                        type="button"
                        onClick={() => sandboxRef.current?.reset()}
                        className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-semibold rounded hover:bg-rose-200 transition"
                    >
                        Reboot
                    </button>
                </div>
            </header>

            {/* Cuerpo Principal */}
            <div className="w-full flex-1 flex flex-row gap-4 items-center justify-center overflow-hidden">
                {/* Sandbox */}
                <div className="flex-1 h-full flex items-center justify-center overflow-hidden">
                    <FullSimulationSandbox ref={sandboxRef} />
                </div>

                {/* Sidebar Derecho de Toggles */}
                <aside className="w-[260px] h-full bg-white border border-[#DFE8E2] rounded-lg p-3 flex flex-col gap-3 overflow-y-auto shrink-0 shadow-sm text-xs">
                    {/* Grupo 1: Métricas */}
                    <div className="flex flex-col gap-1.5">
                        <span className="font-semibold text-slate-500 text-[10px] uppercase">
                            Métricas (Izquierda)
                        </span>
                        <ToggleButton label="Biocapacidad" active={vis.showBiocapacity} onClick={() => toggleLeft("showBiocapacity")} />
                        <ToggleButton label="Huella Ecológica" active={vis.showFootprint} onClick={() => toggleLeft("showFootprint")} />
                        <ToggleButton label="Hierba Consumida" active={vis.showConsumed} onClick={() => toggleLeft("showConsumed")} />
                        <ToggleButton label="Sobregiro Ecológico" active={vis.showOvershoot} onClick={() => toggleLeft("showOvershoot")} />
                    </div>

                    <div className="w-full h-px bg-[#DFE8E2]" />

                    {/* Grupo 2: Centro */}
                    <div className="flex flex-col gap-1.5">
                        <span className="font-semibold text-slate-500 text-[10px] uppercase">
                            Lienzo y Resumen (Centro)
                        </span>
                        <ToggleButton label="Lienzo PixiJS" active={vis.showCanvas} onClick={() => toggleCenter("showCanvas")} />
                        <ToggleButton label="Indicador de Ciclo" active={vis.showCycleIndicator} onClick={() => toggleCenter("showCycleIndicator")} />
                        <ToggleButton label="Conejos Totales" active={vis.showTotalRabbits} onClick={() => toggleCenter("showTotalRabbits")} />
                        <ToggleButton label="Pasto Libre" active={vis.showTotalGrass} onClick={() => toggleCenter("showTotalGrass")} />
                        <ToggleButton label="Pasto en Renovación" active={vis.showGrassToBeRenewed} onClick={() => toggleCenter("showGrassToBeRenewed")} />
                        <ToggleButton label="Celdas Agotadas" active={vis.showGrassToNotBeRenewed} onClick={() => toggleCenter("showGrassToNotBeRenewed")} />
                    </div>

                    <div className="w-full h-px bg-[#DFE8E2]" />

                    {/* Grupo 3: Derecha */}
                    <div className="flex flex-col gap-1.5">
                        <span className="font-semibold text-slate-500 text-[10px] uppercase">
                            Sliders y Botones (Derecha)
                        </span>
                        <ToggleButton label="Slider: Conejos Iniciales" active={vis.showInitialRabbitsSlider} onClick={() => toggleRight("showInitialRabbitsSlider")} />
                        <ToggleButton label="Slider: Consumo" active={vis.showConsumptionRateSlider} onClick={() => toggleRight("showConsumptionRateSlider")} />
                        <ToggleButton label="Slider: Mortalidad" active={vis.showDeathRateSlider} onClick={() => toggleRight("showDeathRateSlider")} />
                        <ToggleButton label="Slider: Regeneración" active={vis.showRegenerationRateSlider} onClick={() => toggleRight("showRegenerationRateSlider")} />
                        <ToggleButton label="Botón Play" active={vis.showPlayButton} onClick={() => toggleRight("showPlayButton")} />
                        <ToggleButton label="Botón Stop" active={vis.showStopButton} onClick={() => toggleRight("showStopButton")} />
                        <ToggleButton label="Botón Next" active={vis.showNextButton} onClick={() => toggleRight("showNextButton")} />
                        <ToggleButton label="Botón Reboot" active={vis.showRebootButton} onClick={() => toggleRight("showRebootButton")} />
                    </div>
                </aside>
            </div>
        </div>
    );
}

function ToggleButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full text-left px-2.5 py-1 rounded border font-medium transition-all text-[11px] flex items-center justify-between ${
                active ? "bg-emerald-50 text-emerald-900 border-emerald-300" : "bg-gray-50 text-gray-400 border-gray-200 opacity-60"
            }`}
        >
            <span>{label}</span>
            <span className={`w-2 h-2 rounded-full ${active ? "bg-emerald-500" : "bg-gray-300"}`} />
        </button>
    );
}
