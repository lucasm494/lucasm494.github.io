// shirt-loader.js - Handles loading and displaying football shirts
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const shirtsGrid = document.querySelector('.shirts-grid');

    async function loadShirts() {
        try {
            const response = await fetch('shirts.json');
            if (!response.ok) throw new Error('Failed to load shirts');
            return await response.json();
        } catch (error) {
            console.error('Error loading shirts:', error);
            return [];
        }
    }

    function renderShirts(shirts) {
        shirtsGrid.innerHTML = shirts.map(shirt => `
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

    function filterShirts(shirts, searchTerm, activeFilter) {
        return shirts.filter(shirt => {
            const matchesSearch = !searchTerm || 
                shirt.team.toLowerCase().includes(searchTerm) || 
                shirt.season.toLowerCase().includes(searchTerm);
            
            const matchesFilter = activeFilter === 'all' || shirt.league === activeFilter;
            
            return matchesSearch && matchesFilter;
        });
    }

    function setupEvents(shirts) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filtered = filterShirts(shirts, searchInput.value.toLowerCase(), btn.dataset.filter);
                renderShirts(filtered);
            });
        });
        
        searchInput.addEventListener('input', () => {
            const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
            const filtered = filterShirts(shirts, searchInput.value.toLowerCase(), activeFilter);
            renderShirts(filtered);
        });
    }

    async function init() {
        const shirts = await loadShirts();
        renderShirts(shirts);
        setupEvents(shirts);
    }

    init();
});