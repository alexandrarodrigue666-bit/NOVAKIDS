// Script para la sección de Padres de Familia - Tema Espacial

// Efecto de planetas flotantes en el fondo
function crearPlanetas() {
    const body = document.body;
    const numPlanetas = 5;
    
    for (let i = 0; i < numPlanetas; i++) {
        const planeta = document.createElement('div');
        planeta.className = 'planeta';
        planeta.style.cssText = `
            position: fixed;
            width: ${Math.random() * 60 + 30}px;
            height: ${Math.random() * 60 + 30}px;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, rgba(138, 98, 255, 0.4), rgba(75, 47, 162, 0.6));
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
            z-index: 0;
            pointer-events: none;
            animation: flotar ${Math.random() * 10 + 15}s ease-in-out infinite;
            box-shadow: 0 0 30px rgba(138, 98, 255, 0.3);
        `;
        body.appendChild(planeta);
    }
}

// Animación de flotación para los planetas
const style = document.createElement('style');
style.textContent = `
    @keyframes flotar {
        0%, 100% {
            transform: translate(0, 0) scale(1);
        }
        25% {
            transform: translate(20px, -30px) scale(1.1);
        }
        50% {
            transform: translate(-15px, -50px) scale(0.9);
        }
        75% {
            transform: translate(-30px, -20px) scale(1.05);
        }
    }
`;
document.head.appendChild(style);

// Efecto de partículas al hacer clic
document.addEventListener('click', function(e) {
    crearParticulas(e.pageX, e.pageY);
});

function crearParticulas(x, y) {
    const numParticulas = 8;
    
    for (let i = 0; i < numParticulas; i++) {
        const particula = document.createElement('div');
        particula.style.cssText = `
            position: absolute;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: linear-gradient(45deg, #a8c5ff, #8a62ff);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 9999;
            box-shadow: 0 0 10px rgba(138, 98, 255, 0.8);
        `;
        
        document.body.appendChild(particula);
        
        const angulo = (Math.PI * 2 * i) / numParticulas;
        const velocidad = Math.random() * 100 + 50;
        const x_vel = Math.cos(angulo) * velocidad;
        const y_vel = Math.sin(angulo) * velocidad;
        
        let posX = x;
        let posY = y;
        let opacity = 1;
        
        const animar = setInterval(() => {
            posX += x_vel * 0.05;
            posY += y_vel * 0.05;
            opacity -= 0.02;
            
            particula.style.left = posX + 'px';
            particula.style.top = posY + 'px';
            particula.style.opacity = opacity;
            
            if (opacity <= 0) {
                clearInterval(animar);
                particula.remove();
            }
        }, 20);
    }
}

// Animación de aparición suave para las secciones
function observarSecciones() {
    const secciones = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    secciones.forEach(seccion => {
        observer.observe(seccion);
    });
}

// Efecto de brillo en los enlaces
function efectoBrilloEnlaces() {
    const enlaces = document.querySelectorAll('a');
    
    enlaces.forEach(enlace => {
        enlace.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'translateX(5px)';
        });
        
        enlace.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Reloj espacial en el header
function agregarReloj() {
    const header = document.querySelector('header');
    const relojDiv = document.createElement('div');
    relojDiv.id = 'reloj-espacial';
    relojDiv.style.cssText = `
        font-size: 1.2em;
        margin-top: 15px;
        color: #ffd700;
        text-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
        font-weight: bold;
    `;
    
    header.appendChild(relojDiv);
    
    function actualizarReloj() {
        const ahora = new Date();
        const opciones = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        relojDiv.textContent = '🌟 ' + ahora.toLocaleDateString('es-ES', opciones);
    }
    
    actualizarReloj();
    setInterval(actualizarReloj, 1000);
}

// Mensaje de bienvenida con efecto
function mostrarMensajeBienvenida() {
    setTimeout(() => {
        const mensaje = document.createElement('div');
        mensaje.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(75, 47, 162, 0.95), rgba(91, 63, 172, 0.95));
            color: white;
            padding: 30px 50px;
            border-radius: 15px;
            z-index: 10000;
            font-size: 1.3em;
            text-align: center;
            box-shadow: 0 10px 50px rgba(138, 98, 255, 0.6);
            border: 2px solid rgba(255, 255, 255, 0.2);
            animation: aparecer 0.5s ease-out;
        `;
        mensaje.innerHTML = '🚀 ¡Bienvenidos al Espacio Familiar! 🌟';
        
        document.body.appendChild(mensaje);
        
        setTimeout(() => {
            mensaje.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            mensaje.style.opacity = '0';
            mensaje.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(() => mensaje.remove(), 500);
        }, 3000);
    }, 500);
}



// Efecto de parallax suave al hacer scroll
let ultimaPosicion = window.pageYOffset;

window.addEventListener('scroll', function() {
    const posicionActual = window.pageYOffset;
    const planetas = document.querySelectorAll('.planeta');
    
    planetas.forEach((planeta, index) => {
        const velocidad = (index + 1) * 0.1;
        planeta.style.transform = `translateY(${posicionActual * velocidad}px)`;
    });
    
    ultimaPosicion = posicionActual;
});

console.log('🚀 Sistema de navegación espacial iniciado correctamente 🌟');