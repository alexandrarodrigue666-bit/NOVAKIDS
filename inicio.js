// =========================================================
// 1. GESTIÓN DEL CONTEXTO DE AUDIO Y ACTIVACIÓN GLOBAL
// =========================================================

// Variable global para el contexto de audio
let audioContext = null;

/**
 * Inicializa y devuelve el contexto de audio.
 * Intenta reanudarlo si está suspendido.
 * @returns {AudioContext | null} El contexto de audio o null si no está disponible.
 */
function getAudioContext() {
    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log("AudioContext creado. Estado inicial:", audioContext.state);
        } catch (e) {
            console.error('Web Audio API no está disponible.', e);
            return null;
        }
    }
    return audioContext;
}

/**
 * Reproduce un sonido simple basado en el tipo de evento.
 * No genera errores si el AudioContext falla.
 * @param {string} soundType - Tipo de sonido ('open', 'close', 'victory', 'click').
 */
function playSound(soundType) {
    const ctx = getAudioContext();
    if (!ctx || ctx.state === 'suspended') {
        // No intentar reproducir si el contexto no ha sido activado por el usuario.
        return; 
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Configuración de volumen
    gainNode.gain.value = 0.15; // Volumen bajo para ser sutil

    if (soundType === 'open' || soundType === 'click') {
        oscillator.frequency.value = 440; // La
        oscillator.type = 'sine';
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.05);
    } else if (soundType === 'close') {
        oscillator.frequency.value = 392; // Sol
        oscillator.type = 'square';
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.05);
    } else if (soundType === 'victory') {
        // Melodía de confirmación más sutil
        const notes = [659.25, 783.99]; // Mi, Sol
        notes.forEach((freq, index) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = freq;
            gain.gain.value = 0.2;
            osc.start(ctx.currentTime + (index * 0.1));
            osc.stop(ctx.currentTime + (index * 0.1) + 0.08);
        });
    }
}

/**
 * Listener global para asegurar que el AudioContext se reanude
 * con la primera interacción del usuario.
 */
document.addEventListener('click', function activateAudio() {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
        ctx.resume().then(() => {
            console.log('AudioContext reanudado con la interacción del usuario.');
        });
    }
    // Añadimos un listener de clics a todo el documento para la retroalimentación auditiva
    document.removeEventListener('click', activateAudio); // Desactivar después del primer uso

    // 🔑 CLAVE: Agregar un listener para retroalimentación auditiva en cada clic
    document.body.addEventListener('click', (e) => {
        // Evitar sonidos en interacciones muy específicas (como el panel de accesibilidad, que ya tiene sonido)
        if (!e.target.closest('.accessibility-panel-wrapper') && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
             playSound('click');
        }
    });

}, { once: true });


// =========================================================
// 2. MÓDULO DE CARRUSELES
// =========================================================
(function() {
    const carruselIndices = {
        noticias: 0,
        profesores: 0,
        padres: 0,
        comunidad: 0,
        actividades: 0
    };

    /**
     * Función para cambiar la diapositiva del carrusel especificado.
     * @param {string} idPrefix - El prefijo del ID del carrusel.
     * @param {number} direccion - La dirección del movimiento (+1 o -1).
     */
    window.cambiarSlide = function(idPrefix, direccion) {
        const carruselElement = document.getElementById(`carrusel-${idPrefix}`);
        if (!carruselElement) return;

        const slides = carruselElement.querySelectorAll('.slide-content');
        if (slides.length === 0) return;

        let nuevoIndice = carruselIndices[idPrefix] + direccion;

        // Bucle infinito (wraparound)
        if (nuevoIndice < 0) {
            nuevoIndice = slides.length - 1;
        } else if (nuevoIndice >= slides.length) {
            nuevoIndice = 0;
        }

        carruselIndices[idPrefix] = nuevoIndice;

        // Aplicar el desplazamiento
        const desplazamiento = -nuevoIndice * 100;
        carruselElement.style.transform = `translateX(${desplazamiento}%)`;
    }

    // Inicialización: asegurar que al cargar la página se muestre el primer slide
    window.addEventListener('load', function() {
        Object.keys(carruselIndices).forEach(key => {
            // Llama a la función con dirección 0 para inicializar la posición sin mover
            cambiarSlide(key, 0); 
        });
    });
})();

// =========================================================
// 3. MÓDULO DE ACCESIBILIDAD Y AJUSTES VISUALES
// =========================================================
(function() {
    const settings = {
        epilepsy: false,
        visual: false,
        cognitive: false,
        adhd: false
    };

    const visualSettings = {
        contrast: false,
        grayscale: false,
        invert: false,
        links: false,
        textSize: 100,
        lineHeight: 1.5,
        saturation: 100
    };

    const $ = id => document.getElementById(id); // Helper para simplificar

    // Inicialización del panel de accesibilidad
    window.addEventListener('DOMContentLoaded', function() {
        const panel = $('accessibilityPanel');
        const btn = $('accessibilityBtn');
        
        if (panel) panel.style.display = 'none';

        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openPanel();
            });
        }

        if (panel) {
            // Cerrar al hacer clic fuera del panel (en el overlay)
            panel.addEventListener('click', function(e) {
                if (e.target === this) {
                    closePanel();
                }
            });
        }
    });

    function disableAnimationsGlobally(disable) {
        let style = $('epilepsy-styles');
        
        if (disable) {
            if (!style) {
                style = document.createElement('style');
                style.id = 'epilepsy-styles';
                document.head.appendChild(style);
            }
            // Regla de estilo que elimina animaciones
            style.textContent = `
                * {
                    animation-duration: 0.001ms !important;
                    transition-duration: 0.001ms !important;
                    animation-delay: 0s !important;
                    transition-delay: 0s !important;
                    animation-name: none !important;
                }
                #accessibilityPanel, #accessibilityBtn, #accessibilityPanel * {
                    animation: none !important;
                    transition: none !important;
                }
            `;
        } else if (style) {
            style.remove();
        }
    }

    // --- Funciones de Apertura y Cierre ---
    function openPanel() {
        const panel = $('accessibilityPanel');
        if (panel) {
            panel.style.display = 'flex';
            $('accessibilityBtn').classList.add('is-open'); // Clase para cambiar el ícono
            playSound('open');
        }
    }

    function closePanel() {
        const panel = $('accessibilityPanel');
        if (panel) {
            panel.style.display = 'none';
            $('accessibilityBtn').classList.remove('is-open');
            playSound('close');
        }
    }

    // --- Funciones de Toggle (Modos) ---
    window.toggleOption = function(type) {
        Object.keys(settings).forEach(function(key) {
            if (key !== type) {
                settings[key] = false;
                const toggle = $(key + 'Toggle');
                if (toggle) toggle.classList.remove('active');
            }
        });

        settings[type] = !settings[type];
        const toggle = $(type + 'Toggle');
        
        if (toggle) {
            toggle.classList.toggle('active', settings[type]);
        }
        
        if (type === 'epilepsy') {
            disableAnimationsGlobally(settings.epilepsy);
        }

        applySettings();
    }

    window.toggleVisualOption = function(type) {
        visualSettings[type] = !visualSettings[type];
        const toggle = $(type + 'Toggle');
        
        if (toggle) {
            toggle.classList.toggle('active', visualSettings[type]);
        }

        applyVisualSettings();
    }
    
    // --- Funciones de Sliders ---

    window.adjustTextSize = (change) => {
        visualSettings.textSize = Math.max(100, Math.min(200, visualSettings.textSize + change));
        $('textSizeSlider').value = visualSettings.textSize;
        applyVisualSettings();
    };

    window.setTextSize = (value) => {
        visualSettings.textSize = parseInt(value);
        applyVisualSettings();
    };

    window.adjustLineHeight = (change) => {
        visualSettings.lineHeight = Math.max(1, Math.min(2.5, parseFloat(visualSettings.lineHeight) + change));
        $('lineHeightSlider').value = visualSettings.lineHeight;
        applyVisualSettings();
    };

    window.setLineHeight = (value) => {
        visualSettings.lineHeight = parseFloat(value);
        applyVisualSettings();
    };

    window.adjustSaturation = (change) => {
        visualSettings.saturation = Math.max(0, Math.min(200, visualSettings.saturation + change));
        $('saturationSlider').value = visualSettings.saturation;
        applyVisualSettings();
    };

    window.setSaturation = (value) => {
        visualSettings.saturation = parseInt(value);
        applyVisualSettings();
    };


    // --- Aplicación de Clases y Filtros ---
    function applySettings() {
        const bodyClassList = document.body.classList;
        bodyClassList.remove('epilepsy-safe', 'visual-impaired', 'cognitive-disability', 'adhd-friendly');

        if (settings.epilepsy) bodyClassList.add('epilepsy-safe');
        if (settings.visual) bodyClassList.add('visual-impaired');
        if (settings.cognitive) bodyClassList.add('cognitive-disability');
        if (settings.adhd) bodyClassList.add('adhd-friendly');
    }

    function applyVisualSettings() {
        const bodyClassList = document.body.classList;
        bodyClassList.remove('high-contrast', 'grayscale-mode', 'invert-colors', 'highlight-links');

        if (visualSettings.contrast) bodyClassList.add('high-contrast');
        if (visualSettings.grayscale) bodyClassList.add('grayscale-mode');
        if (visualSettings.invert) bodyClassList.add('invert-colors');
        if (visualSettings.links) bodyClassList.add('highlight-links');
        
        // Aplicar estilos directos
        document.body.style.fontSize = visualSettings.textSize + '%';
        document.body.style.lineHeight = visualSettings.lineHeight;

        // Combinar filtros CSS
        let filters = [];
        if (visualSettings.saturation !== 100) {
            filters.push('saturate(' + visualSettings.saturation + '%)');
        }
        // Nota: Los modos contrast y grayscale/invert se manejan a través de filtros/clases
        if (!visualSettings.invert) { // Invertir y grayscale/contrast pueden tener interacciones raras
            if (visualSettings.grayscale) {
                filters.push('grayscale(100%)');
            }
            if (visualSettings.contrast) {
                filters.push('contrast(1.5)');
            }
        }
        
        // El filtro invert(1) hue-rotate(180deg) se aplica via CSS Class si es necesario para evitar conflicto con los otros filtros
        // Para simplificar, si invert está activo, no aplicamos los otros filtros al body (ya que el invert es muy dominante)
        if (visualSettings.invert) {
            filters.push('invert(1) hue-rotate(180deg)');
        }
        
        document.body.style.filter = filters.length > 0 ? filters.join(' ') : 'none';
    }


    // --- Funciones de Acción ---
    window.resetSettings = function() {
        Object.keys(settings).forEach(key => {
            settings[key] = false;
            const toggle = $(key + 'Toggle');
            if (toggle) toggle.classList.remove('active');
        });

        Object.keys(visualSettings).forEach(key => {
            if (typeof visualSettings[key] === 'boolean') {
                visualSettings[key] = false;
                const toggle = $(key + 'Toggle');
                if (toggle) toggle.classList.remove('active');
            }
        });

        visualSettings.textSize = 100;
        visualSettings.lineHeight = 1.5;
        visualSettings.saturation = 100;

        $('textSizeSlider').value = 100;
        $('lineHeightSlider').value = 1.5;
        $('saturationSlider').value = 100;

        disableAnimationsGlobally(false); // Asegurar que las animaciones vuelvan
        
        applySettings();
        applyVisualSettings();
        
        playSound('victory');
        // Mejorar la alerta a una notificación, pero por ahora se mantiene el alert
        alert('✅ Ajustes de accesibilidad y visuales reiniciados.'); 
    }

    window.hideForever = function() {
        if (confirm('⚠️ ¿Estás seguro de que deseas ocultar este menú permanentemente? Deberás recargar la página para verlo de nuevo.')) {
            $('accessibilityPanel').style.display = 'none';
            $('accessibilityBtn').style.display = 'none';
        }
    }
})();

// =========================================================
// 4. GESTIÓN DEL FORMULARIO (Se mantuvo simple para este ejercicio)
// =========================================================

function handleSubmit(event) {
    event.preventDefault(); // Evita el envío real del formulario

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    alert(`¡Gracias por contactarnos, ${nombre}! Hemos recibido su mensaje. Nos comunicaremos con usted al correo ${email}.`);
    
    // Aquí iría la lógica de envío de datos a un servidor (fetch o AJAX)
    // event.target.submit(); 
    
    event.target.reset(); // Limpia el formulario después de mostrar el mensaje
    return false; // Evita la navegación
}