import { Hexagon } from "lucide-react";
import { SimulationButton } from "../../../shared/ui/SimulationButton.tsx";
import { THEME } from "../../../shared/theme.ts";
import type { NarrativeStep } from "../../../narrative/types.ts";

interface SubChapterProps {
    step: NarrativeStep;
    stepNumber: number;
    totalSteps: number;
    onNext: () => void;
}

const GRASS_STATE_BADGES: Record<string, { fill: string; stroke: string }> = {
    Verde: { fill: "#94B98A", stroke: "#759971" },
    Amarillo: { fill: "#EAC976", stroke: "#C8A856" },
    Rojo: { fill: "#E2D1C3", stroke: "#C8B6A6" },
};

function renderGrassStates(text: string) {
    return text.split("\n").map((line, index) => {
        const match = line.match(/^•\s*(Verde|Amarillo|Rojo):\s*(.*)$/);
        if (match) {
            const [, label, description] = match;
            const colors = GRASS_STATE_BADGES[label];
            return (
                <span key={index} className="flex items-center justify-center gap-[8px] mt-[8px]">
                    <Hexagon
                        className="w-[18px] h-[18px] shrink-0"
                        style={{ fill: colors.fill, color: colors.stroke }}
                    />
                    <span>
                        <strong className="font-semibold text-slate-800">{label}:</strong> {description}
                    </span>
                </span>
            );
        }

        return (
            <span key={index} className="block">
                {line === "" ? "\u00A0" : line}
            </span>
        );
    });
}

export function SubChapter2_4({ step, onNext }: SubChapterProps) {
    return (
        <div className="w-[1440px] h-[704px] grid grid-cols-[1fr_500px] gap-[32px] items-center p-[48px]">
            <div />
            <div className="flex flex-col gap-[24px] pointer-events-auto">
                <div className="w-[500px] bg-white border border-[#DFE8E2] rounded-[16px] p-[40px] shadow-sm text-center">
                    <p className={`${THEME.fontFamily} ${THEME.primaryTextColor} ${THEME.bodyTextSize}`}>
                        {renderGrassStates(step.text)}
                    </p>
                </div>

                <div className="w-[192px] pt-[8px] self-end">
                    <SimulationButton icon="" label={step.buttonLabel || "Siguiente"} onClick={onNext} />
                </div>
            </div>
        </div>
    );
}
