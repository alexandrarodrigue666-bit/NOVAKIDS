// Cambiar entre pestañas
function showTab(tabName) {
    // Ocultar todos los contenidos
    const allContents = document.querySelectorAll('.tab-content');
    allContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remover clase active de todos los botones
    const allButtons = document.querySelectorAll('.tab-btn');
    allButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Mostrar el contenido seleccionado
    const selectedContent = document.getElementById(tabName);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
    
    // Agregar clase active al botón seleccionado
    const selectedButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
    
    // Guardar la pestaña activa en localStorage
    localStorage.setItem('activeTab', tabName);
}

// Expandir/colapsar semanas del cronograma
function toggleWeek(weekId) {
    const weekContent = document.getElementById(weekId);
    const arrow = document.getElementById('arrow-' + weekId);
    
    if (weekContent && arrow) {
        // Toggle la clase active
        weekContent.classList.toggle('active');
        arrow.classList.toggle('rotate');
        
        // Guardar estado en localStorage
        const isActive = weekContent.classList.contains('active');
        localStorage.setItem(weekId, isActive);
    }
}

// Cargar estado guardado al iniciar
function loadSavedState() {
    // Cargar pestaña activa
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
        showTab(savedTab);
    }
    
    // Cargar estado de semanas expandidas
    const weeks = ['week1', 'week2', 'week3', 'week4'];
    weeks.forEach(weekId => {
        const savedState = localStorage.getItem(weekId);
        if (savedState === 'true') {
            const weekContent = document.getElementById(weekId);
            const arrow = document.getElementById('arrow-' + weekId);
            if (weekContent && arrow) {
                weekContent.classList.add('active');
                arrow.classList.add('rotate');
            }
        }
    });
}

// Animación de barras de progreso
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 100);
    });
}

// Observador para animar cuando el elemento es visible
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    const progressSection = document.querySelector('.progress-section');
    if (progressSection) {
        observer.observe(progressSection);
    }
}

// Efecto de hover en tarjetas de recursos
function setupResourceCards() {
    const resourceCards = document.querySelectorAll('.resource-card');
    
    resourceCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.resource-title').textContent;
            alert(`Descargando: ${title}`);
            // Aquí puedes agregar la lógica real de descarga
        });
    });
}

// Efecto en botones de actividad
function setupActivityButtons() {
    const playButtons = document.querySelectorAll('.play-button');
    
    playButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const activityName = button.closest('.activity-item').querySelector('.activity-name').textContent;
            console.log(`Iniciando actividad: ${activityName}`);
            
            // Efecto visual
            button.style.transform = 'scale(0.9)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
            
            // Aquí puedes agregar la lógica para abrir la actividad
            alert(`Iniciando: ${activityName}`);
        });
    });
}

// Botón del kit completo
function setupKitButton() {
    const kitButton = document.querySelector('.kit-button');
    
    if (kitButton) {
        kitButton.addEventListener('click', () => {
            console.log('Descargando Kit Completo...');
            alert('¡Descargando Kit Completo! Por favor espera...');
            // Aquí puedes agregar la lógica real de descarga del ZIP
        });
    }
}

// Función para exportar datos de seguimiento
function exportStudentData() {
    const students = [
        { name: 'María G.', progress: 85 },
        { name: 'Carlos M.', progress: 72 },
        { name: 'Ana S.', progress: 95 },
        { name: 'Pedro L.', progress: 68 },
        { name: 'Lucía R.', progress: 88 }
    ];
    
    console.log('Datos de estudiantes:', students);
    // Aquí puedes agregar lógica para exportar a CSV, PDF, etc.
    return students;
}

// Función para simular actualización de estadísticas
function updateStats() {
    const stats = {
        activeStudents: '23/25',
        completedActivities: '78%',
        starsEarned: 156
    };
    
    console.log('Estadísticas actuales:', stats);
    return stats;
}

// Animación suave al hacer scroll
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Tooltips informativos (opcional)
function setupTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltipText = element.getAttribute('data-tooltip');
            // Crear y mostrar tooltip
            console.log('Tooltip:', tooltipText);
        });
    });
}

// Búsqueda en cronograma (función adicional)
function setupSearch() {
    // Esta función puede ser expandida para agregar una barra de búsqueda
    console.log('Función de búsqueda lista para implementar');
}

// Notificaciones para el profesor
function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    // Aquí puedes agregar un sistema de notificaciones visual
}

// Validar y guardar notas del profesor
function saveTeacherNotes(weekId, notes) {
    const key = `teacher_notes_${weekId}`;
    localStorage.setItem(key, notes);
    showNotification('Notas guardadas correctamente', 'success');
}

// Cargar notas guardadas
function loadTeacherNotes(weekId) {
    const key = `teacher_notes_${weekId}`;
    return localStorage.getItem(key) || '';
}

// Modo oscuro/claro (opcional)
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
}

// Cargar tema guardado
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
}

// Imprimir cronograma
function printSchedule() {
    window.print();
}

// Compartir progreso
function shareProgress() {
    if (navigator.share) {
        navigator.share({
            title: 'Progreso de la Clase',
            text: 'Mira el progreso de nuestros estudiantes en Aventura Espacial',
            url: window.location.href
        }).then(() => {
            showNotification('Compartido exitosamente', 'success');
        }).catch((error) => {
            console.error('Error al compartir:', error);
        });
    } else {
        showNotification('Tu navegador no soporta compartir', 'warning');
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portal del Docente iniciado 🚀');
    
    // Cargar estado guardado
    loadSavedState();
    
    // Cargar tema
    loadTheme();
    
    // Configurar observadores y listeners
    setupIntersectionObserver();
    setupResourceCards();
    setupActivityButtons();
    setupKitButton();
    smoothScroll();
    setupTooltips();
    
    // Mostrar notificación de bienvenida
    setTimeout(() => {
        showNotification('¡Bienvenido al Portal del Docente!', 'info');
    }, 500);
    
    // Actualizar estadísticas (simular actualización periódica)
    setInterval(() => {
        updateStats();
    }, 60000); // Cada minuto
});

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error capturado:', e.error);
    showNotification('Ha ocurrido un error. Por favor recarga la página.', 'error');
});

// Prevenir pérdida de datos al cerrar
window.addEventListener('beforeunload', function(e) {
    // Guardar cualquier dato pendiente
    console.log('Guardando estado antes de cerrar...');
});

// Exportar funciones para uso global
window.showTab = showTab;
window.toggleWeek = toggleWeek;
window.exportStudentData = exportStudentData;
window.printSchedule = printSchedule;
window.shareProgress = shareProgress;
window.toggleTheme = toggleTheme;