export interface NarrativeStep {
    id: string;
    text: string;
    buttonLabel?: string;
}

export const BASE_CONTEXT_NARRATIVE: NarrativeStep[] = [
    {
        id: "2.1",
        text: "Aunque seamos humanos, entender cómo consumimos puede ser complicado. Piensa en todo lo que hace falta para usar una simple hoja de papel: planificar, talar y transportar, procesar, blanquear, refinar y, por fin, fabricar el papel. ¡Y sin contar los pasos intermedios!",
        buttonLabel: "Siguiente"
    },
    {
        id: "2.2",
        text: "Por eso, para entender el fenómeno, empezaremos con algo mucho más simple. Te presento a los protagonistas de esta historia.",
        buttonLabel: "Continuar"
    },
    {
        id: "2.3",
        text: "Esta es la Isla de San Ignacio. ¿Te suena a la Isla de Pascua? Se inspira en ella, pero es completamente ficticia.",
        buttonLabel: "Siguiente"
    },
    {
        id: "2.4",
        text: "En esta isla hay un único recurso: la hierba. Cada polígono es una unidad de hierba, y puede estar en uno de tres estados:\n\n• Verde: se puede consumir.\n• Amarillo: se está regenerando.\n• Rojo: no se puede consumir por ahora.",
        buttonLabel: "Siguiente"
    },
    {
        id: "2.5",
        text: "Además, al terminar cada ciclo, la hierba puede sembrar nuevas unidades (los polígonos amarillos).",
        buttonLabel: "Siguiente"
    },
    {
        id: "2.6",
        text: "Hace poco, unos nuevos habitantes llegaron a esta isla desierta, y planean quedarse: los conejos.",
        buttonLabel: "Siguiente"
    },
    {
        id: "2.7",
        text: "¿Cómo crees que les irá a nuestros visitantes en la isla?",
        buttonLabel: "Siguiente Capítulo"
    }
];
