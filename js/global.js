// ==========================================================================
// Globale JavaScript-Funktionen
// Enthält Funktionen, die auf allen Seiten wiederverwendet werden können
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // Header-Animation: Fade-In der Nav-Links
    // - Jeder Link wird nacheinander eingeblendet, um einen eleganten Effekt zu erzeugen
    // ==========================================================================
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, index * 200); // Verzögerung für jeden Link
    });

    // ==========================================================================
    // Button-Animation: Leichtes Pulsieren beim Laden
    // - Buttons pulsieren alle 3 Sekunden, um Aufmerksamkeit zu erregen
    // ==========================================================================
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        setInterval(() => {
            button.style.transform = 'scale(1.05)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 500);
        }, 3000); // Pulsieren alle 3 Sekunden
    });
});