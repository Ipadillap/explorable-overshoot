import {
    FullSimulationSandbox,
    type FullSimulationSandboxRef
} from "../shared/components/simulation/FullSimulationSandbox.tsx";
import {useRef} from "react";


export function Simulation() {
    const sandboxRef = useRef<FullSimulationSandboxRef>(null);

    return <div>
        <FullSimulationSandbox ref={sandboxRef} />
    </div>
}