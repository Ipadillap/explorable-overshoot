export interface NarrativeStep {
    id: string;
    text: string;
    buttonLabel?: string;
}

export const BALANCE_ECOSYSTEM_NARRATIVE: NarrativeStep[] = [
    {
        id: "3.1",
        text: "Ahora imaginemos que, en cada ciclo, una parte de los conejos muere de forma natural, sin importar cuánto pasto haya. Y que, por cada 5 unidades de hierba consumidas, nace un conejo nuevo.",
        buttonLabel: "Siguiente"
    },
    {
        id: "3.2",
        text: "A ese lapso lo llamaremos ciclo. Lo veremos en cámara rápida, porque los conejos son muy activos.",
        buttonLabel: "Iniciar Simulación"
    },
    {
        id: "3.3",
        text: "¡Parece que a los conejos les va de maravilla! Comen lo justo para que nazcan nuevos conejos, y los más viejos mueren por causas naturales.",
        buttonLabel: "Continuar"
    },
    {
        id: "3.4",
        text: "Esto es un ecosistema en equilibrio: la población y el pasto conviven sin que ninguno se agote.",
        buttonLabel: "Siguiente Capítulo"
    }
];
