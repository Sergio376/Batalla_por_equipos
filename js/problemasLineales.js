export function generarSistemaLineal() {
  // Generar solución conocida
  const xSol = parseFloat((Math.random() * 10 - 5).toFixed(1));
  const ySol = parseFloat((Math.random() * 10 - 5).toFixed(1));
  const zSol = parseFloat((Math.random() * 10 - 5).toFixed(1));

  // Generar matriz A con coeficientes aleatorios entre -5 y 5 (evitar ceros en la diagonal)
  const A = Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => Math.floor(Math.random() * 11) - 5)
  );

  // Asegurarse de que la matriz A sea invertible (det ≠ 0)
  if (det3x3(A) === 0) return generarSistemaLineal(); // Reintentar si no se puede resolver

  // Calcular vector B = A · [xSol, ySol, zSol]
  const B = A.map(row => (
    row[0] * xSol + row[1] * ySol + row[2] * zSol
  ));

  // Convertir a texto
  const letras = ['x', 'y', 'z'];
  const ecuaciones = A.map((fila, i) => {
    const izq = fila.map((coef, j) => {
      const sign = coef >= 0 && j > 0 ? '+' : '';
      return `${sign}${coef}${letras[j]}`;
    }).join(' ');
    return `${i + 1}) ${izq} = ${B[i].toFixed(2)}`;
  }).join('<br>');

  return {
    texto: `Sistema de ecuaciones:<br>${ecuaciones}<br>¿Cuánto valen x, y y z?`,
    respuesta: {
      x: xSol,
      y: ySol,
      z: zSol
    }
  };
}

// Determinante de una matriz 3x3
function det3x3(m) {
  return (
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
  );
}
