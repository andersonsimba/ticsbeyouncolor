/**
 * Detector de Daltonismo - Aplicación Web
 * Utiliza placas Ishihara para detectar deficiencias en la visión de color
 */

// Configuración de placas Ishihara
const plates = [
  {
    src: "1.jpeg",
    answer: "12",
    hint: "Busca un número de dos dígitos",
    description: "Placa de prueba general"
  },
  {
    src: "2.jpeg",
    answer: "8",
    hint: "Busca un número de un dígito",
    description: "Detecta daltonismo rojo-verde"
  },
  {
    src: "3.jpeg",
    answer: "29",
    hint: "Busca un número de dos dígitos",
    description: "Prueba adicional de visión de color"
  },
  {
    src: "4.jpeg",
    answer: "5",
    hint: "Busca un número de un dígito",
    description: "Confirmación de la prueba"
  }
];

// Variables de estado
let currentIndex = 0;
let correctAnswers = 0;
const totalPlates = plates.length;
let testStarted = false;
let userAnswers = [];

// Elementos del DOM
const mainContent = document.getElementById("main-content");
const introSection = document.getElementById("intro-section");
const testSection = document.getElementById("test-section");
const resultsSection = document.getElementById("results-section");
const infoSection = document.getElementById("info-section");

const startBtn = document.getElementById("start-btn");
const submitBtn = document.getElementById("submit-btn");
const skipBtn = document.getElementById("skip-btn");
const restartBtn = document.getElementById("restart-btn");
const infoBtn = document.getElementById("info-btn");
const backBtn = document.getElementById("back-btn");

const ishiharaImg = document.getElementById("ishihara-img");
const userAnswerInput = document.getElementById("user-answer");
const plateNumber = document.getElementById("plate-number");
const totalPlatesDisplay = document.getElementById("total-plates");
const progressFill = document.getElementById("progress-fill");
const scoreText = document.getElementById("score-text");
const feedbackDiv = document.getElementById("feedback");
const hintText = document.getElementById("hint-text");

// Event Listeners
startBtn.addEventListener("click", startTest);
submitBtn.addEventListener("click", submitAnswer);
skipBtn.addEventListener("click", skipPlate);
restartBtn.addEventListener("click", restartTest);
infoBtn.addEventListener("click", showInfo);
backBtn.addEventListener("click", hideInfo);

// Enter key en input
userAnswerInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") submitAnswer();
});

// Focus en input al cargar placa
userAnswerInput.addEventListener("focus", () => {
  hintText.textContent = plates[currentIndex].hint;
  hintText.classList.remove("hidden");
});

userAnswerInput.addEventListener("blur", () => {
  setTimeout(() => {
    hintText.classList.add("hidden");
  }, 100);
});

/**
 * Inicia la prueba
 */
function startTest() {
  testStarted = true;
  currentIndex = 0;
  correctAnswers = 0;
  userAnswers = [];

  showSection("test");
  loadPlate();
  userAnswerInput.focus();
}

/**
 * Carga una placa Ishihara
 */
function loadPlate() {
  if (currentIndex >= totalPlates) {
    showResults();
    return;
  }

  // Actualizar UI
  plateNumber.textContent = currentIndex + 1;
  totalPlatesDisplay.textContent = totalPlates;
  ishiharaImg.src = plates[currentIndex].src;
  userAnswerInput.value = "";
  feedbackDiv.classList.add("hidden");
  hintText.classList.add("hidden");

  // Actualizar barra de progreso
  const progress = ((currentIndex) / totalPlates) * 100;
  progressFill.style.width = progress + "%";

  // Actualizar puntuación
  scoreText.textContent = `${correctAnswers}/${totalPlates}`;

  // Focus en input
  userAnswerInput.focus();
}

/**
 * Envía la respuesta del usuario
 */
function submitAnswer() {
  const userValue = userAnswerInput.value.trim().toLowerCase();

  if (!userValue) {
    showFeedback("Por favor, ingresa una respuesta", "warning");
    return;
  }

  const correctAnswer = plates[currentIndex].answer.toLowerCase();
  const isCorrect = userValue === correctAnswer;

  // Registrar respuesta
  userAnswers.push({
    plate: currentIndex + 1,
    userAnswer: userValue,
    correctAnswer: correctAnswer,
    isCorrect: isCorrect
  });

  if (isCorrect) {
    correctAnswers++;
    showFeedback("¡Correcto! ✓", "success");
  } else {
    showFeedback(`Incorrecto. La respuesta correcta era: ${correctAnswer}`, "danger");
  }

  // Desabilitar input y botones temporalmente
  userAnswerInput.disabled = true;
  submitBtn.disabled = true;
  skipBtn.disabled = true;

  // Avanzar a siguiente placa después de 1.5 segundos
  setTimeout(() => {
    currentIndex++;
    userAnswerInput.disabled = false;
    submitBtn.disabled = false;
    skipBtn.disabled = false;

    if (currentIndex < totalPlates) {
      loadPlate();
    } else {
      showResults();
    }
  }, 1500);
}

/**
 * Salta la placa actual
 */
function skipPlate() {
  userAnswers.push({
    plate: currentIndex + 1,
    userAnswer: "Saltada",
    correctAnswer: plates[currentIndex].answer,
    isCorrect: false
  });

  feedbackDiv.classList.add("hidden");
  currentIndex++;

  if (currentIndex < totalPlates) {
    loadPlate();
  } else {
    showResults();
  }
}

/**
 * Muestra feedback al usuario
 */
function showFeedback(message, type) {
  feedbackDiv.textContent = message;
  feedbackDiv.className = `p-4 rounded-lg text-center font-semibold fade-in`;

  if (type === "success") {
    feedbackDiv.classList.add("bg-green-100", "text-green-800");
  } else if (type === "danger") {
    feedbackDiv.classList.add("bg-red-100", "text-red-800");
  } else {
    feedbackDiv.classList.add("bg-yellow-100", "text-yellow-800");
  }

  feedbackDiv.classList.remove("hidden");
}

/**
 * Muestra los resultados
 */
function showResults() {
  const percentage = Math.round((correctAnswers / totalPlates) * 100);

  // Actualizar HTML de resultados
  const finalScore = document.getElementById("final-score");
  const finalProgress = document.getElementById("final-progress");
  const interpretationText = document.getElementById("interpretation-text");
  const detailsText = document.getElementById("details-text");
  const recommendationsList = document.getElementById("recommendations-list");

  finalScore.textContent = percentage + "%";
  finalProgress.style.width = percentage + "%";

  // Interpretación
  let interpretation = "";
  let recommendations = [];

  if (percentage === 100) {
    interpretation = "✓ <strong>Visión normal de colores</strong><br><p class='text-gray-600 text-sm mt-2'>Tus resultados indican una visión de color normal.</p>";
    recommendations = [
      "Tu visión de color es normal",
      "Disfruta de una percepción completa del espectro de colores"
    ];
  } else if (percentage >= 75) {
    interpretation = "⚠️ <strong>Posible ligera alteración</strong><br><p class='text-gray-600 text-sm mt-2'>Podrías tener una ligera deficiencia en la percepción de colores.</p>";
    recommendations = [
      "Considera una revisión con un oftalmólogo",
      "Los síntomas pueden ser leves o no afectar tu vida diaria",
      "Se recomienda realizar pruebas profesionales más precisas"
    ];
  } else if (percentage >= 40) {
    interpretation = "⚠️ <strong>Indicios moderados de daltonismo</strong><br><p class='text-gray-600 text-sm mt-2'>Tus resultados sugieren una deficiencia moderada en la visión de color.</p>";
    recommendations = [
      "Se recomienda consultar a un oftalmólogo de forma prioritaria",
      "Pueden existir dificultades para distinguir ciertos colores",
      "Explora herramientas y adaptaciones para el daltonismo",
      "Mantén un registro de tus síntomas antes de la consulta"
    ];
  } else {
    interpretation = "🔴 <strong>Fuerte indicio de daltonismo</strong><br><p class='text-gray-600 text-sm mt-2'>Tus resultados sugieren una deficiencia significativa en la visión de color.</p>";
    recommendations = [
      "Consulta a un oftalmólogo profesional de inmediato",
      "Se recomienda un análisis cromático profesional",
      "Informa sobre tus dificultades específicas para distinguir colores",
      "Explora opciones de ayuda visual y tecnologías asistivas",
      "Los test online son orientativos; solo un profesional puede diagnosticar"
    ];
  }

  interpretationText.innerHTML = interpretation;

  // Detalles
  let detailsHTML = `Respondiste correctamente: <strong>${correctAnswers} de ${totalPlates}</strong> placas (${percentage}%)<br><br>`;
  detailsHTML += "<strong>Respuestas detalladas:</strong><br>";
  userAnswers.forEach(answer => {
    const statusIcon = answer.isCorrect ? "✓" : "✗";
    const statusClass = answer.isCorrect ? "text-green-600" : "text-red-600";
    detailsHTML += `<div class="${statusClass}"> ${statusIcon} Placa ${answer.plate}: Tu respuesta: "${answer.userAnswer}" | Correcta: "${answer.correctAnswer}"</div>`;
  });

  detailsText.innerHTML = detailsHTML;

  // Recomendaciones
  recommendationsList.innerHTML = recommendations.map(rec => `<li>• ${rec}</li>`).join("");

  showSection("results");
}

/**
 * Reinicia la prueba
 */
function restartTest() {
  startTest();
}

/**
 * Muestra la sección de información
 */
function showInfo() {
  showSection("info");
}

/**
 * Oculta la sección de información
 */
function hideInfo() {
  showSection("results");
}

/**
 * Controla la visibilidad de secciones
 */
function showSection(section) {
  introSection.classList.add("hidden");
  testSection.classList.add("hidden");
  resultsSection.classList.add("hidden");
  infoSection.classList.add("hidden");

  switch (section) {
    case "test":
      testSection.classList.remove("hidden");
      break;
    case "results":
      resultsSection.classList.remove("hidden");
      break;
    case "info":
      infoSection.classList.remove("hidden");
      break;
    default:
      introSection.classList.remove("hidden");
  }

  // Scroll al top
  mainContent.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Inicialización
console.log("🎨 Detector de Daltonismo cargado correctamente");