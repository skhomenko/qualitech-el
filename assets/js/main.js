let currentSlide = 0;

// Function to show the current slide and update dots
function showSlide(slides, index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
            lazyLoadBackgrounds();
        }
    });
    updateURL();
    updateDots();
}

// Function to update the URL with the current slide index
function updateURL() {
    const baseURL = window.location.href.split('?')[0];
    const newURL = `${baseURL}?currentSlide=${currentSlide}`;
    history.replaceState(null, '', newURL);
}

// Function to update the active dot
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === currentSlide) {
            dot.classList.add('active');
        }
    });
}

// Function to go to a specific slide
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    const activeSlides = document.querySelectorAll('.carousel-slide');
    showSlide(activeSlides, currentSlide);
    updateLanguageSwitchLinks();
}

// Initialize the carousel with the correct slide
window.addEventListener('DOMContentLoaded', () => {
    currentSlide = getCurrentSlide();  // Get the current slide index from URL or default to 0

    let activeSlides = document.querySelectorAll('.carousel-slide');
    
    showSlide(activeSlides, currentSlide);
    updateLanguageSwitchLinks();
    updateDots();
});

function getCurrentSlide() {
    const params = new URLSearchParams(window.location.search);
    const slideIndex = params.get('currentSlide');
    return slideIndex ? parseInt(slideIndex) : 0;
}

// Function to show the next slide
function nextSlide() {
    const activeSlides = document.querySelectorAll('.carousel-slide');
    currentSlide = (currentSlide + 1) % activeSlides.length;
    showSlide(activeSlides, currentSlide);
    updateLanguageSwitchLinks();
}

// Function to show the previous slide
function prevSlide() {
    const activeSlides = document.querySelectorAll('.carousel-slide');
    currentSlide = (currentSlide - 1 + activeSlides.length) % activeSlides.length;
    showSlide(activeSlides, currentSlide);
    updateLanguageSwitchLinks();
}

function updateLanguageSwitchLinks() {
    const switchToEnglish = document.getElementById('switch-to-en');
    const switchToFrench = document.getElementById('switch-to-fr');

    if (switchToEnglish) {
        switchToEnglish.href = `index-en.html?currentSlide=${currentSlide}`;
    }
    if (switchToFrench) {
        switchToFrench.href = `index-fr.html?currentSlide=${currentSlide}`;
    }
}

function lazyLoadBackgrounds() {
    const lazyBackgrounds = document.querySelectorAll('.carousel-slide');

    lazyBackgrounds.forEach(function(lazyBackground) {
        if (!lazyBackground.style.backgroundImage) {
            // Apply the background image from data-bg
            lazyBackground.style.backgroundImage = 'url(' + lazyBackground.dataset.bg + ')';
        }
    });
}

// JavaScript to set the current year in the footer
window.addEventListener('DOMContentLoaded', (event) => {
    const yearSpan = document.getElementById('current-year');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
});
