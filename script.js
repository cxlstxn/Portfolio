document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.getElementById('typewriter');
    const commandInput = document.getElementById('command');
    const lsSections = ['scotbank', 'unixshell', 'blackjackbot'];
    let history = [];
    let historyIndex = 0;
    const sections = {
        about: document.getElementById('about'),
        projects: document.getElementById('projects'),
        contact: document.getElementById('contact'),
        help: document.getElementById('help')
    };

    const introText = "Welcome to my portfolio! Type 'about', 'projects','contact' or 'help' to navigate.";
    let i = 0;

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
            e.preventDefault();
            historyIndex = 0;
            history.push(commandInput.value);
            document.getElementById('sec').classList.add('hidden');
            const command = commandInput.value.toLowerCase().trim();
            commandInput.value = '';
            Object.values(sections).forEach(section => section.classList.add('hidden'));
            if (command.startsWith('cd ')) {

                const args = command.split(' ').slice(1);
                console.log(args);
                if (lsSections.includes(args[0])) {
                    document.location.href = `${args[0]}.html`;
                } else {
                    typewriterElement.textContent = "Directory not found.";
                    setTimeout(() => {
                        typewriterElement.textContent = introText;
                    }, 2000);
                }
            } else if (command == 'ls' || command == 'dir') {
                document.getElementById('sec').classList.remove('hidden');
                document.getElementById('sec').textContent = lsSections.join('\n');
            } else if (command === 'pwd') {
                document.getElementById('sec').classList.remove('hidden');
                document.getElementById('sec').textContent = '/root/';
            } else if (command === 'whoami') {
                document.getElementById('sec').classList.remove('hidden');
                document.getElementById('sec').textContent = 'who do you think you are?';
            } else if (command === 'time' || command === 'date') {
                const now = new Date();
                const formattedTime = now.toLocaleTimeString();
                const formattedDate = now.toLocaleDateString();
                document.getElementById('sec').classList.remove('hidden');
                document.getElementById('sec').textContent = `Current time: ${formattedTime}, Date: ${formattedDate}`;
            } else if (command.startsWith('echo ')) {
                const message = command.slice(5);
                document.getElementById('sec').classList.remove('hidden');
                document.getElementById('sec').textContent = message;
            } else if (sections[command]) {
                sections[command].classList.remove('hidden');
            } else {
                typewriterElement.textContent = "Invalid command. Try 'about', 'projects', or 'contact'.";
                setTimeout(() => {
                    typewriterElement.textContent = introText;
                }, 2000);
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const currentValue = commandInput.value.trim().toLowerCase();
            const parts = currentValue.split(' ');
            if (parts[0] === 'cd' && parts.length === 2) {
                const matches = lsSections.filter(section => section.startsWith(parts[1]));
                if (matches.length === 1) {
                    commandInput.value = `cd ${matches[0]}`;
                }
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length > 0) {
            if (historyIndex < history.length) {
                historyIndex++;
                commandInput.value = history[history.length - historyIndex];
            }
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (history.length > 0) {
            if (historyIndex > 0) {
                historyIndex--;
                if (historyIndex === 0) {
                commandInput.value = '';
                } else {
                commandInput.value = history[history.length - historyIndex];
                }
            }
            }
        } 
    });
});