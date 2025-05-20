// problemasInterpolacion.js

export function generarInterpolacionLineal() {
    const x0 = parseFloat((Math.random() * 5 + 1).toFixed(2));
    const x1 = parseFloat((x0 + Math.random() * 3 + 1).toFixed(2));
    const fx0 = parseFloat((Math.random() * 10 - 5).toFixed(2));
    const fx1 = parseFloat((fx0 + Math.random() * 3).toFixed(2));
    const x = parseFloat(((x0 + x1) / 2).toFixed(2));
    const fx = fx0 + (fx1 - fx0) / (x1 - x0) * (x - x0);
    const puntos = [[x0, fx0], [x1, fx1]];
    return {
      texto: `Interpolación lineal: Estimar f(${x}) usando puntos (x₀, f₀): (${x0}, ${fx0}) y (x₁, f₁): (${x1}, ${fx1})`,
      respuesta: fx.toFixed(3)
    };
  }
  
  export function generarNewtonAdelante() {
    const x0 = 0, h = 1;
    const y = [2.0, 2.7, 3.8, 5.1];
    const x = 2.5;
    const q = (x - x0) / h;
    const d1 = y[1] - y[0];
    const d2 = y[2] - 2 * y[1] + y[0];
    const d3 = y[3] - 3 * y[2] + 3 * y[1] - y[0];
    const f = y[0] + q * d1 + (q * (q - 1) * d2) / 2 + (q * (q - 1) * (q - 2) * d3) / 6;
    return {
      texto: `Newton hacia adelante: Estimar f(${x}) con tabla y = [${y.join(', ')}]`,
      respuesta: f.toFixed(3)
    };
  }
  
  export function generarNewtonAtras() {
    const x0 = 0, h = 1;
    const y = [2.0, 2.7, 3.8, 5.1];
    const x = 1.5;
    const q = (x - (x0 + 3 * h)) / h;
    const d1 = y[3] - y[2];
    const d2 = y[3] - 2 * y[2] + y[1];
    const d3 = y[3] - 3 * y[2] + 3 * y[1] - y[0];
    const f = y[3] + q * d1 + (q * (q + 1) * d2) / 2 + (q * (q + 1) * (q + 2) * d3) / 6;
    return {
      texto: `Newton hacia atrás: Estimar f(${x}) con tabla y = [${y.join(', ')}]`,
      respuesta: f.toFixed(3)
    };
  }
  
  export function generarDiferenciasDivididas() {
    const puntos = [[1, 2], [2, 3], [4, 7]];
    const x = 3;
    const f01 = (puntos[1][1] - puntos[0][1]) / (puntos[1][0] - puntos[0][0]);
    const f12 = (puntos[2][1] - puntos[1][1]) / (puntos[2][0] - puntos[1][0]);
    const f012 = (f12 - f01) / (puntos[2][0] - puntos[0][0]);
    const f = puntos[0][1] + f01 * (x - puntos[0][0]) + f012 * (x - puntos[0][0]) * (x - puntos[1][0]);
    return {
      texto: `Diferencias divididas: Estimar f(${x}) con puntos (1,2), (2,3), (4,7)`,
      respuesta: f.toFixed(3)
    };
  }
  
  export function generarLagrange() {
    const puntos = [[1, 2], [2, 3], [4, 7]];
    const x = 3;
    let resultado = 0;
    for (let i = 0; i < puntos.length; i++) {
      let termino = puntos[i][1];
      for (let j = 0; j < puntos.length; j++) {
        if (j !== i) {
          termino *= (x - puntos[j][0]) / (puntos[i][0] - puntos[j][0]);
        }
      }
      resultado += termino;
    }
    return {
      texto: `Interpolación de Lagrange: Estimar f(${x}) con puntos (1,2), (2,3), (4,7)`,
      respuesta: resultado.toFixed(3)
    };
  }
  