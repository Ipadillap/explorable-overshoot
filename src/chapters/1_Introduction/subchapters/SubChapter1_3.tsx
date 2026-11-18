import { SimulationButton } from '../../../shared/components/SimulationButton';
import { THEME } from '../../../shared/theme';
import type { NarrativeStep } from '../narrative/1_IntroductionScript';

interface SubChapterProps {
    step: NarrativeStep;
    stepNumber: number;
    totalSteps: number;
    onNext: () => void;
}

export function SubChapter1_3({ step, onNext }: SubChapterProps) {
    const questionIndex = step.text.indexOf('¿');
    const mainText = questionIndex !== -1 ? step.text.slice(0, questionIndex).trim() : step.text;
    const questionText = questionIndex !== -1 ? step.text.slice(questionIndex).trim() : '';

    return (
        <section className="w-[1440px] h-[704px] flex flex-col items-center justify-center p-[32px]">
            <div className="flex flex-col items-center gap-[24px]">
                <div className="w-[620px] bg-white border border-[#DFE8E2] rounded-[16px] p-[40px] shadow-sm text-center flex flex-col gap-[20px]">
                    <p className={`${THEME.fontFamily} ${THEME.primaryTextColor} ${THEME.bodyTextSize}`}>
                        {mainText}
                    </p>

                    {questionText && (
                        <p className={`${THEME.fontFamily} ${THEME.featuredText}`}>
                            {questionText}
                        </p>
                    )}
                </div>

                <div className="w-[192px] pt-[8px]">
                    <SimulationButton
                        icon=""
                        label={step.buttonLabel || "Siguiente"}
                        onClick={onNext}
                    />
                </div>
            </div>
        </section>
    );
}
