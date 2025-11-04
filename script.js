// DOM elements
const shirtsContainer = document.getElementById('shirts-container');
const searchInput = document.getElementById('search');
const filterButtons = document.querySelectorAll('.filter-btn');

// Load shirts from JSON file (our API)
async function loadShirts() {
    try {
        const response = await fetch('shirts.json');
        if (!response.ok) throw new Error('Failed to load shirts data');
        return await response.json();
    } catch (error) {
        console.error('Error loading shirts:', error);
        return [];
    }
}

// Initialize
async function init() {
    const shirts = await loadShirts();
    renderShirts(shirts);
    setupEventListeners(shirts);
}

// Render shirts
function renderShirts(shirtsToRender) {
    shirtsContainer.innerHTML = '';
    
    if (shirtsToRender.length === 0) {
        shirtsContainer.innerHTML = '<div class="loading">No shirts found in collection</div>';
        return;
    }
    
    shirtsToRender.forEach(shirt => {
        const card = document.createElement('div');
        card.className = 'shirt-card';
        card.innerHTML = `
            <div class="shirt-image">
                <img src="shirts/${shirt.image}" alt="${shirt.team} ${shirt.season}" 
                     onerror="this.src='https://via.placeholder.com/150x200/FFFFFF/333333?text=${shirt.team.replace(' ', '+')}'">
            </div>
            <h3>${shirt.team}</h3>
            <p>${shirt.season} Season</p>
            <div class="color-info">
                <div class="color-dot" style="background-color: ${shirt.mainColor}" title="Main Color"></div>
                <div class="color-dot" style="background-color: ${shirt.secondaryColor}" title="Secondary Color"></div>
            </div>
            <p><small>${shirt.league.toUpperCase()}</small></p>
        `;
        shirtsContainer.appendChild(card);
    });
}

// Setup event listeners
function setupEventListeners(shirts) {
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            const filtered = filter === 'all' ? shirts : shirts.filter(s => s.league === filter);
            renderShirts(filtered);
        });
    });
    
    // Search
    searchInput.addEventListener('input', function() {
        const term = this.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        
        let filtered = shirts;
        
        if (activeFilter !== 'all') {
            filtered = filtered.filter(s => s.league === activeFilter);
        }
        
        if (term) {
            filtered = filtered.filter(s => 
                s.team.toLowerCase().includes(term) || 
                s.season.toLowerCase().includes(term)
            );
        }
        
        renderShirts(filtered);
    });
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
