import { generarPreguntaPorProgreso, obtenerNombreRonda } from './generadorProblemas.js';

const cantidadEquipos = parseInt(localStorage.getItem("cantidadEquipos")) || 2;
const equipos = Array.from({ length: cantidadEquipos }, (_, i) => localStorage.getItem(`equipo${i + 1}`) || `Equipo ${i + 1}`);

let integrantesEquipos = [];
let jugadoresSeleccionados = [];

let puntajes = equipos.map(e => ({ nombre: e, puntos: 0 }));
let tiempos = Array(equipos.length).fill(600);
let cronos = Array(equipos.length).fill(null);
let respondieron = Array(equipos.length).fill(false);
let preguntaActual;
let preguntasRespondidas = 0;

function iniciarTiempos() {
  for (let i = 0; i < equipos.length; i++) {
    if (cronos[i]) clearInterval(cronos[i]);
    tiempos[i] = 600;
    respondieron[i] = false;

    const tiempoId = `temporizador${i + 1}`;
    const temporizador = document.getElementById(tiempoId);

    cronos[i] = setInterval(() => {
      if (tiempos[i] <= 0) {
        clearInterval(cronos[i]);
        temporizador.textContent = '00:00';
        if (!respondieron[i]) {
          respondieron[i] = true;
          document.getElementById(`mensaje${i + 1}`).textContent = '⏱ Tiempo agotado';
          document.getElementById(`mensaje${i + 1}`).className = 'text-danger fw-bold';
        }
        if (respondieron.every(Boolean)) evaluarGanador();
        return;
      }

      tiempos[i]--;
      const minutos = Math.floor(tiempos[i] / 60);
      const segundos = tiempos[i] % 60;
      temporizador.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    }, 1000);
  }
}

function verificarRespuesta(equipoIndex) {
  if (respondieron[equipoIndex]) return;

  respondieron[equipoIndex] = true;
  clearInterval(cronos[equipoIndex]);

  const tipoRonda = obtenerNombreRonda(preguntasRespondidas + 1);
  const esSistemaLineal = tipoRonda === 'Sistemas de ecuaciones lineales';
  const msgId = `mensaje${equipoIndex + 1}`;

  if (esSistemaLineal) {
    const x = parseFloat(document.getElementById(`x${equipoIndex + 1}`).value.trim());
    const y = parseFloat(document.getElementById(`y${equipoIndex + 1}`).value.trim());
    const z = parseFloat(document.getElementById(`z${equipoIndex + 1}`).value.trim());
    const r = preguntaActual.respuesta;

    const correcto =
      Math.abs(x - r.x) <= 0.001 &&
      Math.abs(y - r.y) <= 0.001 &&
      Math.abs(z - r.z) <= 0.001;

    if (correcto) {
      document.getElementById(msgId).textContent = '✅ Correcto';
      document.getElementById(msgId).className = 'text-success fw-bold';
      const correctosPrevios = respondieron.filter(r => r).length - 1;
      const puntosExtra = Math.max(10 - correctosPrevios * 2, 4);
      puntajes[equipoIndex].puntos += puntosExtra;
    } else {
      document.getElementById(msgId).textContent = '❌ Incorrecto';
      document.getElementById(msgId).className = 'text-danger fw-bold';
    }

  } else {
    const input = document.getElementById(`valor${equipoIndex + 1}`).value.trim();
    const respuestaCorrecta = preguntaActual.respuesta;

    if (Math.abs(parseFloat(input) - parseFloat(respuestaCorrecta)) <= 0.001) {
      document.getElementById(msgId).textContent = '✅ Correcto';
      document.getElementById(msgId).className = 'text-success fw-bold';
      const correctosPrevios = respondieron.filter(r => r).length - 1;
      const puntosExtra = Math.max(10 - correctosPrevios * 2, 4);
      puntajes[equipoIndex].puntos += puntosExtra;
    } else {
      document.getElementById(msgId).textContent = '❌ Incorrecto';
      document.getElementById(msgId).className = 'text-danger fw-bold';
    }
  }

  if (respondieron.every(Boolean)) {
    evaluarGanador();
  }
}
window.verificarRespuesta = verificarRespuesta;

function evaluarGanador() {
  if (respondieron.every(Boolean)) {
    preguntasRespondidas++;
    console.log("✅ Preguntas respondidas:", preguntasRespondidas);
    actualizarPuntajes();
    setTimeout(() => {
      cargarNuevaPregunta();
    }, 3000);
  }
}

function actualizarPuntajes() {
  const tabla = document.getElementById('tablaPuntajes');
  tabla.innerHTML = '';
  puntajes.forEach(p => {
    tabla.innerHTML += `<tr><td>${p.nombre}</td><td>${p.puntos}</td></tr>`;
  });
}

function cargarNuevaPregunta() {
  if (preguntasRespondidas >= 9) {
    document.getElementById('problema').innerHTML = `🏁 <strong>Juego finalizado</strong>`;
    return;
  }

  jugadoresSeleccionados = integrantesEquipos.map(lista => {
    const index = Math.floor(Math.random() * lista.length);
    return lista[index];
  });

  preguntaActual = generarPreguntaPorProgreso(preguntasRespondidas + 1);
  const tipoRonda = obtenerNombreRonda(preguntasRespondidas + 1);
  const esSistemaLineal = tipoRonda === 'Sistemas de ecuaciones lineales';

  document.getElementById('problema').innerHTML = `🧪 Nueva ronda: <strong>${tipoRonda}</strong><br><span class="text-muted small">Respuesta correcta (debug): ${
    esSistemaLineal
      ? `x=${preguntaActual.respuesta.x}, y=${preguntaActual.respuesta.y}, z=${preguntaActual.respuesta.z}`
      : preguntaActual.respuesta
  }</span>`;

  for (let i = 0; i < equipos.length; i++) {
    document.getElementById(`pregunta${i + 1}`).innerHTML = preguntaActual.texto;
    document.getElementById(`jugador${i + 1}`).textContent = `👤 Le toca responder: ${jugadoresSeleccionados[i]}`;
    document.getElementById(`mensaje${i + 1}`).textContent = '';
    document.getElementById(`temporizador${i + 1}`).textContent = '10:00';

    const respuestaContainer = document.getElementById(`respuesta${i + 1}`);
    respuestaContainer.innerHTML = esSistemaLineal
      ? `
        <input type="text" class="form-control mb-1" placeholder="x" id="x${i + 1}">
        <input type="text" class="form-control mb-1" placeholder="y" id="y${i + 1}">
        <input type="text" class="form-control mb-1" placeholder="z" id="z${i + 1}">
        `
      : `<input type="text" class="form-control" id="valor${i + 1}" placeholder="Tu respuesta">`;
  }

  iniciarTiempos();
}

window.onload = () => {
  const contenedor = document.getElementById("contenedorEquipos");
  contenedor.innerHTML = "";

  const coloresFondo = ['bg-danger-subtle', 'bg-primary-subtle', 'bg-success-subtle', 'bg-warning-subtle'];

  integrantesEquipos = equipos.map((_, i) => {
    const datos = localStorage.getItem(`integrantesEquipo${i + 1}`);
    return datos ? JSON.parse(datos) : [`Integrante 1`];
  });

  const anchoColumna = Math.floor(12 / equipos.length);

  equipos.forEach((nombre, i) => {
    contenedor.innerHTML += `
      <div class="col-${anchoColumna} mb-4">
        <div class="card p-3 ${coloresFondo[i % coloresFondo.length]}">
          <h4 id="equipo${i + 1}Nombre" class="fw-bold">${nombre}</h4>
          <div id="jugador${i + 1}" class="fst-italic small text-muted mb-2">👤 Le toca responder: </div>
          <div class="fs-6 text-danger mb-2">⏱ Tiempo: <span id="temporizador${i + 1}">10:00</span></div>
          <div id="pregunta${i + 1}" class="mb-2">Pregunta aquí</div>
          <div id="respuesta${i + 1}" class="mb-2"></div>
          <button class="btn btn-success w-100" onclick="verificarRespuesta(${i})">Enviar respuesta</button>
          <div id="mensaje${i + 1}" class="mt-2 fw-bold"></div>
        </div>
      </div>
    `;
  });

  cargarNuevaPregunta();
  actualizarPuntajes();
};
