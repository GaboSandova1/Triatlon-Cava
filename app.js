

// Estructuras de Datos

class Registro {
    nombre = "";
    ced = 0;
    muni = "";
    edad = 0;

    constructor(nombre, ced, muni, edad) {
        this.nombre = nombre;
        this.ced = ced;
        this.muni = muni;
        this.edad = edad;
    }
}

class Participante {
    nombre = "";
    ced = 0;
    muni = "";
    edad = 0;
    status = "Caminata";
    calificado = true;
    recorrido = 0;
    caminataInicio = "-";
    caminataFin = "-";
    natacionInicio = "-";
    natacionFin = "-";
    ciclismoInicio = "-";
    ciclismoFin = "-";


    constructor(nombre, ced, muni, edad) {
        this.nombre = nombre;
        this.ced = ced;
        this.muni = muni;
        this.edad = edad;
        this.status = "Caminata";
    }
}


// Funciones para continuar a la sig pag
function redirectRegistro() {
    location.href = "registro.html";
}

function redirectResultados() {
    location.href = "resultados.html"
}

function redirectPrincipal() {
    location.href = "index.html"
}

function redirectAsistencia() {
    location.href = "asistencia.html"
}

// Variables Globales

let registros = [];
let participantes = [];
let aux;

let h = 0;
let m = 0;
let s = 0;
let mls = 0;
let timeStarted = 0;


// TODO Recordar cambiar por valores correctos
const DISTANCIA_TOTAL_CAMINATA = 10000; // metros, valor real = 10000 (10 km)
const DISTANCIA_TOTAL_NATACION = 10000; // metros, valor real = 10000 (10 km)
const DISTANCIA_TOTAL_CICLISMO = 30000; // metros, valor real = 30000 (30 km)

// distancias en 1 s
const DISTANCIA_MAX_CAMINATA = 1.94; // metros, valor real = 1.94
const DISTANCIA_MAX_NATACION = 1.72; // metros, valor real = 1.72
const DISTANCIA_MAX_CICLISMO = 12.50; // metros, valor real = 12.50

const PROBABILIDAD_DESCALIFICACION = 0.00001; // Entre 0 y 1, valor recomendado 0.001 (0.1% prob de descalificacion)
const TIME_INTERVAL = 1; // milisegundos, valor real = 1000 (1 segundo)

// Funcion para que ningun parametro quede vacio

const nom = document.getElementById("participant-cedula");
const ced = document.getElementById("participant-cedula");
const muni = document.getElementById("participant-municipio");
const edad = document.getElementById("participant-edad");
const data = document.getElementById("form")
const listaInput = document.querySelectorAll(".imputNom")

data.addEventListener("submit", function (eve) {
    eve.preventDefault();

    if (nom.value.trim() == "" || nom.value.length < 1) {
        alert("Si no ingresas un nombre. No puedes participar.");
        document.getElementById("nombre").focus();
    }
    else if (ced.value.trim() == "" || ced.value.length < 7) {
        alert("Si no ingresas una Cedula. No puedes participar.");
        document.getElementById("cedula").focus();
    }
    else if (muni.value.trim() == "" || muni.value.length < 1) {
        alert("Si no ingresas un Municipio de donde vives. No puedes participar.");
        document.getElementById("municipio").focus();
    }
    
    else if (edad.value.trim() == "" || parseInt(edad.value) > 100) {
        alert("Debes tener maximo 120 años para participar.");
        document.getElementById("edad").focus();
    }

    else if (edad.value.trim() == "" || parseInt(edad.value) < 12) {
        alert("Debes tener al menos 18 años para participar.");
        document.getElementById("edad").focus();
    }


    
    else {
        let dateform = new FormData(data);

        let tablaRef = document.getElementById("Tabla");
        let rowRef = tablaRef.insertRow(-1);

        const name = dateform.get("nombre");
        const ced = dateform.get("cedula");
        const mun = dateform.get("municipio");
        const age = dateform.get("edad");


        let cellRef = rowRef.insertCell(0);
        cellRef.textContent = name;

        cellRef = rowRef.insertCell(1);
        cellRef.textContent = ced;

        cellRef = rowRef.insertCell(2);
        cellRef.textContent = mun;

        cellRef = rowRef.insertCell(3);
        cellRef.textContent = age;

        registros.push(new Registro(name, ced, mun, age))
        localStorage.setItem("registros", JSON.stringify(registros))
        data.reset()
    }
})

// Registro
function loadRegistroTable() {
    // Se limpian los registros
    registros = []
    localStorage.setItem("registros", JSON.stringify(registros))
}


// Asistencia

function checkBoxChange(checkbox) {
    aux = checkbox;
    if (checkbox.checked) {
        // Se activo el check, se guardara en participantes
        const reg = registros.find(reg => reg.ced.toString() === checkbox.value);

        participantes.push(new Participante(reg.nombre, reg.ced, reg.muni, reg.edad));
    } else {
        // Se desactivó el check, se elimina de participantes
        const part = participantes.find(p => p.ced.toString() === checkbox.value);
        participantes.splice(participantes.indexOf(part), 1);
    }
    // Se actualiza el item de participantes
    localStorage.setItem("participantes", JSON.stringify(participantes));

}

function loadAsistenciaTable() {
    // Se cargan los registros y se limpian los participantes
    registros = JSON.parse(localStorage.getItem("registros"));
    participantes = [];
    localStorage.setItem("participantes", JSON.stringify(participantes));

    let tablaRef = document.getElementById("body-tabla-asistencia");

    // Set hour default value
    let hourRef = document.getElementById("input-hora");
    const date = new Date();
    const ht = ('0' + date.getHours()).slice(-2)
    const mt = ('0' + date.getMinutes()).slice(-2)
    const st = ('0' + date.getSeconds()).slice(-2)

    hourRef.value = `${ht}:${mt}:${st}`;

    // Se llena la tabla con los registros
    registros.forEach(registro => {
        let rowRef = tablaRef.insertRow(-1);

        let cellRef = rowRef.insertCell(0);
        cellRef.innerHTML = "<label>\n" +
            "                            <input type=\"checkbox\" onchange=\"checkBoxChange(this)\" value=\"" + registro.ced + "\">\n" +
            "                        </label>"
        cellRef = rowRef.insertCell(1);
        cellRef.textContent = registro.nombre;

        cellRef = rowRef.insertCell(2);
        cellRef.textContent = registro.ced;

        cellRef = rowRef.insertCell(3);
        cellRef.textContent = registro.muni;

        cellRef = rowRef.insertCell(4);
        cellRef.textContent = registro.edad;
    })


}

function initTriatlon() {
    if (participantes.length === 0) {
        alert("No existen participantes para el triatlon")
    } else {
        let hourRef = document.getElementById("input-hora");
        localStorage.setItem("horaInicio", JSON.stringify(hourRef.value));

        participantes.forEach(participante => {
            participante.caminataInicio = hourRef.value.toString();
        })
        localStorage.setItem("participantes", JSON.stringify(participantes));
        redirectResultados();
    }

}

// Resultados

function loadResultadosTable() {
    // Se cargan los participantes y la hora
    participantes = JSON.parse(localStorage.getItem("participantes"));
    let horaInicio = JSON.parse(localStorage.getItem("horaInicio")).split(":");
    h = horaInicio[0];
    m = horaInicio[1];
    s = horaInicio[2];

    let varDistancia = document.getElementById('distancia');

    varDistancia.innerHTML = (DISTANCIA_TOTAL_CAMINATA + DISTANCIA_TOTAL_NATACION + DISTANCIA_TOTAL_CICLISMO) + " m"

    rewriteParticipants();
    startTimer();
}

function rewriteParticipants() {

    let tablaRef = document.getElementById("body-tabla-resultados");
    tablaRef.innerHTML = '';
    aux = document.getElementById('body-tabla-resultados');

    participantes.forEach(participante => {
        let rowRef = tablaRef.insertRow(-1);

        if (!participante.calificado) {
            rowRef.style.color = "red";
        } else if (participante.status === "Finalizado") {
            rowRef.style.color = "green";
        }

        let cellRef = rowRef.insertCell(0);
        cellRef.textContent = participante.nombre;

        cellRef = rowRef.insertCell(1);
        cellRef.textContent = participante.ced;

        cellRef = rowRef.insertCell(2);
        cellRef.textContent = participante.muni;

        cellRef = rowRef.insertCell(3);
        cellRef.textContent = participante.edad;

        cellRef = rowRef.insertCell(4);
        cellRef.textContent = participante.recorrido.toFixed(2) + " m";

        cellRef = rowRef.insertCell(5);
        cellRef.textContent = participante.status;

        cellRef = rowRef.insertCell(6);
        cellRef.textContent = participante.caminataInicio;

        cellRef = rowRef.insertCell(7);
        cellRef.textContent = participante.caminataFin;

        cellRef = rowRef.insertCell(8);
        cellRef.textContent = participante.natacionInicio;

        cellRef = rowRef.insertCell(9);
        cellRef.textContent = participante.natacionFin;

        cellRef = rowRef.insertCell(10);
        cellRef.textContent = participante.ciclismoInicio;

        cellRef = rowRef.insertCell(11);
        cellRef.textContent = participante.ciclismoFin;
    })
}

function writeTime() {

    let time = document.getElementById("time");

    let ht, mt, st;
    s++;

    if (s > 59) { m++; s = 0; }
    if (m > 59) { h++; m = 0; }
    if (h > 24) h = 0;

    st = ('0' + s).slice(-2)
    mt = ('0' + m).slice(-2)
    ht = ('0' + h).slice(-2)

    time.innerHTML = `${ht}:${mt}:${st}`;
}
function startTimer() {
    writeTime()
    timeStarted = setInterval(updateParticipants, TIME_INTERVAL);
}

function updateParticipants() {
    writeTime()
    const st = ('0' + s).slice(-2)
    const mt = ('0' + m).slice(-2)
    const ht = ('0' + h).slice(-2)

    participantes.forEach(participante => {
        if (participante.calificado) {
            // El participante no ha sido descalificado
            if (participante.recorrido < DISTANCIA_TOTAL_CAMINATA) {
                // El participante sigue en Caminata
                const random = Math.random();
                if ((random - PROBABILIDAD_DESCALIFICACION) < 0.00001) {
                    // Descalificar Participante
                    participante.calificado = false;
                    participante.status = "Descalificado"
                } else {
                    // Aumentar recorrido
                    participante.recorrido += random * DISTANCIA_MAX_CAMINATA;
                    if (participante.recorrido >= DISTANCIA_TOTAL_CAMINATA) {
                        // Cumplió la caminata
                        participante.caminataFin = `${ht}:${mt}:${st}`
                        participante.natacionInicio = `${ht}:${mt}:${st}`
                        participante.status = "Natación"
                    }
                }
            } else if (participante.recorrido < (DISTANCIA_TOTAL_CAMINATA + DISTANCIA_TOTAL_NATACION)) {
                // El participante sigue en Natación
                const random = Math.random();
                if ((random - PROBABILIDAD_DESCALIFICACION) < 0.00001) {
                    // Descalificar Participante
                    participante.calificado = false;
                    participante.status = "Descalificado"
                } else {
                    // Aumentar recorrido
                    participante.recorrido += random * DISTANCIA_MAX_NATACION;
                    if (participante.recorrido >= (DISTANCIA_TOTAL_CAMINATA + DISTANCIA_TOTAL_NATACION)) {
                        // Cumplió la Natación
                        participante.natacionFin = `${ht}:${mt}:${st}`
                        participante.ciclismoInicio = `${ht}:${mt}:${st}`
                        participante.status = "Ciclismo"
                    }
                }
            } else if (participante.recorrido < (DISTANCIA_TOTAL_CAMINATA + DISTANCIA_TOTAL_NATACION + DISTANCIA_TOTAL_CICLISMO)) {
                // El participante sigue en Ciclismo
                const random = Math.random();
                if (random - PROBABILIDAD_DESCALIFICACION < 0.00001) {
                    // Descalificar Participante
                    participante.calificado = false;
                    participante.status = "Descalificado"
                }
                else {
                    // Aumentar recorrido
                    participante.recorrido += random * DISTANCIA_MAX_CICLISMO;
                    if (participante.recorrido >= (DISTANCIA_TOTAL_CAMINATA + DISTANCIA_TOTAL_NATACION + DISTANCIA_TOTAL_CICLISMO)) {
                        // Cumplió el Ciclismo
                        participante.ciclismoFin = `${ht}:${mt}:${st}`
                        // Evitar recorridos mayores a la suma de los totales
                        participante.recorrido = (DISTANCIA_TOTAL_CAMINATA + DISTANCIA_TOTAL_NATACION + DISTANCIA_TOTAL_CICLISMO);
                        participante.status = "Finalizado"
                    }
                }
            }
        }
    });

    participantes.sort(function (a, b) {
        return b.recorrido - a.recorrido || b.ciclismoFin - a.ciclismoFin;
    })

    rewriteParticipants();
}


