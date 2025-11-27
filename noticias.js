// script.js

// Actualizar fecha actual
function updateCurrentDate() {
    const now = new Date();
    
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    
    document.getElementById('currentDay').textContent = day;
    document.getElementById('currentMonth').textContent = month.toUpperCase();
    document.getElementById('currentYear').textContent = year;
    document.getElementById('fullDate').textContent = `${dayName}, ${day} de ${month} de ${year}`;
}

// Animación de entrada para las tarjetas
function animateCards() {
    const cards = document.querySelectorAll('.event-card, .news-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'all 0.6s ease';
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => observer.observe(card));
}

// Efecto de brillo en los planetas al pasar el mouse
function addPlanetEffects() {
    const planets = document.querySelectorAll('.planet');
    
    planets.forEach(planet => {
        planet.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.boxShadow = '0 0 50px rgba(138, 43, 226, 1)';
        });
        
        planet.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 30px rgba(138, 43, 226, 0.6)';
        });
    });
}

// Animación de estrellas fugaces aleatorias
function createShootingStar() {
    const star = document.createElement('div');
    star.style.position = 'fixed';
    star.style.width = '2px';
    star.style.height = '2px';
    star.style.background = 'white';
    star.style.borderRadius = '50%';
    star.style.boxShadow = '0 0 10px white';
    star.style.top = Math.random() * 50 + '%';
    star.style.left = Math.random() * 100 + '%';
    star.style.zIndex = '1000';
    star.style.pointerEvents = 'none';
    
    document.body.appendChild(star);
    
    const duration = 1000 + Math.random() * 1000;
    const distance = 200 + Math.random() * 200;
    
    star.animate([
        { 
            transform: 'translate(0, 0) scale(1)',
            opacity: 1
        },
        { 
            transform: `translate(${distance}px, ${distance}px) scale(0)`,
            opacity: 0
        }
    ], {
        duration: duration,
        easing: 'ease-out'
    });
    
    setTimeout(() => {
        star.remove();
    }, duration);
}

// Crear estrellas fugaces periódicamente
function startShootingStars() {
    setInterval(() => {
        if (Math.random() > 0.7) {
            createShootingStar();
        }
    }, 3000);
}

// Efecto parallax suave en las secciones
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrolled = window.pageYOffset;
        
        sections.forEach((section, index) => {
            const speed = 0.05 * (index + 1);
            const yPos = -(scrolled * speed);
            section.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Inicializar todas las funciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    updateCurrentDate();
    animateCards();
    addPlanetEffects();
    startShootingStars();
    addParallaxEffect();
    
    // Actualizar la fecha cada minuto
    setInterval(updateCurrentDate, 60000);
});

// Efecto de clic en las tarjetas de eventos
document.addEventListener('DOMContentLoaded', function() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
});

// Animación de pulso para el clic
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);