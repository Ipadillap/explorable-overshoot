export interface NarrativeStep {
    id: string;
    text: string;
    buttonLabel?: string;
}

export const ECOLOGICAL_OVERSHOOT_NARRATIVE: NarrativeStep[] = [
    {
        id: "4.1",
        text: "Puede que pienses: «Vale, los conejos viven en equilibrio y felices». Y es verdad. Pero, aunque no lo creas, en el primer ciclo ya estuvimos frente a un sobregiro ecológico.",
        buttonLabel: "Siguiente"
    },
    {
        id: "4.2",
        text: "El sobregiro ecológico ocurre cuando una sociedad consume más de lo que su entorno puede regenerar.",
        buttonLabel: "Siguiente"
    },
    {
        id: "4.3",
        text: "Para medirlo usamos dos indicadores:\n\n• Huella Ecológica: cuánto pasto necesitan los conejos.\n• Biocapacidad: cuánto pasto puede regenerar la isla.",
        buttonLabel: "Siguiente"
    },
    {
        id: "4.4",
        text: "Al comienzo, la isla está completamente cubierta de pasto, así que no hay espacio para que crezca más: la Biocapacidad es 0. Los conejos, en cambio, necesitan recursos. Hubo sobregiro.",
        buttonLabel: "Siguiente"
    },
    {
        id: "4.5",
        text: "Y aun así, no tuvo ninguna consecuencia para los conejos.",
        buttonLabel: "Siguiente"
    },
    {
        id: "4.6",
        text: "Pero ¿y si los conejos necesitaran más pasto? Por ejemplo, entre 5 y 10 unidades cada uno por ciclo.",
        buttonLabel: "Ajustar consumo"
    },
    {
        id: "4.7",
        text: "¿Crees que el ciclo seguirá igual?",
        buttonLabel: "Probar"
    },
    {
        id: "4.8",
        text: "Como puedes ver, la población empezó a crecer y a consumir cada vez más pasto. Hasta que, en algún momento, la comida no alcanzó para todos y comenzaron a morir más conejos de lo normal. Y todavía sigue pasando en varios ciclos.",
        buttonLabel: "Siguiente"
    },
    {
        id: "4.9",
        text: "Aunque el pasto se mantiene gracias a su regeneración, hay conejos que simplemente no comen lo suficiente y mueren antes de tiempo.",
        buttonLabel: "Siguiente"
    },
    {
        id: "4.10",
        text: "Este final tiene un síntoma claro: sobregiro sostenido. Y no depende de un solo factor: los conejos consumen más, la mortalidad natural no cambió y el pasto se regenera lo bastante rápido para sostener el equilibrio.",
        buttonLabel: "Siguiente"
    },
    {
        id: "4.11",
        text: "Cada factor de la isla cuenta una parte de la historia. Veamos qué pasa si cambiamos otro.",
        buttonLabel: "Siguiente Capítulo"
    }
];
