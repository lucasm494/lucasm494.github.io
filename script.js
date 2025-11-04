// Dynamic Interaction: Form submission handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name') || this.querySelector('input[type="text"]').value;
    const email = formData.get('email') || this.querySelector('input[type="email"]').value;
    const message = formData.get('message') || this.querySelector('textarea').value;
    
    // Simple validation
    if (name && email && message) {
        alert(`Thank you, ${name}! Your message has been sent.`);
        this.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Dynamic Interaction: Learn More button
document.getElementById('learnMoreBtn').addEventListener('click', function() {
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
    
    // Add visual feedback
    this.style.backgroundColor = '#2980b9';
    setTimeout(() => {
        this.style.backgroundColor = '#3498db';
    }, 300);
});

// Content from Public API: Fetch GitHub repositories
async function fetchGitHubRepos() {
    const projectsContainer = document.getElementById('projectsContainer');
    
    try {
        // Replace 'your-username' with an actual GitHub username
        const response = await fetch('https://api.github.com/users/octocat/repos?sort=updated&per_page=6');
        
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        
        const repos = await response.json();
        
        // Clear loading message
        projectsContainer.innerHTML = '';
        
        // Create project cards
        repos.forEach(repo => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description available'}</p>
                <div style="margin-top: 1rem;">
                    <a href="${repo.html_url}" target="_blank" style="color: #3498db; text-decoration: none;">
                        View on GitHub →
                    </a>
                </div>
            `;
            projectsContainer.appendChild(projectCard);
        });
        
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        projectsContainer.innerHTML = `
            <div style="text-align: center; color: #666;">
                <p>Unable to load projects. Showing sample projects instead.</p>
                ${getSampleProjects()}
            </div>
        `;
    }
}

// Fallback sample projects if API fails
function getSampleProjects() {
    const sampleProjects = [
        { name: 'Portfolio Website', description: 'A responsive portfolio website built with HTML, CSS, and JavaScript', url: '#' },
        { name: 'Task Manager', description: 'A simple task management application with local storage', url: '#' },
        { name: 'Weather App', description: 'Real-time weather application using public API', url: '#' }
    ];
    
    return sampleProjects.map(project => `
        <div class="project-card">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div style="margin-top: 1rem;">
                <a href="${project.url}" style="color: #3498db; text-decoration: none;">
                    View Project →
                </a>
            </div>
        </div>
    `).join('');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Fetch GitHub repositories
    fetchGitHubRepos();
    
    // Add scroll animation for skill bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });
    
    // Observe skill bars
    document.querySelectorAll('.bar').forEach(bar => {
        bar.style.animationPlayState = 'paused';
        observer.observe(bar);
    });
});
