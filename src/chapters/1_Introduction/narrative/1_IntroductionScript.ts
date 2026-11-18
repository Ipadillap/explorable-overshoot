export interface NarrativeStep {
    id: string;
    text: string;
    buttonLabel?: string;
}

export const INTRODUCTION_NARRATIVE: NarrativeStep[] = [
    {
        id: "1.1",
        text: "Como quizás sepas, las sociedades humanas usamos los recursos que nos entrega el entorno para satisfacer todo tipo de necesidades: alimento, agua, energía, materiales… Casi todo lo que usamos a diario viene, de una forma u otra, de la naturaleza.",
        buttonLabel: "Siguiente"
    },
    {
        id: "1.2",
        text: "Pero hay algo que casi nunca vemos: esos recursos no aparecen de la nada. Tienen que venir de alguna parte, alguien o algo los genera… y eso significa que también pueden agotarse.",
        buttonLabel: "Siguiente"
    },
    {
        id: "1.3",
        text: "Entonces surge una pregunta incómoda: ¿qué pasaría si gastáramos más de lo que el entorno que nos rodea es capaz de entregarnos?",
        buttonLabel: "Siguiente"
    },
    {
        id: "1.4",
        text: "La respuesta no es tan sencilla. Parece lógico pensar que consumir de más siempre es malo… pero ¿y si te dijera que no es tan simple? A veces depende de cuánto, de por cuánto tiempo y de quién lo hace.",
        buttonLabel: "Siguiente"
    },
    {
        id: "1.5",
        text: "De eso trata esta experiencia. Y, en vez de explicártelo todo con teoría, preferimos que lo descubras por ti mismo. ¿Quieres comprobarlo de primera mano?",
        buttonLabel: "Manos a la obra."
    }
];
