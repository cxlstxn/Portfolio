document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.getElementById('typewriter');
    const commandInput = document.getElementById('command');
    const sections = {
        about: document.getElementById('about'),
        projects: document.getElementById('projects'),
        contact: document.getElementById('contact')
    };

    // Typewriter effect
    const introText = "Welcome to my portfolio! Type 'about', 'projects', or 'contact' to navigate.";
    let i = 0;

    function typeWriter() {
        if (i < introText.length) {
            typewriterElement.textContent += introText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();

    // Command line navigation
    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.toLowerCase().trim();
            commandInput.value = '';

            // Hide all sections
            Object.values(sections).forEach(section => section.classList.add('hidden'));

            // Show requested section
            if (sections[command]) {
                sections[command].classList.remove('hidden');
            } else {
                typewriterElement.textContent = "Invalid command. Try 'about', 'projects', or 'contact'.";
                setTimeout(() => {
                    typewriterElement.textContent = introText;
                }, 2000);
            }
        }
    });
});
