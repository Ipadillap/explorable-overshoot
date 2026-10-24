// src/simulation/pixi/Rabbit.ts
import * as PIXI from 'pixi.js';

export interface RabbitOptions {
    size?: number;
    jumpSpeed?: number;
    jumpHeight?: number;
}

export class Rabbit extends PIXI.Container {
    private bodyGraphics: PIXI.Graphics;
    private jumpSpeed: number;
    private jumpHeight: number;
    private elapsedTime: number = 0;

    constructor(options: RabbitOptions = {}) {
        super();
        this.jumpSpeed = options.jumpSpeed ?? 0.08;
        this.jumpHeight = options.jumpHeight ?? 12;

        this.bodyGraphics = new PIXI.Graphics();
        this.addChild(this.bodyGraphics);

        this.drawRabbit();
    }

    /**
     * Dibuja la silueta vectorial básica del conejo
     */
    private drawRabbit(): void {
        this.bodyGraphics.clear();

        // Color del conejo (Blanco/Beige) y bordes
        const bodyColor = 0xF5F5F0;
        const strokeColor = 0x8D8D8D;

        // Oreja izquierda
        this.bodyGraphics.ellipse(-4, -14, 3, 8);
        this.bodyGraphics.fill({ color: bodyColor });
        this.bodyGraphics.stroke({ width: 0.8, color: strokeColor });

        // Oreja derecha
        this.bodyGraphics.ellipse(3, -14, 3, 8);
        this.bodyGraphics.fill({ color: bodyColor });
        this.bodyGraphics.stroke({ width: 0.8, color: strokeColor });

        // Cuerpo/Cabeza
        this.bodyGraphics.ellipse(0, -4, 9, 8);
        this.bodyGraphics.fill({ color: bodyColor });
        this.bodyGraphics.stroke({ width: 0.8, color: strokeColor });

        // Patitas
        this.bodyGraphics.ellipse(-5, 3, 4, 2);
        this.bodyGraphics.ellipse(5, 3, 4, 2);
        this.bodyGraphics.fill({ color: bodyColor });
        this.bodyGraphics.stroke({ width: 0.8, color: strokeColor });
    }

    /**
     * Actualiza el bucle de salto en cada frame (Llamar desde el ticker)
     */
    public update(delta: number): void {
        this.elapsedTime += this.jumpSpeed * delta;

        // Calculamos la elevación vertical usando la parte positiva de la onda seno
        const jumpProgress = Math.abs(Math.sin(this.elapsedTime));

        // Mueve la posición local Y hacia arriba según la altura definida
        this.bodyGraphics.y = -jumpProgress * this.jumpHeight;

        // Efecto Squash & Stretch (deformación sutil al impactar/saltar)
        const squash = 1 + (1 - jumpProgress) * 0.15;
        const stretch = 1 + jumpProgress * 0.1;

        this.bodyGraphics.scale.x = 1 / stretch;
        this.bodyGraphics.scale.y = stretch * (jumpProgress > 0.1 ? 1 : squash);
    }
}