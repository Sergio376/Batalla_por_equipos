export function generarEcuacionNoLineal(nivel = 1) {
  const metodos = [
    generarBiseccion,
    generarPuntoFijo,
    generarNewtonRaphson,
    generarFalsaPosicion,
    generarSecante
  ];
  const metodo = metodos[Math.floor(Math.random() * metodos.length)];
  return metodo(nivel);
}

const ERROR = 0.001;

// Método de Bisección
function generarBiseccion(nivel = 1) {
  let f, a, b, textoFuncion;

  switch (nivel) {
    case 1:
      f = x => Math.pow(x, 3) - x - 2;
      a = 1;
      b = 2;
      textoFuncion = 'f(x) = x³ - x - 2';
      break;
    case 2:
      f = x => Math.sin(x) - 0.5 * x;
      a = 1;
      b = 2;
      textoFuncion = 'f(x) = sin(x) - 0.5x';
      break;
    case 3:
      f = x => Math.exp(x) - 4;
      a = 0;
      b = 2;
      textoFuncion = 'f(x) = eˣ - 4';
      break;
  }

  let xPrev, x;
  do {
    x = (a + b) / 2;
    const fx = f(x);
    if (f(a) * fx < 0) b = x;
    else a = x;

    if (xPrev !== undefined && Math.abs(x - xPrev) <= ERROR) break;
    xPrev = x;
  } while (true);

  return {
    texto: `Método de Bisección:<br>${textoFuncion}<br>Intervalo inicial [${a.toFixed(2)}, ${b.toFixed(2)}]<br>Margen de error ε = 0.001`,
    respuesta: x.toFixed(3)
  };
}

// Método de Punto Fijo
function generarPuntoFijo(nivel = 1) {
  let g, textoFuncion;
  let x0 = 1.5;

  switch (nivel) {
    case 1:
      g = x => Math.cos(x);
      textoFuncion = 'g(x) = cos(x)';
      break;
    case 2:
      g = x => (x + Math.cos(x)) / 2;
      textoFuncion = 'g(x) = (x + cos(x)) / 2';
      break;
    case 3:
      g = x => Math.exp(-x);
      textoFuncion = 'g(x) = e^(-x)';
      break;
  }

  let x1;
  do {
    x1 = g(x0);
    if (Math.abs(x1 - x0) <= ERROR) break;
    x0 = x1;
  } while (true);

  return {
    texto: `Método de Punto Fijo:<br>${textoFuncion}<br>x₀ = 1.5<br>Margen de error ε = 0.001`,
    respuesta: x1.toFixed(3)
  };
}

// Método de Newton-Raphson
function generarNewtonRaphson(nivel = 1) {
  let f, df, textoFuncion;
  let x0 = 1.5;

  switch (nivel) {
    case 1:
      f = x => x * x - 2;
      df = x => 2 * x;
      textoFuncion = `f(x) = x² - 2, f'(x) = 2x`;
      break;
    case 2:
      f = x => Math.pow(x, 3) + x - 1;
      df = x => 3 * x * x + 1;
      textoFuncion = `f(x) = x³ + x - 1, f'(x) = 3x² + 1`;
      break;
    case 3:
      f = x => Math.exp(x) - x * x;
      df = x => Math.exp(x) - 2 * x;
      textoFuncion = `f(x) = eˣ - x², f'(x) = eˣ - 2x`;
      break;
  }

  let x1;
  do {
    x1 = x0 - f(x0) / df(x0);
    if (Math.abs(x1 - x0) <= ERROR) break;
    x0 = x1;
  } while (true);

  return {
    texto: `Método de Newton-Raphson:<br>${textoFuncion}<br>x₀ = 1.5<br>Margen de error ε = 0.001`,
    respuesta: x1.toFixed(3)
  };
}

// Método de Falsa Posición
function generarFalsaPosicion(nivel = 1) {
  let f, a, b, textoFuncion;

  switch (nivel) {
    case 1:
      f = x => x * x - 4;
      a = 1;
      b = 3;
      textoFuncion = 'f(x) = x² - 4';
      break;
    case 2:
      f = x => Math.pow(x, 3) - x - 1;
      a = 1;
      b = 2;
      textoFuncion = 'f(x) = x³ - x - 1';
      break;
    case 3:
      f = x => Math.exp(-x) - x;
      a = 0;
      b = 1;
      textoFuncion = 'f(x) = e^(-x) - x';
      break;
  }

  let xPrev, x;
  do {
    const fa = f(a);
    const fb = f(b);
    x = a - fa * (b - a) / (fb - fa);
    const fx = f(x);

    if (fa * fx < 0) b = x;
    else a = x;

    if (xPrev !== undefined && Math.abs(x - xPrev) <= ERROR) break;
    xPrev = x;
  } while (true);

  return {
    texto: `Falsa Posición:<br>${textoFuncion}<br>Intervalo inicial [${a.toFixed(2)}, ${b.toFixed(2)}]<br>Margen de error ε = 0.001`,
    respuesta: x.toFixed(3)
  };
}

// Método de Secante
function generarSecante(nivel = 1) {
  let f, textoFuncion;
  let x0 = 1, x1 = 2;

  switch (nivel) {
    case 1:
      f = x => x * x - 2;
      textoFuncion = 'f(x) = x² - 2';
      break;
    case 2:
      f = x => Math.pow(x, 3) - x - 1;
      textoFuncion = 'f(x) = x³ - x - 1';
      break;
    case 3:
      f = x => Math.exp(-x) - x;
      textoFuncion = 'f(x) = e^(-x) - x';
      break;
  }

  let x2;
  do {
    const fx0 = f(x0);
    const fx1 = f(x1);
    x2 = x1 - fx1 * (x1 - x0) / (fx1 - fx0);
    if (Math.abs(x2 - x1) <= ERROR) break;
    x0 = x1;
    x1 = x2;
  } while (true);

  return {
    texto: `Método de la Secante:<br>${textoFuncion}<br>x₀ = 1, x₁ = 2<br>Margen de error ε = 0.001`,
    respuesta: x2.toFixed(3)
  };
}
