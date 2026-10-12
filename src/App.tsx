import { useState } from 'react';
import {Phase1} from './react/phases/Phase1.tsx';
import {Phase2view} from './react/phases/Phase2/Phase2view.tsx';
import {Phase3} from './react/phases/Phase3.tsx';


export function App() {
    const [currentPhase, setCurrentPhase] = useState<1 | 2 | 3>(1);

    const nextPhase = () => setCurrentPhase((prev) => Math.min(prev + 1, 3) as 1 | 2 | 3);
    const prevPhase = () => setCurrentPhase((prev) => Math.max(prev - 1, 1) as 1 | 2 | 3);

    return (
        <div className="app-container">

            {currentPhase === 1 && (
                <Phase1 onNext={nextPhase} />
            )}

            {currentPhase === 2 && (
                <Phase2view/>
            )}

            {currentPhase === 3 && (
                <Phase3 onPrev={prevPhase} />
            )}
        </div>
    );
}
