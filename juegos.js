
// =========================================
// juegos.js: Funcionalidades Interactivas Simples
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    
    console.log('✨ Funcionalidades interactivas cargadas para los Juegos Educativos.');
    
    // 1. Selector de todas las tarjetas de juego
    const planetCards = document.querySelectorAll('.planet-card');

    // 2. Agregar un efecto de brillo y sonido sutil al pasar el mouse
    planetCards.forEach(card => {
        
        // Agregar evento al entrar a la tarjeta
        card.addEventListener('mouseenter', () => {
            // Añadir una clase para el efecto de brillo (glow) en CSS
            card.classList.add('glow'); 
        });

        // Agregar evento al salir de la tarjeta
        card.addEventListener('mouseleave', () => {
            // Remover la clase de brillo
            card.classList.remove('glow');
        });
        
        // Agregar un efecto de escala sutil al click
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 150);
        });
    });

    
}) ;