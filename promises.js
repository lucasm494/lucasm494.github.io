// cat-loader.js - Handles loading cat images as football players with formation selector
document.addEventListener('DOMContentLoaded', function() {
    let currentCats = []; // Store loaded cats
    
    // Define different formations with their grid positions
    const formations = {
        '4-3-3': [
            { number: 1, label: 'GK', gridArea: '4 / 3' },
            { number: 2, label: 'LB', gridArea: '3 / 1' },
            { number: 3, label: 'CB', gridArea: '3 / 2' },
            { number: 4, label: 'CB', gridArea: '3 / 4' },
            { number: 5, label: 'RB', gridArea: '3 / 5' },
            { number: 6, label: 'CDM', gridArea: '2 / 3' },
            { number: 7, label: 'CM', gridArea: '2 / 2' },
            { number: 8, label: 'CM', gridArea: '2 / 4' },
            { number: 9, label: 'RW', gridArea: '1 / 5' },
            { number: 10, label: 'ST', gridArea: '1 / 3' },
            { number: 11, label: 'LW', gridArea: '1 / 1' }
        ],
        '4-4-2': [
            { number: 1, label: 'GK', gridArea: '4 / 3' },
            { number: 2, label: 'LB', gridArea: '3 / 1' },
            { number: 3, label: 'CB', gridArea: '3 / 2' },
            { number: 4, label: 'CB', gridArea: '3 / 4' },
            { number: 5, label: 'RB', gridArea: '3 / 5' },
            { number: 6, label: 'LM', gridArea: '2 / 1' },
            { number: 7, label: 'CM', gridArea: '2 / 2' },
            { number: 8, label: 'CM', gridArea: '2 / 4' },
            { number: 9, label: 'RM', gridArea: '2 / 5' },
            { number: 10, label: 'ST', gridArea: '1 / 2' },
            { number: 11, label: 'ST', gridArea: '1 / 4' }
        ],
        '4-2-3-1': [
            { number: 1, label: 'GK', gridArea: '4 / 3' },
            { number: 2, label: 'LB', gridArea: '3 / 1' },
            { number: 3, label: 'CB', gridArea: '3 / 2' },
            { number: 4, label: 'CB', gridArea: '3 / 4' },
            { number: 5, label: 'RB', gridArea: '3 / 5' },
            { number: 6, label: 'CDM', gridArea: '2 / 2' },
            { number: 7, label: 'CDM', gridArea: '2 / 4' },
            { number: 8, label: 'CAM', gridArea: '2 / 3' },
            { number: 9, label: 'LW', gridArea: '1 / 1' },
            { number: 10, label: 'RW', gridArea: '1 / 5' },
            { number: 11, label: 'ST', gridArea: '1 / 3' }
        ],
        '3-5-2': [
            { number: 1, label: 'GK', gridArea: '4 / 3' },
            { number: 2, label: 'CB', gridArea: '3 / 2' },
            { number: 3, label: 'CB', gridArea: '3 / 3' },
            { number: 4, label: 'CB', gridArea: '3 / 4' },
            { number: 5, label: 'LWB', gridArea: '2 / 1' },
            { number: 6, label: 'CM', gridArea: '2 / 2' },
            { number: 7, label: 'CM', gridArea: '2 / 3' },
            { number: 8, label: 'CM', gridArea: '2 / 4' },
            { number: 9, label: 'RWB', gridArea: '2 / 5' },
            { number: 10, label: 'ST', gridArea: '1 / 2' },
            { number: 11, label: 'ST', gridArea: '1 / 4' }
        ],
        '5-3-2': [
            { number: 1, label: 'GK', gridArea: '4 / 3' },
            { number: 2, label: 'LWB', gridArea: '3 / 1' },
            { number: 3, label: 'CB', gridArea: '3 / 2' },
            { number: 4, label: 'CB', gridArea: '3 / 3' },
            { number: 5, label: 'CB', gridArea: '3 / 4' },
            { number: 6, label: 'RWB', gridArea: '3 / 5' },
            { number: 7, label: 'CM', gridArea: '2 / 2' },
            { number: 8, label: 'CM', gridArea: '2 / 3' },
            { number: 9, label: 'CM', gridArea: '2 / 4' },
            { number: 10, label: 'ST', gridArea: '1 / 2' },
            { number: 11, label: 'ST', gridArea: '1 / 4' }
        ]
    };

    async function init() {
        await loadCats();
        setupFormationSelector();
    }

    async function loadCats() {
        try {
            // Load 11 cats for the starting lineup
            const catPromises = Array.from({ length: 11 }, () => getCat());
            currentCats = await Promise.all(catPromises);
            
            // Render with default formation
            renderFormation('4-3-3');
            
        } catch (error) {
            console.error('Error loading cats:', error);
            const section = document.querySelector('.speedy');
            section.innerHTML = '<div class="error">Failed to load team lineup</div>';
        }
    }

    function renderFormation(formationName) {
        const formation = formations[formationName];
        const fieldContainer = document.querySelector('.field-container');
        const formationDisplay = document.querySelector('.formation-display');
        
        // Update formation display
        formationDisplay.textContent = `Formation: ${formationName}`;
        
        // Clear existing field
        fieldContainer.innerHTML = '';
        
        // Create positions for the selected formation
        formation.forEach((position, index) => {
            const positionElement = document.createElement('div');
            positionElement.className = 'position';
            positionElement.style.gridArea = position.gridArea;
            
            const cat = currentCats[index];
            const imgSrc = cat ? `https://cataas.com/cat/${cat.id}` : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIHZpZXdCb3g9IjAgMCA3MCA3MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzUiIGN5PSIzNSIgcj0iMzUiIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjx0ZXh0IHg9IjM1IiB5PSI0MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Mb2FkaW5nLi4uPC90ZXh0Pgo8L3N2Zz4K';
            const altText = cat ? `Player ${position.number}` : 'Loading player...';
            
            positionElement.innerHTML = `
                <div class="position-label">${position.label}</div>
                <div class="cat-player" data-position="${position.number}">
                    <img src="${imgSrc}" alt="${altText}" loading="lazy">
                </div>
            `;
            
            fieldContainer.appendChild(positionElement);
        });
    }

    function setupFormationSelector() {
        const formationSelect = document.getElementById('formation-select');
        
        formationSelect.addEventListener('change', function() {
            const selectedFormation = this.value;
            renderFormation(selectedFormation);
        });
    }

    async function getCat() {
        try {
            const response = await fetch('https://cataas.com/cat?json=true');
            if (!response.ok) throw new Error('Failed to fetch cat');
            return await response.json();
        } catch (error) {
            console.error('Error fetching cat:', error);
            return null;
        }
    }

    init();
});