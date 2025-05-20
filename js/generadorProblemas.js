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
  if (preguntasRespondidas <= 3) return 'Interpolación';
  if (preguntasRespondidas > 3 && preguntasRespondidas <= 6) return 'Ecuaciones no lineales';
  if (preguntasRespondidas > 6 && preguntasRespondidas <= 9) return 'Sistemas de ecuaciones lineales';
  return 'Fin del juego';
}

export function generarPreguntaPorProgreso(preguntasRespondidas) {
  const historialPreguntas = [];
  let nueva;

  do {
    if (preguntasRespondidas <= 3) {
      const metodos = [
        generarInterpolacionLineal,
        generarNewtonAdelante,
        generarNewtonAtras,
        generarDiferenciasDivididas,
        generarLagrange
      ];
      nueva = metodos[Math.floor(Math.random() * metodos.length)]();
    } else if (preguntasRespondidas > 3 && preguntasRespondidas <= 6) {
      nueva = generarEcuacionNoLineal();
    } else if (preguntasRespondidas > 6 && preguntasRespondidas <= 9) {
      nueva = generarSistemaLineal();
    } else {
      nueva = { texto: 'Juego finalizado', respuesta: '' };
    }
  } while (historialPreguntas.includes(nueva?.texto));

  historialPreguntas.push(nueva.texto);
  return nueva;
}
