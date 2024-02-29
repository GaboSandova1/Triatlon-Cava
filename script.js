// script.js

// Función para registrar a un nuevo participante
(function registerModule() {
    const registrationForm = document.getElementById('registration-form');
    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();
  
        const cedula = document.getElementById('participant-cedula').value;
        const name = document.getElementById('participant-name').value;
        const municipio = document.getElementById('participant-municipio').value;
        const edad = document.getElementById('participant-edad').value;
    
        if (!name || !cedula || !municipio || !edad) {
          console.error('Todos los campos son obligatorios');
          return;
        }
    
        const newParticipant = {
          id: new Date().getTime(),
          name,
          cedula,
          municipio,
          edad,
          disciplines: {
            walk: 0,
            swim: 0,
            bike: 0
          }
        };
    
        participants = getParticipants().concat(newParticipant);
        saveParticipants();
    
        console.log(`Participante ${name} registrado con ID ${newParticipant.id}`);
    
        // Limpiar el formulario
        registrationForm.reset();
    });
  
    // Función para guardar participantes en localStorage
    function saveParticipants() {
      localStorage.setItem('participants', JSON.stringify(participants));
    }
  
    // Función para obtener participantes desde localStorage
    function getParticipants() {
      return JSON.parse(localStorage.getItem('participants')) || [];
    }
  })();
  
  // Función para iniciar una disciplina
  (function disciplineModule() {
    document.addEventListener('DOMContentLoaded', () => {
      // Obtener participantes desde localStorage
      let participants = getParticipants();
  
      document.querySelectorAll('.discipline-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const discipline = btn.dataset.discipline;
          if (discipline === 'walk') {
            startDiscipline(discipline);
          } else if (discipline === 'swim') {
            startDiscipline(discipline);
          } else if (discipline === 'bike') {
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
        
    }
)();