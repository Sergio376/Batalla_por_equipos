const numEquipos = document.getElementById('numEquipos');
const nombresEquipos = document.getElementById('nombresEquipos');
const form = document.getElementById('formEquipos');

numEquipos.addEventListener('change', () => {
  const cantidad = parseInt(numEquipos.value);
  nombresEquipos.innerHTML = '';
  for (let i = 1; i <= cantidad; i++) {
    nombresEquipos.innerHTML += `
      <div class="mb-3">
        <label class="form-label">Nombre del equipo ${i}</label>
        <input type="text" class="form-control" name="equipo${i}" required>
      </div>`;
  }
});

// Guardar y pasar a juego (ejemplo)
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombres = Array.from(form.querySelectorAll('input')).map(input => input.value);
  localStorage.setItem('equipos', JSON.stringify(nombres));
  window.location.href = 'juego.html'; // Ir a la pantalla del juego
});
