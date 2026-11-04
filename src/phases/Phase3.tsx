export interface Phase3Props {
    onPrev: () => void;
}

export function Phase3({ onPrev }: Phase3Props) {
    return (
        <div className="phase-card">
            <h2>Fase 3: Reflexión y Límites Planetarios</h2>
            <p>
                Has experimentado cómo el consumo acelerado adelanta el Día del Sobregiro. Revisa las métricas globales obtenidas.
            </p>
            <button onClick={onPrev}>Ajustar Parámetros de Nuevo</button>
        </div>
    );
}