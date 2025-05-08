// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const animateButton = document.getElementById('animateButton');
const resetButton = document.getElementById('resetButton');
const clearStorageButton = document.getElementById('clearStorage');
const saveColorsButton = document.getElementById('saveColors');
const primaryColorInput = document.getElementById('primaryColor');
const secondaryColorInput = document.getElementById('secondaryColor');
const notification = document.getElementById('notification');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadUserPreferences();
});

/**
 * Loads user preferences from localStorage and applies them
 */
function loadUserPreferences() {
    // Load theme preference
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    if (isDarkTheme) {
        document.body.classList.add('dark-theme');
    }
    
    // Load color preferences
    const primaryColor = localStorage.getItem('primaryColor');
    const secondaryColor = localStorage.getItem('secondaryColor');
    
    if (primaryColor) {
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        primaryColorInput.value = primaryColor;
    }
    
    if (secondaryColor) {
        document.documentElement.style.setProperty('--secondary-color', secondaryColor);
        secondaryColorInput.value = secondaryColor;
    }
}

/**
 * Saves the current theme preference to localStorage
 * @param {boolean} isDarkTheme - Whether dark theme is enabled
 */
function saveThemePreference(isDarkTheme) {
    localStorage.setItem('darkTheme', isDarkTheme);
    showNotification('Theme preference saved!');
}

/**
 * Saves color preferences to localStorage and applies them
 */
function saveColorPreferences() {
    const primaryColor = primaryColorInput.value;
    const secondaryColor = secondaryColorInput.value;
    
    localStorage.setItem('primaryColor', primaryColor);
    localStorage.setItem('secondaryColor', secondaryColor);
    
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    
    showNotification('Color preferences saved!');
}

/**
 * Clears all user preferences from localStorage and resets to defaults
 */
function clearPreferences() {
    localStorage.removeItem('darkTheme');
    localStorage.removeItem('primaryColor');
    localStorage.removeItem('secondaryColor');
    
    // Reset to defaults
    document.body.classList.remove('dark-theme');
    document.documentElement.style.setProperty('--primary-color', '#3498db');
    document.documentElement.style.setProperty('--secondary-color', '#2ecc71');
    primaryColorInput.value = '#3498db';
    secondaryColorInput.value = '#2ecc71';
    
    showNotification('All preferences cleared!');
}

/**
 * Displays a notification message that automatically hides after a delay
 * @param {string} message - The message to display
 */
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

/**
 * Triggers animations on cards with sequential delays
 */
function animateCards() {
    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = `fadeIn 0.6s ease-out ${index * 0.1}s`;
        }, 10);
    });
}

// Event Listeners
themeToggle.addEventListener('click', function() {
    const isDarkTheme = document.body.classList.toggle('dark-theme');
    saveThemePreference(isDarkTheme);
});

animateButton.addEventListener('click', function() {
    this.classList.add('animate-button');
    animateCards();
});

resetButton.addEventListener('click', function() {
    animateButton.classList.remove('animate-button');
});

clearStorageButton.addEventListener('click', clearPreferences);

saveColorsButton.addEventListener('click', saveColorPreferences);

// Remove animation classes after animations complete
animateButton.addEventListener('animationend', function() {
    this.classList.remove('animate-button');
});