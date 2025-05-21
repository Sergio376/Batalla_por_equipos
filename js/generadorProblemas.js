import {
  generarInterpolacionLineal,
  generarNewtonAdelante,
  generarNewtonAtras,
  generarDiferenciasDivididas,
  generarLagrange
} from './problemasInterpolacion.js';

import { generarEcuacionNoLineal } from './problemasNoLineales.js';
import { generarSistemaLineal } from './problemasLineales.js';

export function obtenerNombreRonda(preguntasRespondidas) {
  const ronda = Math.floor((preguntasRespondidas - 1) / 3) + 1;

  switch (preguntasRespondidas % 3) {
    case 1: return `Ronda ${ronda} - Interpolación`;
    case 2: return `Ronda ${ronda} - Ecuación No Lineal`;
    case 0: return `Ronda ${ronda} - Ecuación Lineal`;
    default: return `Ronda ${ronda}`;
  }
}

export function generarPreguntaPorProgreso(preguntasRespondidas) {
  const tipo = (preguntasRespondidas - 1) % 3;
  const nivel = Math.floor((preguntasRespondidas - 1) / 3) + 1;

  switch (tipo) {
    case 0: // Interpolación
      return generarProblemaInterpolacion(nivel);
    case 1: // No lineal
      return generarEcuacionNoLineal(nivel);
    case 2: // Lineal
      return generarSistemaLineal(nivel);
    default:
      return { texto: 'Fin del juego', respuesta: '' };
  }
}

function generarProblemaInterpolacion(nivel = 1) {
  const metodos = [
    generarInterpolacionLineal,
    generarNewtonAdelante,
    generarNewtonAtras,
    generarDiferenciasDivididas,
    generarLagrange
  ];
  const metodo = metodos[Math.floor(Math.random() * metodos.length)];
  return metodo(nivel);
}
