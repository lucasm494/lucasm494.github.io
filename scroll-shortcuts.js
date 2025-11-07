document.addEventListener('DOMContentLoaded', function() {
    createShortcutsBar();
    setupShortcutButtons();
});

function createShortcutsBar() {
    
}

function setupShortcutButtons() {
    const shortcutBtns = document.querySelectorAll('.shortcut-btn');
    
    shortcutBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.dataset.target;
            
            if (target === 'collection') {
                scrollToSection('collection');
            } else if (target === 'speedy') {
                scrollToSection('speedy');
            } else if (this.classList.contains('scroll-top')) {
                scrollToTop();
            } else if (this.classList.contains('scroll-bottom')) {
                scrollToBottom();
            }
        });
    });
}

function scrollToSection(sectionName) {
    const sections = {
        'collection': document.querySelector('.collection'),
        'speedy': document.querySelector('.speedy')
    };
    
    if (sections[sectionName]) {
        sections[sectionName].scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

function toggleScrollMode() {
    isScrollMode = !isScrollMode;
    
    if (isScrollMode) {
        document.body.style.overflow = 'hidden';
        showScrollInstructions();
    } else {
        document.body.style.overflow = '';
        hideScrollInstructions();
    }
}


