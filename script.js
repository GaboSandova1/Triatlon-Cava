document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const Ci = document.getElementById('Ci').value;
    const nombre = document.getElementById('nombre').value;
    const municipio = document.getElementById('municipio').value;
    const edad = document.getElementById('edad').value;

    const participantList = document.getElementById('participant-list');
    const newParticipant = document.createElement('li');
    newParticipant.innerHTML = `<strong>${nombre} - ${Ci} - ${municipio} - ${edad}</strong>`;
    participantList.appendChild(newParticipant);

    const data = { Ci, nombre, municipio, edad };
    fetch('/api/participants', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => console.log('Participante registrado:', data))
    .catch(error => console.error('Error al registrar participante:', error));

    // Limpiar el formulario
    document.getElementById('registration-form').reset();
});