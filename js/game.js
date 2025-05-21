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

function actualizarFondoPorRonda() {
  const coloresRonda = ['bg-light', 'bg-warning-subtle', 'bg-info-subtle', 'bg-secondary-subtle'];
  const contenedor = document.getElementById('contenedorPrincipal');

  coloresRonda.forEach(c => contenedor.classList.remove(c));
  const ronda = Math.floor(preguntasRespondidas / 3);
  contenedor.classList.add(coloresRonda[ronda % coloresRonda.length]);
}

function iniciarTiempos() {
  for (let i = 0; i < equipos.length; i++) {
    if (cronos[i]) clearInterval(cronos[i]);
    tiempos[i] = 600;
    respondieron[i] = false;

    const temporizador = document.getElementById(`temporizador${i + 1}`);
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

  const msgId = `mensaje${equipoIndex + 1}`;
  const respuestaCorrecta = preguntaActual.respuesta;

  let esCorrecto = false;

  if (typeof respuestaCorrecta === 'object') {
    const x = parseFloat(document.getElementById(`respuestaX${equipoIndex + 1}`).value);
    const y = parseFloat(document.getElementById(`respuestaY${equipoIndex + 1}`).value);
    const z = parseFloat(document.getElementById(`respuestaZ${equipoIndex + 1}`).value);

    esCorrecto =
      Math.abs(x - respuestaCorrecta.x) <= 0.001 &&
      Math.abs(y - respuestaCorrecta.y) <= 0.001 &&
      Math.abs(z - respuestaCorrecta.z) <= 0.001;
  } else {
    const input = parseFloat(document.getElementById(`respuesta${equipoIndex + 1}`).value.trim());
    esCorrecto = Math.abs(input - parseFloat(respuestaCorrecta)) <= 0.001;
  }

  if (esCorrecto) {
    document.getElementById(msgId).textContent = '✅ Correcto';
    document.getElementById(msgId).className = 'text-success fw-bold';
    const correctosPrevios = respondieron.filter(r => r).length - 1;
    const puntosExtra = Math.max(10 - correctosPrevios * 2, 4);
    puntajes[equipoIndex].puntos += puntosExtra;
  } else {
    document.getElementById(msgId).textContent = '❌ Incorrecto';
    document.getElementById(msgId).className = 'text-danger fw-bold';
  }

  if (respondieron.every(Boolean)) {
    evaluarGanador();
  }
}
window.verificarRespuesta = verificarRespuesta;

function evaluarGanador() {
  preguntasRespondidas++;
  actualizarPuntajes();
  setTimeout(() => {
    cargarNuevaPregunta();
  }, 3000);
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
    document.getElementById('problemaGeneral').innerHTML = `🏁 <strong>Juego finalizado</strong>`;
    return;
  }

  actualizarFondoPorRonda();

  jugadoresSeleccionados = integrantesEquipos.map(lista => {
    const index = Math.floor(Math.random() * lista.length);
    return lista[index];
  });

  preguntaActual = generarPreguntaPorProgreso(preguntasRespondidas + 1);
  const tipoRonda = obtenerNombreRonda(preguntasRespondidas + 1);

  const debugRespuesta = (typeof preguntaActual.respuesta === 'object')
    ? `x=${preguntaActual.respuesta.x}, y=${preguntaActual.respuesta.y}, z=${preguntaActual.respuesta.z}`
    : preguntaActual.respuesta;

  document.getElementById('problemaGeneral').innerHTML =
    `<div class="mb-1">${preguntaActual.texto}</div><div class="text-muted small">Respuesta correcta (debug): ${debugRespuesta}</div>`;

  for (let i = 0; i < equipos.length; i++) {
    const preguntaDiv = document.getElementById(`pregunta${i + 1}`);
    const inputZona = document.getElementById(`zonaInput${i + 1}`);

    document.getElementById(`jugador${i + 1}`).textContent = `👤 Le toca responder: ${jugadoresSeleccionados[i]}`;
    document.getElementById(`mensaje${i + 1}`).textContent = '';
    document.getElementById(`temporizador${i + 1}`).textContent = '10:00';

    // Mostrar frase motivacional
    preguntaDiv.textContent = '¡Tú puedes, Ingeniero!';

    if (typeof preguntaActual.respuesta === 'object') {
      inputZona.innerHTML = `
        <div class="row mt-2">
          <div class="col"><input id="respuestaX${i + 1}" class="form-control" placeholder="x"></div>
          <div class="col"><input id="respuestaY${i + 1}" class="form-control" placeholder="y"></div>
          <div class="col"><input id="respuestaZ${i + 1}" class="form-control" placeholder="z"></div>
        </div>
      `;
    } else {
      inputZona.innerHTML = `
        <input type="text" id="respuesta${i + 1}" class="form-control mb-2" placeholder="Tu respuesta">
      `;
    }
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
          <div id="zonaInput${i + 1}"></div>
          <button class="btn btn-success w-100 mt-2" onclick="verificarRespuesta(${i})">Enviar respuesta</button>
          <div id="mensaje${i + 1}" class="mt-2 fw-bold"></div>
        </div>
      </div>
    `;
  });

  cargarNuevaPregunta();
  actualizarPuntajes();
};
