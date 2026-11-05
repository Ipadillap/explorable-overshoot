export interface NarrativeStep {
    id: string;
    text: string;
    buttonLabel?: string;
}

export const ENVIRONMENT_FALLS_NARRATIVE: NarrativeStep[] = [
    {
        id: "5.1",
        text: "Hasta ahora, sin importar cómo se comportaran los conejos, la isla logró encontrar un equilibrio gracias a su capacidad de regenerarse. Pero en la realidad no siempre es así.",
        buttonLabel: "Siguiente"
    },
    {
        id: "5.2",
        text: "Imaginemos que el pasto se regenera a la mitad de velocidad, que empezamos con 10 conejos y que cada uno consume 10 unidades por ciclo.",
        buttonLabel: "Probar Escenario"
    },
    {
        id: "5.3",
        text: "La situación cambió. Ahora el sobregiro constante no solo daña al entorno: lleva a la extinción de los conejos y al agotamiento total del pasto.",
        buttonLabel: "Siguiente Capítulo"
    }
];
