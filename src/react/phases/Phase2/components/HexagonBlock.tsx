import { Hexagon } from 'lucide-react';

interface ColorThemeProps {
    color?: string;
}

export function HexagonBlock({ color = "#bc2121" }: ColorThemeProps) {
    return (
        <div className="h-full aspect-square flex items-center justify-center rounded-lg"
             style={{ backgroundColor: color }}
        >
            <Hexagon className="w-5/7 h-5/7 stroke-[#456e53] stroke-1"/>
        </div>

    );
}
