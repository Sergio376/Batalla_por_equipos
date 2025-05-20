// problemasNoLineales.js

export function generarEcuacionNoLineal() {
    const metodos = [
      generarBiseccion,
      generarPuntoFijo,
      generarNewtonRaphson,
      generarFalsaPosicion,
      generarSecante
    ];
    return metodos[Math.floor(Math.random() * metodos.length)]();
  }
  
  function generarBiseccion() {
    const a = 1, b = 2;
    const texto = `Método de Bisección: f(x) = x³ - x - 2 en [${a}, ${b}] después de 3 iteraciones`;
    const raiz = 1.875; // valor simulado
    return { texto, respuesta: raiz.toFixed(3) };
  }
  
  function generarPuntoFijo() {
    const x0 = 1.5;
    const texto = `Método de Punto Fijo: g(x) = cos(x) para x₀ = ${x0} después de 1 iteración`;
    const x1 = Math.cos(x0);
    return { texto, respuesta: x1.toFixed(3) };
  }
  
  function generarNewtonRaphson() {
    const x0 = 1.5;
    const texto = `Newton-Raphson: f(x) = x² - 2, f'(x) = 2x, con x₀ = ${x0}, una iteración`;
    const x1 = x0 - (x0 * x0 - 2) / (2 * x0);
    return { texto, respuesta: x1.toFixed(3) };
  }
  
  function generarFalsaPosicion() {
    const a = 1, b = 2;
    const fa = -2, fb = 2;
    const x = a - fa * (b - a) / (fb - fa);
    const texto = `Falsa Posición: f(x) lineal entre f(${a})=${fa} y f(${b})=${fb}, una iteración`;
    return { texto, respuesta: x.toFixed(3) };
  }
  
  function generarSecante() {
    const x0 = 1, x1 = 2;
    const fx0 = Math.pow(x0, 2) - 2;
    const fx1 = Math.pow(x1, 2) - 2;
    const x2 = x1 - fx1 * (x1 - x0) / (fx1 - fx0);
    const texto = `Método de la Secante: f(x)=x²-2 con x0=${x0} y x1=${x1}, una iteración`;
    return { texto, respuesta: x2.toFixed(3) };
  }
  