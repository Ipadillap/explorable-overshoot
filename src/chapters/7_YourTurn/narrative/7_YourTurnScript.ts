export interface NarrativeStep {
    id: string;
    text: string;
    buttonLabel?: string;
}

export const YOUR_TURN_NARRATIVE: NarrativeStep[] = [
    {
        id: "7.1",
        text: "Ahora te invito a dejar volar tu creatividad: prueba distintas combinaciones, busca relaciones, observa las consecuencias de un sobregiro sostenido e intenta identificar los distintos finales.",
        buttonLabel: "Siguiente"
    },
    {
        id: "7.2",
        text: "Recuerda: el sobregiro no es necesariamente algo malo. Es una referencia del estado de una sociedad en un instante dado, y una invitación a prestar atención al entorno y a las decisiones que tomamos.",
        buttonLabel: "Siguiente"
    },
    {
        id: "7.3",
        text: "Aquí tienes los controles. Con los sliders puedes definir la cantidad inicial de conejos y, entre ciclos, cambiar el comportamiento del entorno y de la sociedad.",
        buttonLabel: "Siguiente"
    },
    {
        id: "7.4",
        text: "Y aquí abajo puedes iniciar los ciclos en automático, detenerlos, avanzar de a un ciclo o volver a empezar.",
        buttonLabel: "Siguiente"
    },
    {
        id: "7.5",
        text: "Apóyate en los indicadores para saber si una decisión fue buena, y cómo cada cambio de comportamiento afecta, para bien o para mal, a la sociedad.",
        buttonLabel: "Comenzar Exploración Libre"
    }
];
