import { useState } from "react";
import { CHAPTERS, SANDBOX_VIEW } from "./chapterRegistry.ts";
import { ScaledStage } from "../shared/layout/ScaledStage.tsx";

const SANDBOX = 0;

export function App() {
    const [current, setCurrent] = useState(1);
    const total = CHAPTERS.length;

    const ActiveView = current === SANDBOX ? SANDBOX_VIEW : CHAPTERS[current - 1];

    const handleNext = () => setCurrent((p) => (p < total ? p + 1 : p));
    const handlePrev = () => setCurrent((p) => (p > 1 ? p - 1 : p));

    return (
        <main className="relative w-screen h-screen overflow-hidden bg-[#F4F7F6] flex flex-col items-center justify-between p-4 select-none">
            <ScaledStage width={1440} height={704} className="w-full flex-1" innerClassName="relative overflow-hidden bg-[#FFFFFF]">
                <ActiveView onNext={handleNext} onPrev={handlePrev} />
            </ScaledStage>

            <nav className="flex items-center gap-2 py-1 z-50">
                {CHAPTERS.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => setCurrent(i + 1)}
                        title={`Capítulo ${i + 1}`}
                        className={`w-2.5 h-2.5 rounded-full ${current === i + 1 ? "bg-slate-800" : "bg-slate-300"}`}
                    />
                ))}

                <span className="text-slate-300 text-xs mx-1">|</span>

                <button
                    type="button"
                    onClick={() => setCurrent(SANDBOX)}
                    title="Sandbox"
                    className={`w-2.5 h-2.5 rounded-full ${current === SANDBOX ? "bg-amber-600" : "bg-amber-300"}`}
                />
            </nav>
        </main>
    );
}
