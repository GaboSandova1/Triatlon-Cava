// Variables globales
let participants = [];
let currentParticipant = null;
// let currentParticipant = null;

document.addEventListener('DOMContentLoaded', () => {
  participants = getParticipants();

  document.querySelectorAll('.discipline-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const discipline = btn.dataset.discipline;
      if (discipline === 'walk') {
        startDiscipline(discipline);
      }
    });
  });
});

// Función para obtener un participante por id
function getParticipant(participants, id) {
  return participants.find(participant => participant.id === id);
}

// Función para iniciar una disciplina
function startDiscipline(discipline) {
  if (!currentParticipant) {
    currentParticipant = getParticipant(participants, 'id');
  }

  if (!currentParticipant) {
    console.error('No se encontró ningún participante');
    return;
  }

  // Simular la disciplina
  let distance = 0;
  for (let i = 0; i < 10; i++) {
    distance += Math.floor(Math.random() * 7) + 1;
  }

  currentParticipant.disciplines.walk += distance;

  // Guardar en localStorage
  saveParticipants();

  console.log(`Participante ${currentParticipant.name} ha completado ${distance} metros en caminata`);
}

function saveParticipants() {
    localStorage.setItem('participants', JSON.stringify(participants));
}

function getParticipants() {
    return JSON.parse(localStorage.getItem('participants')) || [];
}
