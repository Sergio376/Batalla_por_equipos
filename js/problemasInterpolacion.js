function generarPuntos(nivel) {
  const cantidad = 3 + nivel; // Nivel 1: 4 puntos, Nivel 2: 5, Nivel 3: 6
  const puntos = [];
  let x = 1;

  for (let i = 0; i < cantidad; i++) {
    const fx = parseFloat((Math.pow(x, 2) + 1).toFixed(2)); // f(x) = x² + 1
    puntos.push({ x, y: fx });
    x += 1;
  }

  return puntos;
}

export function generarInterpolacionLineal(nivel = 1) {
  const puntos = generarPuntos(nivel);
  const xBuscar = puntos[1].x + 0.5;
  const yInterpolado = puntos[1].y + (puntos[2].y - puntos[1].y) / (puntos[2].x - puntos[1].x) * (xBuscar - puntos[1].x);

  const texto = `Resuelve por método de interpolación lineal en x=${xBuscar.toFixed(2)}<br>` +
    puntos.map(p => `(${p.x}, ${p.y})`).join(', ');

  return {
    texto,
    respuesta: yInterpolado.toFixed(3)
  };
}

export function generarNewtonAdelante(nivel = 1) {
  const puntos = generarPuntos(nivel);
  const xBuscar = puntos[1].x + 0.5;

  // Para simplificar, asumimos tabla equiespaciada con Δx = 1
  const h = 1;
  const y = puntos.map(p => p.y);
  const n = y.length;

  // Crear diferencias progresivas
  const diferencias = [y.slice()];
  for (let i = 1; i < n; i++) {
    const anterior = diferencias[i - 1];
    const actual = [];
    for (let j = 0; j < anterior.length - 1; j++) {
      actual.push(parseFloat((anterior[j + 1] - anterior[j]).toFixed(5)));
    }
    diferencias.push(actual);
  }

  // Evaluar Newton adelante
  let resultado = y[0];
  let t = (xBuscar - puntos[0].x) / h;
  let prod = 1;
  for (let i = 1; i < n; i++) {
    prod *= (t - (i - 1));
    resultado += (prod * diferencias[i][0]) / factorial(i);
  }

  const texto = `Resuelve por método de Newton hacia adelante para x=${xBuscar.toFixed(2)}<br>` +
    puntos.map(p => `(${p.x}, ${p.y})`).join(', ');

  return {
    texto,
    respuesta: resultado.toFixed(3)
  };
}

export function generarNewtonAtras(nivel = 1) {
  const puntos = generarPuntos(nivel);
  const xBuscar = puntos[puntos.length - 2].x + 0.5;

  const h = 1;
  const y = puntos.map(p => p.y);
  const n = y.length;

  const diferencias = [y.slice()];
  for (let i = 1; i < n; i++) {
    const anterior = diferencias[i - 1];
    const actual = [];
    for (let j = 0; j < anterior.length - 1; j++) {
      actual.push(parseFloat((anterior[j + 1] - anterior[j]).toFixed(5)));
    }
    diferencias.push(actual);
  }

  let resultado = y[n - 1];
  let t = (xBuscar - puntos[n - 1].x) / h;
  let prod = 1;
  for (let i = 1; i < n; i++) {
    prod *= (t + (i - 1));
    resultado += (prod * diferencias[i][n - 1 - i]) / factorial(i);
  }

  const texto = `Resuelve por método de Newton hacia atrás para x=${xBuscar.toFixed(2)}<br>` +
    puntos.map(p => `(${p.x}, ${p.y})`).join(', ');

  return {
    texto,
    respuesta: resultado.toFixed(3)
  };
}

export function generarDiferenciasDivididas(nivel = 1) {
  const puntos = generarPuntos(nivel);
  const xBuscar = puntos[1].x + 0.5;

  const n = puntos.length;
  const dd = puntos.map(p => [p.y]);

  for (let j = 1; j < n; j++) {
    for (let i = 0; i < n - j; i++) {
      const num = dd[i + 1][j - 1] - dd[i][j - 1];
      const den = puntos[i + j].x - puntos[i].x;
      dd[i][j] = parseFloat((num / den).toFixed(5));
    }
  }

  let resultado = dd[0][0];
  let prod = 1;
  for (let j = 1; j < n; j++) {
    prod *= (xBuscar - puntos[j - 1].x);
    resultado += dd[0][j] * prod;
  }

  const texto = `Resuelve por método de diferencias divididas para x=${xBuscar.toFixed(2)}<br>` +
    puntos.map(p => `(${p.x}, ${p.y})`).join(', ');

  return {
    texto,
    respuesta: resultado.toFixed(3)
  };
}

export function generarLagrange(nivel = 1) {
  const puntos = generarPuntos(nivel);
  const xBuscar = puntos[1].x + 0.5;

  const n = puntos.length;
  let resultado = 0;

  for (let i = 0; i < n; i++) {
    let li = 1;
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        li *= (xBuscar - puntos[j].x) / (puntos[i].x - puntos[j].x);
      }
    }
    resultado += li * puntos[i].y;
  }

  const texto = `Resuelve por método de Lagrange para x=${xBuscar.toFixed(2)}<br>` +
    puntos.map(p => `(${p.x}, ${p.y})`).join(', ');

  return {
    texto,
    respuesta: resultado.toFixed(3)
  };
}

function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}
