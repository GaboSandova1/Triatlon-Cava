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

function getParticipant(id) {
    const participants = JSON.parse(localStorage.getItem('participants')) || [];
    return participants.find(participant => participant.id === id);
}

function updateParticipantProgress(id, distance) {
    const participants = JSON.parse(localStorage.getItem('participants')) || [];
    const participant = participants.find(p => p.id === id);

    if (!participant) {
        console.error('Participante no encontrado:', id);
        return;
    }

    const startTime = new Date(participant.startTime);
    const currentTime = new Date();
    const timeElapsed = (currentTime - startTime) / 1000; // Convertir a segundos

    participant.distance += distance;
    participant.timeElapsed = timeElapsed;

    localStorage.setItem('participants', JSON.stringify(participants));
}

function calculateElapsedTime(startTime, endTime) {

    const elapsedMilliseconds = new Date(endTime) - new Date(startTime);

    const hours = Math.floor(elapsedMilliseconds / 3600000); // 1 hora = 3600000 milisegundos
    const minutes = Math.floor((elapsedMilliseconds % 3600000) / 60000); // 1 minuto = 60000 milisegundos
    const seconds = Math.floor((elapsedMilliseconds % 60000) / 1000); // 1 segundo = 1000 milisegundos

    return { hours, minutes, seconds };
}

function logElapsedTime() {
    const startTime = new Date('2024-02-29T00:00:00'); // Fecha y hora de inicio de la carrera
    const currentTime = new Date('2024-02-30T00:00:00'); // Fecha y hora actual

    const elapsedTime = calculateElapsedTime(startTime, currentTime);

    document.write('Tiempo transcurrido:', elapsedTime);
}

function generateRandomDistance() {
    return Math.floor(Math.random() * 7) + 1;
}

// Simular la caminata del participante
const participantDistance = 0; // Distancia total recorrida por el participante

for (let i = 0; i < 10; i++) {
    const randomDistance = generateRandomDistance();
    participantDistance += randomDistance;
    document.write(`El participante ha recorrido ${randomDistance} metros en esta etapa.`);
}

document.write(`La distancia total recorrida por el participante es ${participantDistance} metros.`);

