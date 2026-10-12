import {ResourceSlider} from "../components/ResourceSlider.tsx"
import { useState } from 'react';
import {SimulationButton} from "../components/SimulationButton.tsx";

export function Phase2view() {
    const [consumption, setConsumption] = useState(5);
    const [rabits, setRabits] = useState(5);
    const [regeneration, setRegeneration] = useState(5);
    const [death, setDeath] = useState(5);
    const [conversion, setConversion] = useState(5);

    return (
        <main className="w-screen h-screen bg-[#f3f6f3] grid grid-cols-[240px_804px_300px] items-center justify-center gap-5">

            {/* Estadísticas y resumen */}
            <aside className="h-176 rounded-lg grid grid-rows-[432px_178px_34px] gap-4">
                {/* Estado del ecosistema*/}
                <div className=" bg-[#ffffff] border border-[#DFE8E2] content-center rounded-lg grid grid-rows-[94px_94px_94px] gap-5">
                    <div className="bg-blue-700 border border-[#DFE8E2] rounded-lg">

                    </div>
                    <div className="bg-blue-700 border border-[#DFE8E2] rounded-lg">

                    </div>
                    <div className="bg-blue-700 border border-[#DFE8E2] rounded-lg">

                    </div>
                </div>

                {/* Ecological Overshoot*/}
                <div className="bg-[#ffffff] border border-[#DFE8E2] rounded-lg">

                </div>

                {/* Zona Libre*/}
                <div className="bg-[#ffffff] border border-[#DFE8E2] rounded-lg">

                </div>
            </aside>

            {/* Lienzo de simulación*/}
            <section className="h-176 bg-[#ffffff] border border-[#DFE8E2] content-end rounded-lg grid grid-rows-[102px] gap-5">
                {/* Zona resumen de simulación*/}
                <div className="bg-blue-700 border border-[#DFE8E2] rounded-lg">

                </div>

            </section>

            {/* Parámetros modificables */}
            <aside className="h-176 bg-[#ffffff] border border-[#DFE8E2] content-center justify-center rounded-lg grid grid-rows-[86px_86px_86px_86px_86px_168px] gap-5">
                {/* Slider*/}
                <div className="w-65">
                    <ResourceSlider
                        label="Cantiad inicial de conejos"
                        value={rabits}
                        min={1}
                        max={10}
                        onChange={setRabits}
                    />
                </div>

                {/* Slider*/}
                <div className="w-65">
                    <ResourceSlider
                        label="Consumo per capita"
                        value={consumption}
                        min={1}
                        max={10}
                        onChange={setConsumption}
                    />
                </div>

                {/* Slider*/}
                <div className="w-65">
                    <ResourceSlider
                        label="Hierba para nuevo conejo"
                        value={conversion}
                        min={1}
                        max={10}
                        onChange={setConversion}
                    />
                </div>

                {/* Slider*/}
                <div className="w-65">
                    <ResourceSlider
                        label="Tasa de muerte natural"
                        value={death}
                        min={1}
                        max={10}
                        onChange={setDeath}
                    />
                </div>

                {/* Slider*/}
                <div className="w-65">
                    <ResourceSlider
                        label="Regenracion por unidad de hierba"
                        value={regeneration}
                        min={1}
                        max={10}
                        onChange={setRegeneration}
                    />
                </div>

                {/* Botones de simulación*/}
                <div className="w-65 grid grid-cols-2 grid-rows-[38px_38px] border border-[#DFE8E2] rounded-lg content-center justify-items-center gap-5">
                    <div className="w-24">
                        <SimulationButton
                            icon={1}
                            label={"Play"}
                        />
                    </div>

                    <div className="w-24">
                        <SimulationButton
                            icon={2}
                            label={"Stop"}
                        />
                    </div>

                    <div className="w-24">
                        <SimulationButton
                            icon={3}
                            label={"Next"}
                        />
                    </div>

                    <div className="w-24">
                        <SimulationButton
                            icon={4}
                            label={"Reboot"}
                        />
                    </div>


                    {/*<SimulationButton*/}
                    {/*    icon={1}*/}
                    {/*    label="Regenracion por unidad de hierba"*/}
                    {/*/>*/}
                </div>
            </aside>

        </main>
    );
}
