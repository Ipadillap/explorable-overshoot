import { SimulationButton } from '../../../shared/ui/SimulationButton.tsx';
import { THEME } from '../../../shared/theme.ts';
import type { NarrativeStep } from '../../../narrative/types.ts';

interface SubChapterProps {
    step: NarrativeStep;
    stepNumber: number;
    totalSteps: number;
    onNext: () => void;
}

function renderHighlightedText(paragraph: string) {
    const parts = paragraph.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <strong key={index} className="font-semibold text-slate-800">
                    {part.slice(2, -2)}
                </strong>
            );
        }
        return part;
    });
}

export function SubChapter1_5({ step, onNext }: SubChapterProps) {
    const paragraphs = step.text.split('\n\n').filter(Boolean);

    return (
        <section className="w-[1440px] h-[704px] flex flex-col items-center justify-center p-[32px]">
            <div className="flex flex-col items-center gap-[24px]">
                <div className="w-[820px] bg-white border-2 border-[#4C9289] rounded-[16px] p-[40px] shadow-md flex flex-col gap-[16px] text-center">
                    <p className={`${THEME.fontFamily} ${THEME.featuredText}`}>
                        Déjame contarte una historia...
                    </p>

                    {paragraphs.map((paragraph, index) => (
                        <p
                            key={index}
                            className={`${THEME.fontFamily} ${THEME.primaryTextColor} ${THEME.bodyTextSize}`}
                        >
                            {renderHighlightedText(paragraph)}
                        </p>
                    ))}
                </div>

                <div className="w-[340px] pt-[8px]">
                    <SimulationButton
                        icon=""
                        label={step.buttonLabel || "¿Te gustaría conocer mejor este evento natural?"}
                        onClick={onNext}
                    />
                </div>
            </div>
        </section>
    );
}
