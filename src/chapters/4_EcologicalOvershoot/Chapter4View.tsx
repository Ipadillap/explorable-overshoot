import { ECOLOGICAL_OVERSHOOT_NARRATIVE as SCRIPT } from './4_EcologicalOvershootScript.ts';
import { NarrativeCard } from '../../narrative/NarrativeCard.tsx';
import { useStepper } from '../../narrative/useStepper.ts';
import type { ChapterViewProps } from '../../narrative/types.ts';

const CHAPTER_LABEL = 'Capítulo 4 — El Sobregiro Ecológico';

export function Chapter4View({ onNext }: ChapterViewProps) {
    const { index, next } = useStepper(SCRIPT.length, onNext);

    return (
        <div className="w-full h-full grid grid-cols-2 gap-8 items-center p-8 select-none bg-[#F4F7F6]">
            <section className="w-full h-[620px] bg-white border-2 border-dashed border-[#DFE8E2] rounded-2xl flex items-center justify-center text-slate-400 font-medium">
                [Zona de Simulación / Canvas PixiJS - Capítulo 3]
            </section>

            <section className="w-full flex items-center justify-center">
                <NarrativeCard
                    chapterLabel={CHAPTER_LABEL}
                    step={SCRIPT[index]}
                    stepNumber={index + 1}
                    totalSteps={SCRIPT.length}
                    onNext={next}
                />
            </section>
        </div>
    );
}
