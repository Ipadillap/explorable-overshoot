import { THEME } from "../../../shared/theme.ts";
import type { NarrativeStep } from "../../../narrative/types.ts";

interface SubChapterProps {
    step: NarrativeStep;
    stepNumber: number;
    totalSteps: number;
    onNext: () => void;
}

export function SubChapter2_7({ step, onNext }: SubChapterProps) {
    return (
        <div className="w-[1440px] h-[704px] grid grid-cols-[1fr_500px] gap-[32px] items-center p-[48px]">
            <div />
            <div className="flex flex-col gap-[24px] pointer-events-auto">
                <div className="w-[500px] bg-white border border-[#DFE8E2] rounded-[16px] p-[40px] shadow-sm text-center">
                    <p className={`${THEME.fontFamily} ${THEME.primaryTextColor} ${THEME.bodyTextSize} whitespace-pre-line`}>
                        {step.text}
                    </p>
                </div>

                <div className="w-[500px] pt-[8px] grid grid-cols-2 gap-[16px]">
                    <button
                        type="button"
                        onClick={onNext}
                        className="w-full h-[38px] px-4 rounded-lg bg-[#E56B6F] hover:bg-[#d65b5f] text-white font-semibold text-sm flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                    >
                        Todos morirían
                    </button>

                    <button
                        type="button"
                        onClick={onNext}
                        className="w-full h-[38px] px-4 rounded-lg bg-[#4C9289] hover:bg-[#3f7c74] text-white font-semibold text-sm flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                    >
                        Guata feliz, vida feliz
                    </button>
                </div>
            </div>
        </div>
    );
}
