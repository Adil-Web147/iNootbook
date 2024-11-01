// src/particles.js
document.addEventListener('DOMContentLoaded', () => {
    const numParticles = 100; // Number of particles
    const body = document.body;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.left = `${Math.random() * 100}vw`;
        body.appendChild(particle);
    }
});
