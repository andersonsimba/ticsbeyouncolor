/* -------------------------
   CONFIGURACIONES / DATOS
   ------------------------- */

// Asegúrate de que las rutas coincidan con tus archivos en /img/
const images = [
    "img/ishihara_2.jpeg",
    "img/ishihara_5.jpeg",
    "img/ishihara_6.jpeg",
    "img/ishihara_7.jpeg",
    "img/ishihara_8.jpeg",
    "img/ishihara_10.jpeg",
    "img/ishihara_26.jpeg",
    "img/ishihara_42.jpeg",
    "img/ishihara_69.jpeg",
    "img/ishihara_74.jpeg"
];

// Respuestas correctas (ajusta a tus láminas)
const correctAnswers = [2, 5, 6, 7, 8, 10, 26, 42, 69, 74];

const ADMIN_PASSWORD = "admin123"; // contraseña fija

/* -------------------------
   ELEMENTOS DEL DOM
   ------------------------- */

const startScreen = document.getElementById("start-screen");
const testScreen = document.getElementById("test-screen");
const endScreen = document.getElementById("end-screen");
const statsScreen = document.getElementById("stats-screen");
const adminScreen = document.getElementById("admin-screen");

const usernameInput = document.getElementById("username-input");
const startBtn = document.getElementById("start-btn");
const adminOpenBtn = document.getElementById("admin-open-btn");

const imageElem = document.getElementById("test-image");
const userInput = document.getElementById("user-answer");
const nextBtn = document.getElementById("next-btn");

const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

const finalScoreElem = document.getElementById("final-score");
const finalMessageElem = document.getElementById("final-message");
const saveBtn = document.getElementById("save-btn");
const viewStatsBtn = document.getElementById("view-stats-btn");
const exportPdfResultBtn = document.getElementById("export-pdf-result");

const statsInfoName = document.getElementById("stats-info-name");
const statsInfoLatest = document.getElementById("stats-info-latest");
const statsInfoTotal = document.getElementById("stats-info-total");
const historyTableBody = document.querySelector("#history-table tbody");
const lineChartCanvas = document.getElementById("line-chart");

const backHomeBtn = document.getElementById("back-home-btn");
const exportPdfStatsBtn = document.getElementById("export-pdf-stats");
const clearStorageBtn = document.getElementById("clear-storage");

const adminPassInput = document.getElementById("admin-pass");
const adminLoginBtn = document.getElementById("admin-login-btn");
const adminCancelBtn = document.getElementById("admin-cancel-btn");
const adminPanel = document.getElementById("admin-panel");
const adminExportCsvBtn = document.getElementById("admin-export-csv");
const adminLogoutBtn = document.getElementById("admin-logout");

/* -------------------------
   VARIABLES DE CONTROL
   ------------------------- */

let index = 0;
let score = 0;
let startTime = 0;
let endTime = 0;
let currentUser = ""; // nombre del usuario
let lastSavedTimestamp = null; // para evitar duplicados

/* -------------------------
   UTILIDADES localStorage
   ------------------------- */

const STORAGE_KEY = "daltonismo_results";

function loadResultsFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch (e) {
        console.error("Error parseando storage:", e);
        return [];
    }
}

function saveResultToStorage(entry) {
    const arr = loadResultsFromStorage();

    // Evitar duplicados: si ya existe un registro con mismo name + score + time + fecha cercana, no re-grabar
    const exists = arr.some(r => (
        r.name === entry.name &&
        r.score === entry.score &&
        r.time_seconds === entry.time_seconds &&
        Math.abs(new Date(r.date).getTime() - new Date(entry.date).getTime()) < 2000 // 2s margen
    ));
    if (exists) return false;

    arr.push(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    lastSavedTimestamp = entry.date;
    return true;
}

/* -------------------------
   FLUJO: INICIO -> TEST -> FIN
   ------------------------- */

startBtn.addEventListener("click", () => {
    const name = usernameInput.value.trim();
    if (!name) {
        alert("Por favor ingresa tu nombre antes de iniciar.");
        return;
    }
    currentUser = name;
    startTest();
});

adminOpenBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    adminScreen.classList.remove("hidden");
});

function startTest() {
    // configurar variables
    index = 0;
    score = 0;
    startTime = Date.now();

    // mostrar pantalla
    startScreen.classList.add("hidden");
    testScreen.classList.remove("hidden");
    testScreen.classList.add("fade-in");
    userInput.value = "";
    loadTest();
}

function loadTest() {
    // animación de imagen (si quieres mantener animaciones)
    imageElem.classList.remove("image-zoom");
    void imageElem.offsetWidth;
    imageElem.classList.add("image-zoom");

    imageElem.src = images[index];
    updateProgress();
}

function updateProgress() {
    const percent = Math.round((index / images.length) * 100);
    progressBar.style.width = percent + "%";
    progressText.textContent = percent + "% completado";
}

nextBtn.addEventListener("click", () => {
    const val = parseInt(userInput.value);
    if (!isNaN(val) && val === correctAnswers[index]) score++;

    index++;
    userInput.value = "";

    if (index < images.length) {
        loadTest();
    } else {
        finishTest();
    }
});

function finishTest() {
    endTime = Date.now();
    const totalSeconds = Math.round((endTime - startTime) / 1000);

    testScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");
    endScreen.classList.add("fade-in");

    finalScoreElem.textContent = `Aciertos: ${score} / ${images.length}`;
    // Mensaje según resultado
    const percentage = Math.round((score / images.length) * 100);
    let msg = "";
    if (percentage >= 80) msg = "Visión normal del color.";
    else if (percentage >= 50) msg = "Posible daltonismo leve.";
    else msg = "Probable daltonismo rojo–verde.";
    finalMessageElem.textContent = msg + ` (${percentage}% )`;

    // Guardar resultado en memoria temporal hasta que usuario pulse "Guardar"
    const entry = {
        name: currentUser,
        score,
        total: images.length,
        percent: percentage,
        time_seconds: totalSeconds,
        date: new Date().toISOString()
    };

    // Guardar botón (solo guarda una vez)
    saveBtn.onclick = () => {
        const ok = saveResultToStorage(entry);
        if (ok) alert("Resultado guardado localmente.");
        else alert("Este resultado ya fue guardado.");
    };

    // view stats: guarda si no guardado y muestra para usuario actual
    viewStatsBtn.onclick = () => {
        // intentar guardar (si ya existe, saveResultToStorage lo detecta)
        saveResultToStorage(entry);
        showStatsForUser(currentUser);
    };

    // Exportar PDF del resultado individual
    exportPdfResultBtn.onclick = () => {
        // Exportamos el contenido del end-screen (sin botones extra)
        exportElementToPDF(endScreen, `${sanitizeFilename(currentUser)}_resultado_${new Date().toISOString()}.pdf`);
    };
}

/* -------------------------
   PANEL DE CONTROL / ESTADÍSTICAS
   ------------------------- */

function showStatsForUser(nameFilter = null) {
    endScreen.classList.add("hidden");
    adminScreen.classList.add("hidden");
    startScreen.classList.add("hidden");
    statsScreen.classList.remove("hidden");
    statsScreen.classList.add("fade-in");

    // Cargar resultados
    const all = loadResultsFromStorage();

    // Filtrar por usuario (si se pide)
    const userResults = nameFilter ? all.filter(r => r.name === nameFilter) : all.slice();

    // Resumen
    statsInfoName.textContent = nameFilter ? `Usuario: ${nameFilter}` : "Usuario: Todos";
    if (userResults.length > 0) {
        const latest = userResults[userResults.length - 1];
        statsInfoLatest.textContent = `Último: ${latest.score}/${latest.total} (${latest.percent}%) - ${new Date(latest.date).toLocaleString()}`;
    } else {
        statsInfoLatest.textContent = "Sin resultados para mostrar.";
    }
    statsInfoTotal.textContent = `Total registros guardados: ${all.length}`;

    // Llenar tabla
    historyTableBody.innerHTML = "";
    const rows = nameFilter ? userResults : all;
    rows.forEach(r => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${escapeHtml(r.name)}</td><td>${r.score}/${r.total}</td><td>${r.percent}%</td><td>${r.time_seconds}</td><td>${new Date(r.date).toLocaleString()}</td>`;
        historyTableBody.appendChild(tr);
    });

    // Dibujar gráfico de líneas (por usuario si se pide, sino por todos agrupados por fecha)
    drawLineChart(rows);
}

// Dibuja un gráfico de líneas simple en canvas usando los registros ordenados por fecha
function drawLineChart(dataRows) {
    const canvas = lineChartCanvas;
    const ctx = canvas.getContext("2d");
    // limpiar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!dataRows || dataRows.length === 0) {
        // texto indicativo
        ctx.fillStyle = "#555";
        ctx.font = "16px Arial";
        ctx.fillText("No hay datos para graficar.", 20, 30);
        return;
    }

    // ordenar por fecha
    const rows = dataRows.slice().sort((a,b) => new Date(a.date) - new Date(b.date));

    // preparar datos
    const labels = rows.map(r => new Date(r.date).toLocaleString());
    const values = rows.map(r => r.percent);

    const padding = 50;
    const w = canvas.width;
    const h = canvas.height;
    const chartW = w - padding * 2;
    const chartH = h - padding * 2;

    // Escala vertical: 0..100
    const maxVal = 100;
    function mapX(i) {
        if (values.length === 1) return padding + chartW / 2;
        return padding + (chartW * i) / (values.length - 1);
    }
    function mapY(v) {
        return padding + chartH - (v / maxVal) * chartH;
    }

    // Fondo y ejes
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1;
    ctx.beginPath();
    // eje Y
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding + chartH);
    // eje X
    ctx.moveTo(padding, padding + chartH);
    ctx.lineTo(padding + chartW, padding + chartH);
    ctx.stroke();

    // líneas horizontales y marcas
    ctx.fillStyle = "#888";
    ctx.font = "12px Arial";
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartH * i) / 5;
        const val = Math.round(((5 - i) * maxVal) / 5);
        // línea tenue
        ctx.strokeStyle = "#f6f6f6";
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(padding + chartW, y);
        ctx.stroke();
        // etiqueta
        ctx.fillStyle = "#666";
        ctx.fillText(val + "%", 8, y + 4);
    }

    // Dibujar la línea de datos
    ctx.beginPath();
    for (let i = 0; i < values.length; i++) {
        const x = mapX(i);
        const y = mapY(values[i]);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "#4CAF50";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Dibujar puntos
    for (let i = 0; i < values.length; i++) {
        const x = mapX(i);
        const y = mapY(values[i]);
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#2e7d32";
        ctx.fill();
        // etiqueta pequeña
        ctx.fillStyle = "#222";
        ctx.font = "11px Arial";
        ctx.fillText(values[i] + "%", x - 14, y - 10);
    }

    // Etiquetas X (fechas cada tick)
    ctx.fillStyle = "#333";
    ctx.font = "12px Arial";
    const step = Math.ceil(labels.length / 6);
    for (let i = 0; i < labels.length; i += step) {
        const x = mapX(i);
        // acorta la etiqueta si es muy larga
        const txt = labels[i].split(",")[0];
        ctx.fillText(txt, x - 30, padding + chartH + 18);
    }
}

/* -------------------------
   EXPORTAR A PDF (html2canvas + jsPDF)
   ------------------------- */

async function exportElementToPDF(element, filename = "export.pdf") {
    try {
        // ocultar botones para generar una captura limpia
        const hiddenBtns = element.querySelectorAll("button");
        hiddenBtns.forEach(b => b.classList.add("hidden-temp"));

        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        // restaurar botones
        hiddenBtns.forEach(b => b.classList.remove("hidden-temp"));

        const { jsPDF } = window.jspdf;
        // ajustar tamaño de pdf a canvas (en px)
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save(filename);
    } catch (err) {
        console.error("Error exportando a PDF:", err);
        alert("No se pudo exportar a PDF. Revisa la consola para más detalles.");
    }
}

exportPdfStatsBtn.addEventListener("click", () => {
    exportElementToPDF(statsScreen, `panel_estadisticas_${new Date().toISOString()}.pdf`);
});

/* -------------------------
   BOTONES Y NAVEGACIÓN
   ------------------------- */

backHomeBtn.addEventListener("click", () => {
    statsScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
});

clearStorageBtn.addEventListener("click", () => {
    if (!confirm("Esta acción borrará todos los resultados guardados. ¿Continuar?")) return;
    localStorage.removeItem(STORAGE_KEY);
    alert("Datos borrados.");
    // refrescar vista actual
    showStatsForUser();
});

/* -------------------------
   ADMIN: login / export CSV
   ------------------------- */

adminLoginBtn.addEventListener("click", () => {
    const pass = adminPassInput.value || "";
    if (pass === ADMIN_PASSWORD) {

        // Ocultar pantalla de ingreso
        adminScreen.classList.add("hidden");

        // Mostrar panel admin real
        adminPanel.classList.remove("hidden");

        adminPassInput.value = "";

    } else {
        alert("Contraseña admin incorrecta.");
    }
});

adminCancelBtn.addEventListener("click", () => {
    adminScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
});

adminExportCsvBtn.addEventListener("click", () => {
    const arr = loadResultsFromStorage();
    if (!arr || arr.length === 0) {
        alert("No hay datos para exportar.");
        return;
    }
    // construir CSV
    const headers = ["name","score","total","percent","time_seconds","date"];
    const rows = arr.map(r => headers.map(h => JSON.stringify(r[h] || "")).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    // descargar
    const blob = new Blob([csv], {type: "text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `daltonismo_export_${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
});

adminLogoutBtn.addEventListener("click", () => {
    adminPanel.classList.add("hidden");
    adminScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
});

/* -------------------------
   UTILS
   ------------------------- */

function escapeHtml(text) {
    if (!text) return "";
    return text.replace(/[&<>"']/g, function(m) {
        return ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" })[m];
    });
}

function sanitizeFilename(name) {
    return String(name).replace(/[^a-z0-9_\-\.]/gi, '_').toLowerCase();
}

/* -------------------------
   INICIALIZACIÓN: botones de vista
   ------------------------- */

// mostrar panel completo (todos los registros) si el usuario pulsa "Ver Panel de Control" desde pantalla final
document.getElementById("view-stats-btn").addEventListener("click", () => {
    showStatsForUser(); // sin filtro -> todos
});

// botón export resultado individual (ya atado en finishTest, pero por seguridad añadimos listener seguro)
exportPdfResultBtn.addEventListener("click", () => {
    exportElementToPDF(endScreen, `${sanitizeFilename(currentUser)}_resultado_${new Date().toISOString()}.pdf`);
});
