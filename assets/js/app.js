
const temas = [
  {
    numero: 5,
    nombre: "Fracciones y operaciones",
    descripcion: "Aprende a trabajar con fracciones.",
    icono: "➗",
    disponible: true,
    ruta: "temas/tema5/index.html"
  },
  {
    numero: 6,
    nombre: "Próximo tema",
    descripcion: "Contenido pendiente de incorporar.",
    icono: "📐",
    disponible: false
  },
  {
    numero: 7,
    nombre: "Próximo tema",
    descripcion: "Contenido pendiente de incorporar.",
    icono: "📊",
    disponible: false
  },
  {
    numero: 8,
    nombre: "Próximo tema",
    descripcion: "Contenido pendiente de incorporar.",
    icono: "📏",
    disponible: false
  }
];

function getProgress() {
  try {
    return JSON.parse(
      localStorage.getItem("mates6_progreso") || "{}"
    );
  } catch {
    return {};
  }
}

function saveProgress(tema, score, total) {
  const progress = getProgress();
  const previous = progress[tema] || {};

  progress[tema] = {
    score,
    total,
    best: Math.max(
      previous.best || 0,
      Math.round(score / total * 100)
    ),
    attempts: (previous.attempts || 0) + 1,
    date: new Date().toISOString()
  };

  localStorage.setItem(
    "mates6_progreso",
    JSON.stringify(progress)
  );
}

function resetProgress() {
  if (confirm("¿Quieres borrar todas las puntuaciones?")) {
    localStorage.removeItem("mates6_progreso");
    location.reload();
  }
}

function renderHome() {
  const container = document.getElementById("topics");
  if (!container) return;

  const progress = getProgress();

  container.innerHTML = temas.map(t => {
    const p = progress[t.numero];
    const available = t.disponible;

    return `
      <a class="topic-card"
         href="${available ? t.ruta : '#'}"
         ${available ? "" : 'onclick="return false"'}>
        <div class="topic-icon">${t.icono}</div>
        <div class="topic-number">
          TEMA ${t.numero}
        </div>
        <h3>${t.nombre}</h3>
        <p>${t.descripcion}</p>
        ${
          available
          ? `<span class="topic-status">
              Disponible ${p ? "· Practicado" : ""}
             </span>`
          : `<span class="topic-status topic-locked">
              Próximamente
             </span>`
        }
        ${
          p
          ? `<p>Mejor nota: ${p.best}%</p>`
          : ""
        }
      </a>
    `;
  }).join("");

  document.getElementById("topic-count").textContent =
    temas.filter(t => t.disponible).length + " disponibles";

  document.getElementById("completed").textContent =
    Object.keys(progress).length;

  document.getElementById("total-points").textContent =
    Object.values(progress).reduce(
      (sum,p) => sum + p.score, 0
    );

  document.getElementById("best-score").textContent =
    Math.max(0,...Object.values(progress).map(p=>p.best)) + "%";
}

renderHome();
