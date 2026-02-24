let playerName = "";

function handleNameSubmit() {
    const nameInput = document.getElementById('player-name-input');
    playerName = nameInput.value.trim();

    if (playerName) {
        // Hide overlay
        document.getElementById('name-overlay').style.display = 'none';

        // Show welcome banner with personalized greeting
        const banner = document.getElementById('welcome-banner');
        banner.classList.remove('hidden');
        document.getElementById('display-name').innerText = playerName;

        // Show personalized tease for the calculator
        const personalizedTease = document.getElementById('personalized-tease');
        const defaultTease = document.getElementById('default-tease');

        if (personalizedTease && defaultTease) {
            personalizedTease.classList.remove('hidden');
            defaultTease.classList.add('hidden');
            document.getElementById('tease-name').innerText = playerName;
        }

        // Optional: Smooth scroll to hero
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function calculateAJAX() {
    const form = document.getElementById('calc-form');
    const formData = new FormData(form);
    const resultDiv = document.getElementById('result');
    const investAmount = document.getElementById('invest').value;

    // Add loading state
    resultDiv.innerHTML = '<div class="text-center"><i class="fas fa-gamepad fa-spin"></i> Processing virtual trade algorithms...</div>';
    resultDiv.style.opacity = "0.7";

    fetch('/calculate', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            resultDiv.style.opacity = "1";
            if (data.success) {
                // Success animation
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#64ffda', '#ffd700', '#ffffff']
                });

                resultDiv.innerHTML = `
                <div class="result-card animate-fade-in" style="border-left: 4px solid #64ffda; padding: 20px; background: rgba(100, 255, 218, 0.05);">
                    <h3 class="accent">Epic Wins, ${playerName || 'Player'}!</h3>
                    <p>Wow ${playerName || 'Player'}, investing $${parseFloat(investAmount).toLocaleString()} could turn into epic returns!</p>
                    <hr style="margin: 15px 0; border: 0; border-top: 1px solid rgba(255,255,255,0.1);">
                    <p>Simulated Base: $${data.base.toLocaleString()}</p>
                    <p>Adventure Bonus: $${data.bonus.toLocaleString()}</p>
                    <p style="font-size: 1.5rem; margin-top: 10px;">Total Virtual Wealth: <span class="accent-gold">$${data.total.toLocaleString()}</span> 🚀</p>
                    <p class="subtext" style="font-size: 0.9rem; color: #8892b0; margin-top: 10px;">Imagine the thrill... keep going!</p>
                </div>
            `;
            } else {
                resultDiv.innerHTML = `<div class="error-msg" style="color: #ff3366; padding: 20px; background: rgba(255, 51, 102, 0.05); border-radius: 8px;">
                <i class="fas fa-exclamation-circle"></i> ${data.message}
            </div>`;
            }
        })
        .catch(err => {
            console.error(err);
            resultDiv.innerHTML = "Quest failed. Server connection lost.";
        });
}

function showGameAlert() {
    alert(`Virtual adventure started, ${playerName || 'Player'}!\n\nAll returns shown are simulated for fun as part of the Triad Adventure game.\n\nEnjoy your quest for virtual billions! 🚀`);
}

// Ensure overlay is visible if needed
document.addEventListener('DOMContentLoaded', () => {
    // Check if name is already set (for persistence if needed)
    // For now, always show on reload
});