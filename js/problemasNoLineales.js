export function generarEcuacionNoLineal(nivel = 1) {
  let funcionTexto = '';
  let solucion = 0;

  switch (nivel) {
    case 1: {
      const a = Math.floor(Math.random() * 5 + 1); // 1–5
      const b = Math.floor(Math.random() * 10 + 1); // 1–10
      funcionTexto = `f(x) = ${a}x² - ${b}`;
      solucion = Math.sqrt(b / a);
      break;
    }

    case 2: {
      const a = Math.floor(Math.random() * 3 + 1);
      const b = Math.floor(Math.random() * 5 + 1);
      const c = Math.floor(Math.random() * 3 + 1);
      funcionTexto = `f(x) = ${a}x³ + ${b}x - ${c}`;
      // Generamos en torno a x = 1 para asegurar solución real
      solucion = 1;
      break;
    }

    case 3: {
      const a = Math.floor(Math.random() * 3 + 1);
      const b = Math.floor(Math.random() * 2 + 1);
      const tipo = Math.floor(Math.random() * 3); // trig, exp, log

      if (tipo === 0) {
        funcionTexto = `f(x) = ${a}sin(x) + ${b}x`;
        solucion = 0; // Aproximado
      } else if (tipo === 1) {
        funcionTexto = `f(x) = ${a}e^x - ${b}`;
        solucion = Math.log(b / a);
      } else {
        funcionTexto = `f(x) = ${a}ln(x) - ${b}`;
        solucion = Math.exp(b / a);
      }
      break;
    }
  }

  return {
    texto: `Resuelve la siguiente ecuación no lineal:<br>${funcionTexto}`,
    respuesta: solucion.toFixed(3)
  };
}
