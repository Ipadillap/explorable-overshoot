import { describe, it, expect } from 'vitest';
import {
    calculateTotalDemand,
    calculateRealConsumption,
    calculateBiocapacity,
    calculateExpectedDeaths, calculateExpectedBirths,
} from './ecologicalModel';


describe('calculateTotalDemand', () => {
    it('Calculo preciso de cantidad de conejos', () => {
        const result = calculateTotalDemand(5,5);
        expect(result).toBe(25);
    })
})


describe('calculateRealConsumption', () => {
    it('Caso 1: Pasto de sobra para consumo', () => {
        const result = calculateRealConsumption(25, 300);
        expect(result).toBe(25); // Debe consumir la demanda completa (25)
    });

    it('Caso 2: Pasto faltante para consumo', () => {
        const result = calculateRealConsumption(25, 10);
        expect(result).toBe(10); // Debe consumir solo lo disponible (10)
    });
});

describe('calculateBiocapacity', () => {
    it('Caso 1: Pasto disponible = Capacidad maxima', () => {
        const result = calculateBiocapacity(600,1,600);
        expect(result).toBe(0);
    })

    it('Caso 2: Potential de regeneración > Espacio disponible', () => {
        const result = calculateBiocapacity(500,1,600);
        expect(result).toBe(100);
    })

    it('Caso 3: Potential de regeneración < Espacio disponible', () => {
        const result = calculateBiocapacity(10,1,600);
        expect(result).toBe(10);
    })
})

describe('calculateExpectedDeaths', () => {
    it('Caso 1: Cantidad de muertes base', () => {
        const result = calculateExpectedDeaths(5,5,1);
        expect(result).toBe(5);
    })

    it('Caso 2: Cantidad de muertes base + Hambruna', () => {
        const result = calculateExpectedDeaths(10,5,0.5);
        expect(result).toBe(10);
    })

    it('Caso 3: No muerte', () => {
        const result = calculateExpectedDeaths(5,0,0);
        expect(result).toBe(0);
    })
})

describe('calculateExpectedBirths', () => {
    it('Caso 1: Nacen conejos', () => {
        const result = calculateExpectedBirths(14,5);
        expect(result).toBe(2);
    })

    it('Caso 2: No nacen conejos', () => {
        const result = calculateExpectedBirths(5,6);
        expect(result).toBe(0);
    })

    it('Caso 3: Lleno de 0', () => {
        const result = calculateExpectedBirths(0,0);
        expect(result).toBe(0);
    })
})
