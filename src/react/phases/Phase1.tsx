import type { ReactNode } from 'react';

export interface PhaseProps {
    onNext: () => void;
    children?: ReactNode;
}

export function Phase1({ onNext, children }: PhaseProps) {
    return (
        <div className="phase-card">
            <h2>Fase 1: Introducción a la Biocapacidad</h2>
            <p>
                En esta primera etapa observarás cómo los recursos de la isla se regeneran de forma natural
                en un estado de equilibrio previo al sobregiro.
            </p>
            {children}
            <button onClick={onNext}>Iniciar Experimento (Fase 2)</button>
        </div>
    );
}