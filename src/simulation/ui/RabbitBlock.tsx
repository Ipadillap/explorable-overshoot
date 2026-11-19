import {Rabbit} from 'lucide-react';


interface ColorThemeProps {
    color?: string;
}

export function RabbitBlock({ color = "#bc2121" }: ColorThemeProps) {
    return (
        <div className="h-full aspect-square flex items-center justify-center rounded-lg"
             style={{ backgroundColor: color }}
        >
            <Rabbit className="w-5/7 h-5/7 stroke-[#456e53] "/>
        </div>

    );
}
