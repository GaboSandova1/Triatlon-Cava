document.addEventListener('DOMContentLoaded', () => {
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
  });
  
  // Función para guardar participantes en localStorage
  function saveParticipants() {
    localStorage.setItem('participants', JSON.stringify(participants));
  }
  
  // Obtener participantes desde localStorage
  let participants = getParticipants();
  
  // Función para obtener participantes desde localStorage
  function getParticipants() {
    return JSON.parse(localStorage.getItem('participants')) || [];
  }