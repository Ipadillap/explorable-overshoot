export interface NarrativeStep {
    id: string;
    text: string;
    buttonLabel?: string;
}

export const GENERAL_ANALYSIS_NARRATIVE: NarrativeStep[] = [
    {
        id: "6.1",
        text: "Hasta ahora vimos tres finales distintos. En todos apareció el sobregiro, pero de formas muy diferentes.",
        buttonLabel: "Siguiente"
    },
    {
        id: "6.2",
        text: "En el primero, solo apareció al comienzo. En el segundo, se mantuvo, pero de forma más suave, y el sistema encontró un equilibrio. En el tercero, fue constante y tan intenso que terminó en extinción.",
        buttonLabel: "Siguiente"
    },
    {
        id: "6.3",
        text: "Entonces, ¿es realmente malo el sobregiro? ¿O da lo mismo? Lo importante es fijarse en los patrones.",
        buttonLabel: "Siguiente"
    },
    {
        id: "6.4",
        text: "El sobregiro es solo un indicador: compara lo que una sociedad necesita con lo que su entorno puede regenerar. Lo importante es interpretarlo según la sociedad en que ocurre y si se sostiene en el tiempo.",
        buttonLabel: "Siguiente"
    },
    {
        id: "6.5",
        text: "Existen muchos finales posibles, y todo depende de analizar bien el entorno: cuánto consumen los conejos, cuánto se regenera el pasto y cuál es la tasa de mortalidad.",
        buttonLabel: "Siguiente"
    },
    {
        id: "6.6",
        text: "La clave es reconocer cuándo el sobregiro deja de ser un caso aislado y se convierte en un patrón.",
        buttonLabel: "Siguiente"
    },
    {
        id: "6.7",
        text: "Y ojo: incluso cuando el sistema parece estabilizarse, un sobregiro sostenido tiene un costo. Siempre habrá conejos que no logren alimentarse.",
        buttonLabel: "Ir a la Simulación Interactiva"
    }
];
