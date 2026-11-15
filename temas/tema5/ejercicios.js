
const preguntas = [
["Equivalentes","¿Qué fracción equivale a 1/2?",
["2/3","3/6","2/5","4/5"],1,
"Multiplicamos numerador y denominador por 3."],

["Equivalentes","¿Cuál equivale a 2/3?",
["3/5","4/6","2/6","5/6"],1,
"Multiplicamos arriba y abajo por 2."],

["Equivalentes","Completa: 3/4 = ?/8",
["5","6","7","8"],1,
"3 × 2 = 6 y 4 × 2 = 8."],

["Equivalentes","¿Cuál equivale a 5/10?",
["1/2","1/5","2/5","3/5"],0,
"Dividimos arriba y abajo entre 5."],

["Mixtos","Convierte 2 1/3 en fracción.",
["5/3","6/3","7/3","8/3"],2,
"2 × 3 + 1 = 7."],

["Mixtos","¿Qué número mixto representa 9/4?",
["1 1/4","2 1/4","2 2/4","3 1/4"],1,
"9 dividido entre 4 es 2 y sobra 1."],

["Mixtos","Convierte 3 2/5 en fracción.",
["15/5","16/5","17/5","18/5"],2,
"3 × 5 + 2 = 17."],

["Mixtos","¿Cuál es el mixto de 11/3?",
["2 2/3","3 1/3","3 2/3","4 1/3"],2,
"11 dividido entre 3 da 3 y sobra 2."],

["Denominador","¿Cuál es el m.c.m. de 2 y 3?",
["4","5","6","9"],2,
"El mínimo común múltiplo es 6."],

["Denominador","1/2 equivale a...",
["2/6","3/6","4/6","5/6"],1,
"Multiplicamos por 3/3."],

["Denominador","2/3 equivale a...",
["4/6","3/6","2/6","5/6"],0,
"Multiplicamos por 2/2."],

["Denominador","¿Cuál es el m.c.m. de 4 y 6?",
["8","10","12","24"],2,
"El primer múltiplo común es 12."],

["Comparación","¿Cuál es mayor?",
["2/5","4/5","Son iguales","No se sabe"],1,
"Con igual denominador gana el numerador mayor."],

["Comparación","Compara 1/2 y 2/3.",
["1/2 es mayor","2/3 es mayor","Son iguales","Ninguna"],1,
"1/2 = 3/6 y 2/3 = 4/6."],

["Comparación","3/8 __ 5/8",
[">","<","=","+"],1,
"3 es menor que 5."],

["Comparación","¿Cuál es mayor?",
["3/4","5/8","Son iguales","Ninguna"],0,
"3/4 = 6/8."],

["Suma y resta","2/7 + 3/7 =",
["5/14","6/7","5/7","1/7"],2,
"Sumamos los numeradores."],

["Suma y resta","6/8 - 2/8 =",
["4/8","4/16","8/8","3/8"],0,
"6 - 2 = 4."],

["Suma y resta","1/2 + 1/3 =",
["2/5","5/6","1/6","3/6"],1,
"3/6 + 2/6 = 5/6."],

["Suma y resta","3/4 - 1/2 =",
["2/4","1/4","1/2","3/2"],1,
"3/4 - 2/4 = 1/4."],

["Multiplicación","2/3 × 3/5 =",
["6/8","5/15","6/15","5/8"],2,
"Multiplicamos arriba y abajo."],

["Multiplicación","1/2 × 1/2 =",
["1/2","1/4","2/4","2/2"],1,
"1 × 1 = 1 y 2 × 2 = 4."],

["Multiplicación","3/4 × 2/3 =",
["6/12","5/7","6/7","3/8"],0,
"Multiplicamos numeradores y denominadores."],

["Multiplicación","2/5 × 5/6 =",
["10/30","7/11","1/3","10/11"],2,
"10/30 se simplifica a 1/3."],

["División","1/2 ÷ 1/4 =",
["1/8","2","1/2","4"],1,
"Invertimos la segunda fracción."],

["División","2/3 ÷ 4/5 =",
["8/15","10/12","5/6","6/5"],2,
"2/3 × 5/4 = 10/12 = 5/6."],

["División","1/3 ÷ 1/2 =",
["2/3","1/6","3/2","1/5"],0,
"1/3 × 2/1 = 2/3."],

["División","3/4 ÷ 1/2 =",
["3/8","3/2","4/3","1/2"],1,
"3/4 × 2/1 = 6/4 = 3/2."]
];

let actual = 0;
let puntos = 0;
let contestada = false;
let falladas = [];

const area = document.getElementById("exercise");

function mostrarPregunta() {
  contestada = false;
  const q = preguntas[actual];

  area.innerHTML = `
    <span class="pill">Pregunta ${actual+1} de ${preguntas.length}</span>
    <div class="progress-track" style="margin:15px 0">
      <div class="progress-fill"
        style="width:${actual/preguntas.length*100}%"></div>
    </div>
    <h3>${q[0]}</h3>
    <h2>${q[1]}</h2>
    ${q[2].map((o,i)=>`
      <button class="exercise-option" onclick="responder(${i})">
        ${String.fromCharCode(65+i)}) ${o}
      </button>
    `).join("")}
    <div id="respuesta"></div>
    <button id="siguiente" class="btn btn-primary"
      style="width:100%;display:none"
      onclick="siguiente()">
      Siguiente →
    </button>
  `;
}

function responder(i) {
  if(contestada) return;
  contestada = true;

  const q = preguntas[actual];
  const botones = area.querySelectorAll(".exercise-option");

  botones.forEach((b,j)=>{
    b.disabled = true;
    if(j===q[3]) b.classList.add("correct");
    else if(j===i) b.classList.add("incorrect");
  });

  const correcto = i===q[3];

  if(correcto) puntos++;
  else falladas.push(actual);

  document.getElementById("respuesta").innerHTML = `
    <div class="feedback ${correcto?"good":"bad"}">
      ${correcto?"✅ ¡Correcto!":"❌ Respuesta incorrecta."}
      <br><b>Explicación:</b> ${q[4]}
    </div>
  `;

  document.getElementById("siguiente").style.display="block";
}

function siguiente() {
  actual++;
  if(actual<preguntas.length) {
    mostrarPregunta();
  } else {
    terminar();
  }
}

function terminar() {
  const nota = Math.round(puntos/preguntas.length*100);

  const anterior = JSON.parse(
    localStorage.getItem("mates6_tema5") || "{}"
  );

  const resultado = {
    score:puntos,
    total:preguntas.length,
    best:Math.max(anterior.best||0,nota),
    attempts:(anterior.attempts||0)+1,
    date:new Date().toISOString()
  };

  localStorage.setItem(
    "mates6_tema5",
    JSON.stringify(resultado)
  );

  area.innerHTML = `
    <h2>🏆 ¡Has terminado!</h2>
    <div class="big">${puntos}/${preguntas.length}</div>
    <h3>Nota: ${nota}%</h3>
    <p>${nota>=90?"¡Excelente trabajo! 🌟":
      nota>=70?"¡Muy bien! 👏":
      "Sigue practicando. ¡Tú puedes! 💪"}</p>
    <p>Preguntas acertadas: ${puntos}</p>
    <p>Preguntas falladas: ${falladas.length}</p>
    <button class="btn btn-primary" onclick="reiniciar()">
      Volver a practicar
    </button>
  `;

  document.getElementById("last-result").textContent =
    `Último resultado: ${puntos}/${preguntas.length} · ${nota}%`;
}

function reiniciar() {
  actual=0;
  puntos=0;
  falladas=[];
  mostrarPregunta();
}

mostrarPregunta();

const ultimo = JSON.parse(
  localStorage.getItem("mates6_tema5") || "null"
);

if(ultimo) {
  document.getElementById("last-result").textContent =
    `Mejor resultado: ${ultimo.best}% · Intentos: ${ultimo.attempts}`;
}
