export interface NarrativeStep {
    id: string;
    text: string;
    buttonLabel?: string;
}

export const INTRODUCTION_NARRATIVE: NarrativeStep[] = [
    {
        id: "1.1",
        text: "Como quizás sepas, las sociedades humanas usamos los recursos que nos entrega el entorno para satisfacer todo tipo de necesidades.",
        buttonLabel: "Siguiente"
    },
    {
        id: "1.2",
        text: "Pero hay algo que casi nunca vemos: esos recursos tienen que venir de alguna parte. Alguien o algo los genera… y, por lo tanto, también pueden agotarse.\n\nEntonces, ¿qué pasaría si gastáramos más de lo que el entorno puede entregarnos?",
        buttonLabel: "Siguiente"
    },
    {
        id: "1.3",
        text: "La respuesta no es tan sencilla. Parece lógico pensar que consumir de más es malo… pero ¿y si te dijera que no es tan simple?",
        buttonLabel: "Siguiente"
    },
    {
        id: "1.4",
        text: "De eso trata esta experiencia. ¿Quieres comprobarlo de primera mano?",
        buttonLabel: "¡Manos a la obra!"
    }
];