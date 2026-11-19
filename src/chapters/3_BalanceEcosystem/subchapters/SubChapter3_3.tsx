import { SimulationButton } from "../../../shared/ui/SimulationButton.tsx";
import { THEME } from "../../../shared/theme.ts";
import type { NarrativeStep } from "../../../narrative/types.ts";

interface SubChapterProps {
    step: NarrativeStep;
    stepNumber: number;
    totalSteps: number;
    onNext: () => void;
}

export function SubChapter3_3({ step, onNext }: SubChapterProps) {
    return (
        <div className="w-[1440px] h-[704px] grid grid-cols-[1fr_500px] gap-[32px] items-center p-[48px]">
            <div />
            <div className="flex flex-col gap-[24px] pointer-events-auto">
                <div className="w-[500px] bg-white border border-[#DFE8E2] rounded-[16px] p-[40px] shadow-sm text-center">
                    <p className={`${THEME.fontFamily} ${THEME.primaryTextColor} ${THEME.bodyTextSize} whitespace-pre-line`}>
                        {step.text}
                    </p>
                </div>

                <div className="w-[192px] pt-[8px] self-end">
                    <SimulationButton icon="" label={step.buttonLabel || "Siguiente"} onClick={onNext} />
                </div>
            </div>
        </div>
    );
}