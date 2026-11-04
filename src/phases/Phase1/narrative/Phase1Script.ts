// src/phases/Phase1/narrative/Phase1Script.ts

export interface NarrativeStep {
    id: number;
    title: string;
    text: string;
    buttonLabel?: string; // Por defecto será "Siguiente" o "Avanzar"
}

export const PHASE1_NARRATIVE: NarrativeStep[] = [
    {
        id: 1,
        title: "¡Bienvenido a la Isla!",
        text: "En este módulo aprenderás sobre el concepto de Sobregiro Ecológico y cómo las poblaciones interactúan con los recursos disponibles.",
        buttonLabel: "Continuar"
    },
    {
        id: 2,
        title: "El Equilibrio del Ecosistema",
        text: "Los recursos de la isla son limitados. Cada conejo requiere cierta cantidad de hierba para sobrevivir y reproducirse cada ciclo.",
        buttonLabel: "Continuar"
    },
    {
        id: 3,
        title: "Tu Objetivo",
        text: "A través de las siguientes fases, podrás ajustar la población, el consumo y la tasa de regeneración para observar cuándo el ecosistema entra en sobregiro.",
        buttonLabel: "Ir a la Simulación"
    }
];
