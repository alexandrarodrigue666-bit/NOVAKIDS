// Variables globales
let currentStars = 45;
let currentProgress = 65;

// Generar estrellas de fondo
function createStars() {
    const starsContainer = document.getElementById('stars');
    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Posición aleatoria
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Tamaño aleatorio
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Retraso de animación aleatorio
        star.style.animationDelay = Math.random() * 3 + 's';
        
        starsContainer.appendChild(star);
    }
}

// Abrir modal de actividad
function openActivity(activityName) {
    const modal = document.getElementById('modal-' + activityName);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reproducir sonido (opcional)
        playSound('open');
        
        console.log('Abriendo actividad:', activityName);
    }
}

// Cerrar modal de actividad
function closeActivity(activityName) {
    const modal = document.getElementById('modal-' + activityName);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Reproducir sonido (opcional)
        playSound('close');
        
        console.log('Cerrando actividad:', activityName);
    }
}

// Iniciar una actividad específica
function startActivity(activityName, starsToEarn) {
    console.log('Iniciando actividad:', activityName);
    
    // Simular completar actividad después de 2 segundos
    setTimeout(() => {
        completeActivity(activityName, starsToEarn);
    }, 2000);
    
    // Cerrar modal
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = 'auto';
    
    // Mostrar mensaje de inicio
    showMessage(`¡Iniciando ${activityName}! 🚀`, 'info');
}

// Completar una actividad
function completeActivity(activityName, starsEarned) {
    console.log('¡Actividad completada!', activityName);
    
    // Agregar estrellas
    addStars(starsEarned);
    
    // Actualizar progreso
    updateProgress(5);
    
    // Guardar progreso
    saveProgress();
    
    // Mostrar mensaje de felicitación
    showCelebration(activityName, starsEarned);
}

// Agregar estrellas
function addStars(amount) {
    currentStars += amount;
    
    const starsCountElement = document.getElementById('starsCount');
    if (starsCountElement) {
        starsCountElement.textContent = `⭐ ${currentStars} estrellas`;
        
        // Animación de las estrellas
        starsCountElement.style.transform = 'scale(1.3)';
        setTimeout(() => {
            starsCountElement.style.transform = 'scale(1)';
        }, 300);
    }
}

// Actualizar barra de progreso
function updateProgress(increment) {
    currentProgress = Math.min(100, currentProgress + increment);
    
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (progressBar && progressText) {
        progressBar.style.width = currentProgress + '%';
        progressText.textContent = currentProgress + '%';
    }
}

// Mostrar mensaje de celebración
function showCelebration(activityName, starsEarned) {
    // Crear elemento de celebración
    const celebration = document.createElement('div');
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #fbbf24, #f97316);
        padding: 40px;
        border-radius: 30px;
        border: 4px solid white;
        z-index: 2000;
        text-align: center;
        animation: bounceIn 0.5s ease;
    `;
    
    celebration.innerHTML = `
        <div style="font-size: 5rem; margin-bottom: 20px;">🎉</div>
        <h2 style="font-size: 2rem; margin-bottom: 10px; color: white;">¡Felicidades!</h2>
        <p style="font-size: 1.3rem; margin-bottom: 20px; color: white;">Has completado:<br><strong>${activityName}</strong></p>
        <div style="font-size: 3rem; color: white;">⭐ +${starsEarned} estrellas</div>
    `;
    
    document.body.appendChild(celebration);
    
    // Crear confeti
    createConfetti();
    
    // Reproducir sonido de victoria
    playSound('victory');
    
    // Remover después de 3 segundos
    setTimeout(() => {
        celebration.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(celebration);
        }, 500);
    }, 3000);
}

// Crear efecto de confeti
function createConfetti() {
    const colors = ['#fbbf24', '#ec4899', '#a78bfa', '#10b981', '#3b82f6'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: 50%;
            left: 50%;
            opacity: 1;
            z-index: 1999;
            pointer-events: none;
        `;
        
        document.body.appendChild(confetti);
        
        // Animar confeti
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 300 + 200;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = 0, y = 0;
        const gravity = 500;
        const startTime = Date.now();
        
        function animateConfetti() {
            const elapsed = (Date.now() - startTime) / 1000;
            x = vx * elapsed;
            y = vy * elapsed + 0.5 * gravity * elapsed * elapsed;
            
            confetti.style.transform = `translate(${x}px, ${y}px) rotate(${elapsed * 360}deg)`;
            confetti.style.opacity = Math.max(0, 1 - elapsed / 2);
            
            if (elapsed < 2) {
                requestAnimationFrame(animateConfetti);
            } else {
                document.body.removeChild(confetti);
            }
        }
        
        animateConfetti();
    }
}

// Mostrar mensaje temporal
function showMessage(text, type = 'info') {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'info' ? '#3b82f6' : '#10b981'};
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        font-size: 1.1rem;
        font-weight: bold;
        z-index: 2000;
        animation: slideInRight 0.5s ease;
    `;
    
    message.textContent = text;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 500);
    }, 3000);
}

// Reproducir sonidos (opcional - requiere archivos de audio)
function playSound(soundType) {
    // Aquí puedes agregar la lógica para reproducir sonidos
    console.log('Reproduciendo sonido:', soundType);
    
    // Ejemplo con Web Audio API (sonido simple)
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (soundType === 'open') {
            oscillator.frequency.value = 523.25; // Do
            gainNode.gain.value = 0.3;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
        } else if (soundType === 'close') {
            oscillator.frequency.value = 392; // Sol
            gainNode.gain.value = 0.3;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
        } else if (soundType === 'victory') {
            // Melodía de victoria
            const notes = [523.25, 587.33, 659.25, 783.99];
            notes.forEach((freq, index) => {
                setTimeout(() => {
                    const osc = audioContext.createOscillator();
                    const gain = audioContext.createGain();
                    osc.connect(gain);
                    gain.connect(audioContext.destination);
                    osc.frequency.value = freq;
                    gain.gain.value = 0.3;
                    osc.start();
                    osc.stop(audioContext.currentTime + 0.2);
                }, index * 150);
            });
        }
    } catch (e) {
        console.log('Audio no disponible');
    }
}

// Guardar progreso en localStorage
function saveProgress() {
    const progress = {
        stars: currentStars,
        percentage: currentProgress,
        lastUpdate: new Date().toISOString()
    };
    
    localStorage.setItem('studentProgress', JSON.stringify(progress));
    console.log('Progreso guardado:', progress);
}

// Cargar progreso desde localStorage
function loadProgress() {
    const savedProgress = localStorage.getItem('studentProgress');
    
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        currentStars = progress.stars || 45;
        currentProgress = progress.percentage || 65;
        
        // Actualizar UI
        document.getElementById('starsCount').textContent = `⭐ ${currentStars} estrellas`;
        document.getElementById('progressBar').style.width = currentProgress + '%';
        document.getElementById('progressText').textContent = currentProgress + '%';
        
        console.log('Progreso cargado:', progress);
    }
}

// Resetear progreso (para desarrollo/testing)
function resetProgress() {
    currentStars = 0;
    currentProgress = 0;
    
    document.getElementById('starsCount').textContent = '⭐ 0 estrellas';
    document.getElementById('progressBar').style.width = '0%';
    document.getElementById('progressText').textContent = '0%';
    
    localStorage.removeItem('studentProgress');
    console.log('Progreso reseteado');
}

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// Animación de entrada para planetas
function animatePlanetsOnLoad() {
    const planets = document.querySelectorAll('.planet-card');
    
    planets.forEach((planet, index) => {
        planet.style.opacity = '0';
        planet.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            planet.style.transition = 'all 0.5s ease';
            planet.style.opacity = '1';
            planet.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Efecto de hover con sonido en planetas
function setupPlanetHoverEffects() {
    const planets = document.querySelectorAll('.planet-card');
    
    planets.forEach(planet => {
        planet.addEventListener('mouseenter', function() {
            // Efecto visual adicional
            this.style.boxShadow = '0 25px 60px rgba(167, 139, 250, 0.6)';
        });
        
        planet.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.5)';
        });
    });
}

// Agregar estilos de animación dinámicamente
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounceIn {
            0% {
                transform: translate(-50%, -50%) scale(0.3);
                opacity: 0;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.05);
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Sistema de logros
function checkAchievements() {
    const achievements = [
        { name: '¡Primera estrella!', stars: 1, unlocked: false },
        { name: 'Explorador espacial', stars: 25, unlocked: false },
        { name: 'Maestro del espacio', stars: 50, unlocked: false },
        { name: 'Leyenda cósmica', stars: 100, unlocked: false }
    ];
    
    achievements.forEach(achievement => {
        if (currentStars >= achievement.stars && !achievement.unlocked) {
            achievement.unlocked = true;
            showMessage(`🏆 Logro desbloqueado: ${achievement.name}`, 'success');
        }
    });
}

// Auto-guardar progreso cada minuto
function setupAutoSave() {
    setInterval(() => {
        saveProgress();
        console.log('Auto-guardado realizado');
    }, 60000); // Cada minuto
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('¡Aventura Espacial iniciada! 🚀');
    
    // Crear estrellas de fondo
    createStars();
    
    // Cargar progreso guardado
    loadProgress();
    
    // Agregar estilos de animación
    addAnimationStyles();
    
    // Animar entrada de planetas
    animatePlanetsOnLoad();
    
    // Configurar efectos de hover
    setupPlanetHoverEffects();
    
    // Configurar auto-guardado
    setupAutoSave();
    
    // Verificar logros
    checkAchievements();
    
    // Mensaje de bienvenida
    setTimeout(() => {
        showMessage('¡Bienvenido, pequeño astronauta! 🌟', 'info');
    }, 1000);
});

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error capturado:', e.error);
});

// Prevenir pérdida de datos al cerrar
window.addEventListener('beforeunload', function(e) {
    saveProgress();
});

// Exportar funciones para uso global
window.openActivity = openActivity;
window.closeActivity = closeActivity;
window.startActivity = startActivity;
window.resetProgress = resetProgress;