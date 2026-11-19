import type { RefObject } from "react";
import type { FullSimulationSandboxRef } from "../simulation";

export interface NarrativeStep {
    id: string;
    text: string;
    buttonLabel?: string;
}

export interface ChapterViewProps {
    onNext?: () => void;
    onPrev?: () => void;
    sandboxRef?: RefObject<FullSimulationSandboxRef | null>;
}
