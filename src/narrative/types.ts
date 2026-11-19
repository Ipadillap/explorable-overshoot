export interface NarrativeStep {
    id: string;
    text: string;
    buttonLabel?: string;
}

export interface ChapterViewProps {
    onNext?: () => void;
    onPrev?: () => void;
}
