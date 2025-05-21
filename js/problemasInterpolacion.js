export function generarInterpolacionLineal(nivel = 1) {
  const puntos = generarPuntos(nivel);
  const xEval = puntos[1].x;

  const texto = `Resuelve por interpolación lineal:<br>x = ${xEval}<br>` +
    puntos.map(p => `(${p.x}, ${p.y})`).join(' ') +
    `<br>Usa los dos puntos más cercanos.`;

  const [p1, p2] = [puntos[0], puntos[1]];
  const resultado = p1.y + ((xEval - p1.x) * (p2.y - p1.y)) / (p2.x - p1.x);

  return {
    texto,
    respuesta: resultado.toFixed(3)
  };
}

export function generarNewtonAdelante(nivel = 1) {
  const puntos = generarPuntos(nivel);
  const xEval = puntos[0].x;

  const texto = `Método de Newton hacia adelante:<br>x = ${xEval}<br>` +
    puntos.map(p => `(${p.x}, ${p.y})`).join(' ');

  return {
    texto,
    respuesta: puntos[0].y.toFixed(3) // simulada
  };
}

export function generarNewtonAtras(nivel = 1) {
  const puntos = generarPuntos(nivel);
  const xEval = puntos[puntos.length - 1].x;

  const texto = `Método de Newton hacia atrás:<br>x = ${xEval}<br>` +
    puntos.map(p => `(${p.x}, ${p.y})`).join(' ');

  return {
    texto,
    respuesta: puntos[puntos.length - 1].y.toFixed(3) // simulada
  };
}

export function generarDiferenciasDivididas(nivel = 1) {
  const puntos = generarPuntos(nivel);
  const xEval = puntos[Math.floor(puntos.length / 2)].x;

  const texto = `Método de diferencias divididas:<br>x = ${xEval}<br>` +
    puntos.map(p => `(${p.x}, ${p.y})`).join(' ');

  return {
    texto,
    respuesta: puntos[Math.floor(puntos.length / 2)].y.toFixed(3) // simulada
  };
}

export function generarLagrange(nivel = 1) {
  const puntos = generarPuntos(nivel);
  const xEval = puntos[0].x;

  const texto = `Método de Lagrange:<br>x = ${xEval}<br>` +
    puntos.map(p => `(${p.x}, ${p.y})`).join(' ');

  return {
    texto,
    respuesta: puntos[0].y.toFixed(3) // simulada
  };
}

// Auxiliar: genera puntos según nivel de dificultad
function generarPuntos(nivel = 1) {
  const cantidad = nivel === 1 ? 3 : 4;
  const puntos = [];
  let x = 1;

  for (let i = 0; i < cantidad; i++) {
    let y;
    if (nivel < 3) {
      y = Math.pow(x, 2) + 1; // enteros
    } else {
      y = parseFloat((Math.pow(x + Math.random(), 2) + 1).toFixed(2)); // decimales
    }
    puntos.push({ x: parseFloat(x.toFixed(2)), y });
    x += 1;
  }

  return puntos;
}
