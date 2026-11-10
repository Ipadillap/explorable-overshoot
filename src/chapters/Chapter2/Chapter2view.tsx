// src/chapters/Chapter2/Chapter2view.tsx

import { useRef, useState } from "react";
import {
    FullSimulationSandbox,
    type FullSimulationSandboxRef,
} from "../../shared/components/simulation/FullSimulationSandbox";

type VisState = {
    // Panel Izquierdo
    biocapacity: boolean;
    footprint: boolean;
    consumed: boolean;
    overshoot: boolean;

    // Panel Central
    canvas: boolean;
    cycleIndicator: boolean;
    totalRabbits: boolean;
    totalGrass: boolean;
    grassToBeRenewed: boolean;
    grassToNotBeRenewed: boolean;

    // Panel Derecho
    initialRabbitsSlider: boolean;
    consumptionRateSlider: boolean;
    deathRateSlider: boolean;
    regenerationRateSlider: boolean;
    playButton: boolean;
    stopButton: boolean;
    nextButton: boolean;
    rebootButton: boolean;
};

export function Chapter2view() {
    const sandboxRef = useRef<FullSimulationSandboxRef>(null);

    const [vis, setVis] = useState<VisState>({
        biocapacity: true,
        footprint: true,
        consumed: true,
        overshoot: true,
        canvas: true,
        cycleIndicator: true,
        totalRabbits: true,
        totalGrass: true,
        grassToBeRenewed: true,
        grassToNotBeRenewed: true,
        initialRabbitsSlider: true,
        consumptionRateSlider: true,
        deathRateSlider: true,
        regenerationRateSlider: true,
        playButton: true,
        stopButton: true,
        nextButton: true,
        rebootButton: true,
    });

    const toggleItem = (
        panel: "leftPanel" | "centerPanel" | "rightPanel",
        itemKey: keyof VisState
    ) => {
        const nextState = !vis[itemKey];
        setVis((prev) => ({ ...prev, [itemKey]: nextState }));

        if (!sandboxRef.current) return;

        // Invocación segura sin casting incorrecto
        const panelRef = sandboxRef.current[panel] as unknown as Record<string, { setTrue: () => void; setFalse: () => void }>;
        if (panelRef && panelRef[itemKey]) {
            if (nextState) {
                panelRef[itemKey].setTrue();
            } else {
                panelRef[itemKey].setFalse();
            }
        }
    };

    const toggleAll = (show: boolean) => {
        const updated = Object.keys(vis).reduce((acc, k) => {
            acc[k as keyof VisState] = show;
            return acc;
        }, {} as VisState);

        setVis(updated);
        if (show) {
            sandboxRef.current?.leftPanel.setTrue();
            sandboxRef.current?.centerPanel.setTrue();
            sandboxRef.current?.rightPanel.setTrue();
        } else {
            sandboxRef.current?.leftPanel.setFalse();
            sandboxRef.current?.centerPanel.setFalse();
            sandboxRef.current?.rightPanel.setFalse();
        }
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

            {/* Cuerpos Principales */}
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
                        <ToggleButton
                            label="Biocapacidad"
                            active={vis.biocapacity}
                            onClick={() => toggleItem("leftPanel", "biocapacity")}
                        />
                        <ToggleButton
                            label="Huella Ecológica"
                            active={vis.footprint}
                            onClick={() => toggleItem("leftPanel", "footprint")}
                        />
                        <ToggleButton
                            label="Hierba Consumida"
                            active={vis.consumed}
                            onClick={() => toggleItem("leftPanel", "consumed")}
                        />
                        <ToggleButton
                            label="Sobregiro Ecológico"
                            active={vis.overshoot}
                            onClick={() => toggleItem("leftPanel", "overshoot")}
                        />
                    </div>

                    <div className="w-full h-px bg-[#DFE8E2]" />

                    {/* Grupo 2: Centro */}
                    <div className="flex flex-col gap-1.5">
                        <span className="font-semibold text-slate-500 text-[10px] uppercase">
                            Lienzo y Resumen (Centro)
                        </span>
                        <ToggleButton
                            label="Lienzo PixiJS"
                            active={vis.canvas}
                            onClick={() => toggleItem("centerPanel", "canvas")}
                        />
                        <ToggleButton
                            label="Indicador de Ciclo"
                            active={vis.cycleIndicator}
                            onClick={() => toggleItem("centerPanel", "cycleIndicator")}
                        />
                        <ToggleButton
                            label="Conejos Totales"
                            active={vis.totalRabbits}
                            onClick={() => toggleItem("centerPanel", "totalRabbits")}
                        />
                        <ToggleButton
                            label="Pasto Libre"
                            active={vis.totalGrass}
                            onClick={() => toggleItem("centerPanel", "totalGrass")}
                        />
                        <ToggleButton
                            label="Pasto en Renovación"
                            active={vis.grassToBeRenewed}
                            onClick={() => toggleItem("centerPanel", "grassToBeRenewed")}
                        />
                        <ToggleButton
                            label="Celdas Agotadas"
                            active={vis.grassToNotBeRenewed}
                            onClick={() => toggleItem("centerPanel", "grassToNotBeRenewed")}
                        />
                    </div>

                    <div className="w-full h-px bg-[#DFE8E2]" />

                    {/* Grupo 3: Derecha */}
                    <div className="flex flex-col gap-1.5">
                        <span className="font-semibold text-slate-500 text-[10px] uppercase">
                            Sliders y Botones (Derecha)
                        </span>
                        <ToggleButton
                            label="Slider: Conejos Iniciales"
                            active={vis.initialRabbitsSlider}
                            onClick={() => toggleItem("rightPanel", "initialRabbitsSlider")}
                        />
                        <ToggleButton
                            label="Slider: Consumo"
                            active={vis.consumptionRateSlider}
                            onClick={() => toggleItem("rightPanel", "consumptionRateSlider")}
                        />
                        <ToggleButton
                            label="Slider: Mortalidad"
                            active={vis.deathRateSlider}
                            onClick={() => toggleItem("rightPanel", "deathRateSlider")}
                        />
                        <ToggleButton
                            label="Slider: Regeneración"
                            active={vis.regenerationRateSlider}
                            onClick={() => toggleItem("rightPanel", "regenerationRateSlider")}
                        />
                        <ToggleButton
                            label="Botón Play"
                            active={vis.playButton}
                            onClick={() => toggleItem("rightPanel", "playButton")}
                        />
                        <ToggleButton
                            label="Botón Stop"
                            active={vis.stopButton}
                            onClick={() => toggleItem("rightPanel", "stopButton")}
                        />
                        <ToggleButton
                            label="Botón Next"
                            active={vis.nextButton}
                            onClick={() => toggleItem("rightPanel", "nextButton")}
                        />
                        <ToggleButton
                            label="Botón Reboot"
                            active={vis.rebootButton}
                            onClick={() => toggleItem("rightPanel", "rebootButton")}
                        />
                    </div>
                </aside>
            </div>
        </div>
    );
}

function ToggleButton({
                          label,
                          active,
                          onClick,
                      }: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full text-left px-2.5 py-1 rounded border font-medium transition-all text-[11px] flex items-center justify-between ${
                active
                    ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                    : "bg-gray-50 text-gray-400 border-gray-200 opacity-60"
            }`}
        >
            <span>{label}</span>
            <span
                className={`w-2 h-2 rounded-full ${
                    active ? "bg-emerald-500" : "bg-gray-300"
                }`}
            />
        </button>
    );
}
