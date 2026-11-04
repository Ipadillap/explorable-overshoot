import { useState } from 'react';
import {Phase1View} from './phases/Phase1/Phase1View.tsx';
import {Phase2view} from './phases/Phase2/Phase2view.tsx';
import {Phase3} from './phases/Phase3.tsx';


export function App() {
    const [currentPhase, setCurrentPhase] = useState<1 | 2 | 3>(1);

    const nextPhase = () => setCurrentPhase((prev) => Math.min(prev + 1, 3) as 1 | 2 | 3);
    const prevPhase = () => setCurrentPhase((prev) => Math.max(prev - 1, 1) as 1 | 2 | 3);

    return (
        <div className="app-container">

            {currentPhase === 1 && (
                <Phase1View onNext={nextPhase} />
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
