

document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.getElementById('typewriter');
    const commandInput = document.getElementById('command');
    const sections = {
        about: document.getElementById('about'),
        projects: document.getElementById('projects'),
        contact: document.getElementById('contact'),
        help: document.getElementById('help')
    };

    let introText = "";
    const path = window.location.pathname;
    console
    if (path.includes('scotbank')) {
        introText = "SCOTBANK";
    } else if (path.includes('unixshell')) {
        introText = "UNIX SHELL";
    } else if (path.includes('blackjackbot')) {
        introText = "BLACKJACK BOT";
    }  let i = 0;

    function typeWriter() {
        if (i < introText.length) {
            typewriterElement.textContent += introText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();

    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.toLowerCase().trim();
            commandInput.value = '';
            if (command === 'back' || command === 'cd .') {
                document.location.href = 'index.html';
            }
        }

    });
});

const images = Array.from(document.querySelectorAll('.clickable-img'));
                    let currentImgIndex = 0;

                    images.forEach((img, idx) => {
                        img.addEventListener('click', function() {
                            currentImgIndex = idx;
                            document.getElementById('modalImg').src = this.src;
                            document.getElementById('imgModal').style.display = 'flex';
                        });
                    });

                    document.getElementById('closeModal').onclick = function() {
                        document.getElementById('imgModal').style.display = 'none';
                    };

                    document.getElementById('imgModal').onclick = function(e) {
                        if (e.target === this) this.style.display = 'none';
                    };

                    document.getElementById('nextImg').onclick = function(e) {
                        e.stopPropagation();
                        currentImgIndex = (currentImgIndex + 1) % images.length;
                        document.getElementById('modalImg').src = images[currentImgIndex].src;
                    };

                    document.getElementById('prevImg').onclick = function(e) {
                        e.stopPropagation();
                        currentImgIndex = (currentImgIndex - 1 + images.length) % images.length;
                        document.getElementById('modalImg').src = images[currentImgIndex].src;
                    };


window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};
window.onload = function () {
    window.scrollTo(0, 0);
};