// Example JavaScript for Wanderlust Travel Guide
// You can add more interactivity as needed

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle logic
    const themeToggle = document.getElementById('theme-toggle');
    const themeLabel = document.getElementById('theme-label');
    const userPref = localStorage.getItem('theme');
    function setTheme(mode) {
        document.body.classList.remove('light-mode', 'dark-mode');
        if (mode === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.checked = true;
            themeLabel.textContent = 'Light Mode';
        } else if (mode === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.checked = false;
            themeLabel.textContent = 'Dark Mode';
        }
    }
    function getSystemPref() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    // Set initial theme
    let initialTheme = userPref || getSystemPref();
    setTheme(initialTheme);
    // Listen for toggle
    themeToggle.addEventListener('change', function() {
        const mode = themeToggle.checked ? 'dark' : 'light';
        setTheme(mode);
        localStorage.setItem('theme', mode);
    });
    // Listen for system changes if no user pref
    if (!userPref) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            setTheme(e.matches ? 'dark' : 'light');
        });
    }
    // Reveal transitions for destination cards
    const cards = document.querySelectorAll('.card');
    const revealCards = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };
    const observer = new window.IntersectionObserver(revealCards, {
        threshold: 0.15
    });
    cards.forEach(card => {
        observer.observe(card);
    });

    const form = document.querySelector('form');
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = form.querySelector('input[type="text"]').value.trim();
            const email = form.querySelector('input[type="email"]').value.trim();
            const message = form.querySelector('textarea').value.trim();
            const subject = encodeURIComponent('Travel Inquiry from ' + name);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
            const mailto = `mailto:info@wanderlust.com?subject=${subject}&body=${body}`;
            const a = document.createElement('a');
            a.href = mailto;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            form.reset();
        });
    }
});
