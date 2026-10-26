/**
 * Convierte un número hex (0xRRGGBB) a un objeto {r, g, b} (0-255).
 */
export function hexToRgb(hex: number) {
    return {
        r: (hex >> 16) & 0xff,
        g: (hex >> 8) & 0xff,
        b: hex & 0xff,
    };
}

/**
 * Convierte valores r, g, b (0-255) a un entero hexadecimal.
 */
export function rgbToHex(r: number, g: number, b: number): number {
    return (Math.round(r) << 16) | (Math.round(g) << 8) | Math.round(b);
}

/**
 * Interpola linealmente entre dos colores RGB según el factor t (0.0 a 1.0).
 */
export function interpolateColor(colorA: number, colorB: number, t: number): number {
    const rgbA = hexToRgb(colorA);
    const rgbB = hexToRgb(colorB);

    const r = rgbA.r + (rgbB.r - rgbA.r) * t;
    const g = rgbA.g + (rgbB.g - rgbA.g) * t;
    const b = rgbA.b + (rgbB.b - rgbA.b) * t;

    return rgbToHex(r, g, b);
}

/**
 * Función de suavizado Ease-Out-Cubic: rápida al inicio y suave al final.
 */
export function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
}