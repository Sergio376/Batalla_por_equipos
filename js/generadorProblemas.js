import {
  generarInterpolacionLineal,
  generarNewtonAdelante,
  generarNewtonAtras,
  generarDiferenciasDivididas,
  generarLagrange
} from './problemasInterpolacion.js';

import { generarEcuacionNoLineal } from './problemasNoLineales.js';
import { generarSistemaLineal } from './problemasLineales.js';

const historialPreguntas = [];

export function obtenerNombreRonda(preguntasRespondidas) {
  const ronda = Math.floor(preguntasRespondidas / 3) + 1;
  return `Ronda ${ronda}`;
}

export function generarPreguntaPorProgreso(preguntasRespondidas) {
  const ronda = Math.floor(preguntasRespondidas / 3) + 1; // Nivel de dificultad (1 a 3)
  const tipoIndex = preguntasRespondidas % 3;

  let nueva;

  do {
    switch (tipoIndex) {
      case 0: { // Interpolación
        const metodos = [
          generarInterpolacionLineal,
          generarNewtonAdelante,
          generarNewtonAtras,
          generarDiferenciasDivididas,
          generarLagrange
        ];
        const metodo = metodos[Math.floor(Math.random() * metodos.length)];
        nueva = metodo(ronda); // Se le pasa el nivel de dificultad
        break;
      }

      case 1: // Ecuaciones no lineales
        nueva = generarEcuacionNoLineal(ronda);
        break;

      case 2: // Ecuaciones lineales
        nueva = generarSistemaLineal(ronda);
        break;

      default:
        nueva = { texto: 'Juego finalizado', respuesta: '' };
    }
  } while (historialPreguntas.includes(nueva?.texto));

  historialPreguntas.push(nueva.texto);
  return nueva;
}
