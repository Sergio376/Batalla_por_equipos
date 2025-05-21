export function generarSistemaLineal(nivel = 1) {
  const n = 3;

  // Generamos soluciones según nivel
  const soluciones = Array.from({ length: n }, () => {
    if (nivel === 1) return Math.floor(Math.random() * 10 + 1); // enteros
    if (nivel === 2) return parseFloat((Math.random() * 10).toFixed(1)); // 1 decimal
    return parseFloat(((Math.random() * 20) - 10).toFixed(2)); // decimales y negativos
  });

  // Generar matriz A
  const A = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => {
      if (nivel === 1) return Math.floor(Math.random() * 5 + 1); // 1–5
      if (nivel === 2) return Math.floor(Math.random() * 11) - 5; // -5 a 5
      return parseFloat(((Math.random() * 20) - 10).toFixed(2)); // decimales y negativos
    })
  );

  // B = A * x
  const B = A.map(row =>
    row.reduce((sum, coef, j) => sum + coef * soluciones[j], 0)
  );

  const letras = ['x', 'y', 'z'];
  const ecuaciones = A.map((fila, i) => {
    const izq = fila.map((coef, j) => {
      const sign = coef >= 0 && j > 0 ? '+' : '';
      return `${sign}${coef}${letras[j]}`;
    }).join(' ');
    return `${i + 1}) ${izq} = ${B[i].toFixed(2)}`;
  }).join('<br>');

  const texto = `Sistema de ecuaciones:<br>${ecuaciones}<br>¿Cuánto valen x, y, z?`;

  return {
    texto,
    respuesta: {
      x: soluciones[0],
      y: soluciones[1],
      z: soluciones[2]
    }
  };
}
