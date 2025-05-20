export function generarSistemaLineal(nivel = 1) {
  const n = Math.min(3 + (nivel - 1), 5); // 3, 4 o 5 ecuaciones/incógnitas

  // Generamos solución conocida
  const soluciones = Array.from({ length: n }, () =>
    parseFloat((Math.random() * 10 - 5).toFixed(1))
  );

  // Matriz A con coeficientes aleatorios
  let A;
  do {
    A = Array.from({ length: n }, () =>
      Array.from({ length: n }, () => Math.floor(Math.random() * 11) - 5)
    );
  } while (determinanteCero(A)); // aseguramos que no sea indeterminado

  // Vector B = A · soluciones
  const B = A.map(row =>
    row.reduce((suma, coef, j) => suma + coef * soluciones[j], 0)
  );

  // Texto del sistema
  const letras = ['x', 'y', 'z', 'w', 'v'];
  const ecuaciones = A.map((fila, i) => {
    const izq = fila.map((coef, j) => {
      const sign = coef >= 0 && j > 0 ? '+' : '';
      return `${sign}${coef}${letras[j]}`;
    }).join(' ');
    return `${i + 1}) ${izq} = ${B[i].toFixed(2)}`;
  }).join('<br>');

  const texto = `Sistema de ecuaciones:<br>${ecuaciones}<br>¿Cuánto valen ${letras.slice(0, n).join(', ')}?`;

  // Solo usamos x, y, z para validar
  return {
    texto,
    respuesta: {
      x: soluciones[0],
      y: soluciones[1],
      z: soluciones[2]
    }
  };
}

// Función para evitar sistemas sin solución única
function determinanteCero(matriz) {
  const n = matriz.length;
  if (n !== 3) return false; // usamos la verificación solo para 3x3 por eficiencia

  return (
    matriz[0][0] * (matriz[1][1] * matriz[2][2] - matriz[1][2] * matriz[2][1]) -
    matriz[0][1] * (matriz[1][0] * matriz[2][2] - matriz[1][2] * matriz[2][0]) +
    matriz[0][2] * (matriz[1][0] * matriz[2][1] - matriz[1][1] * matriz[2][0])
  ) === 0;
}
