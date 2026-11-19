import { SimulationButton } from "../../../shared/ui/SimulationButton.tsx";
import { THEME } from "../../../shared/theme.ts";
import type { NarrativeStep } from "../../../narrative/types.ts";

interface SubChapterProps {
    step: NarrativeStep;
    stepNumber: number;
    totalSteps: number;
    onNext: () => void;
}

export function SubChapter2_2({ step, onNext }: SubChapterProps) {
    return (
        <div className="w-[1440px] h-[704px] flex items-center justify-center p-[48px] bg-[#FFFFFF] pointer-events-auto">
            <div className="flex flex-col items-center gap-[24px]">
                <div className="w-[620px] bg-white border border-[#DFE8E2] rounded-[16px] p-[40px] shadow-sm text-center">
                    <p className={`${THEME.fontFamily} ${THEME.primaryTextColor} ${THEME.bodyTextSize} whitespace-pre-line`}>
                        {step.text}
                    </p>
                </div>

                <div className="w-[192px] pt-[8px] self-center">
                    <SimulationButton icon="" label={step.buttonLabel || "Siguiente"} onClick={onNext} />
                </div>
            </div>
        </div>
    );
}
