import { useState } from 'react';

export function useStepper(total: number, onFinish?: () => void) {
    const [index, setIndex] = useState(0);

    const next = () => {
        if (index < total - 1) setIndex((i) => i + 1);
        else onFinish?.();
    };

    return { index, next };
}
