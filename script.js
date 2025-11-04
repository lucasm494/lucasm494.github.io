// Get DOM elements
const shirtsContainer = document.getElementById('shirts-container');
const searchInput = document.getElementById('search');
const filterButtons = document.querySelectorAll('.filter-btn');

// Load shirts from JSON
async function loadShirts() {
    try {
        const response = await fetch('shirts.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Failed to load shirts:', error);
        // Fallback to empty array
        return [];
    }
}

// Render shirts to page
function renderShirts(shirts) {
    shirtsContainer.innerHTML = shirts.map(shirt => `
        <div class="shirt-card">
            <div class="shirt-image">
                <img src="shirts/${shirt.image}" alt="${shirt.team}">
            </div>
            <h3>${shirt.team}</h3>
            <p>${shirt.season}</p>
            <div class="color-info">
                <div class="color-dot" style="background: ${shirt.mainColor}"></div>
                <div class="color-dot" style="background: ${shirt.secondaryColor}"></div>
            </div>
        </div>
    `).join('');
}

// Filter shirts based on search and active filter
function filterShirts(shirts, searchTerm, activeFilter) {
    return shirts.filter(shirt => {
        const matchesSearch = !searchTerm || 
            shirt.team.toLowerCase().includes(searchTerm) || 
            shirt.season.toLowerCase().includes(searchTerm);
        
        const matchesFilter = activeFilter === 'all' || shirt.league === activeFilter;
        
        return matchesSearch && matchesFilter;
    });
}

// Setup event listeners
function setupEvents(shirts) {
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filtered = filterShirts(shirts, searchInput.value, btn.dataset.filter);
            renderShirts(filtered);
        });
    });
    
    // Search input
    searchInput.addEventListener('input', () => {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        const filtered = filterShirts(shirts, searchInput.value.toLowerCase(), activeFilter);
        renderShirts(filtered);
    });
}

// Start the app
loadShirts().then(shirts => {
    renderShirts(shirts);
    setupEvents(shirts);
});
