import type { NarrativeStep } from '../../narrative/types.ts';

export const BALANCE_ECOSYSTEM_NARRATIVE: NarrativeStep[] = [
    {
        id: "3.1",
        text: "Ahora imaginemos que, cada el mismo timepo que el pasto regenrandose se vuelve verde, una parte de los conejos muere de forma natural, sin importar cuánto pasto haya. Y que, por cada 5 unidades de hierba consumidas, nace un conejo nuevo.",
        buttonLabel: "Siguiente"
    },
    {
        id: "3.2",
        text: "A ese lapso de tiempo, que define cambios en el entorno de hierba y en la poblacion de conejos lo llamaremos ciclo. Lo veremos en cámara rápida, porque los conejos son muy activos.",
        buttonLabel: "Iniciar Simulación"
    },
    {
        id: "3.3",
        text: "¡Parece que a los conejos les va de maravilla! Comen lo justo para que nazcan nuevos conejos, y los más viejos mueren por causas naturales.",
        buttonLabel: "Continuar"
    },
    {
        id: "3.4",
        text: "Esto es un ecosistema en equilibrio: la población y el pasto conviven sin que ninguno afecte la subsistencia del otro.",
        buttonLabel: "Siguiente Capítulo"
    }
];
