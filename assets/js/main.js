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
    updateSubheader(index);
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
    updateSubheader(slideIndex);
    updateLanguageSwitchLinks();
}

// Initialize the carousel and footer year with the correct slide
window.addEventListener('DOMContentLoaded', () => {
    trimSubheaderText();  // Adjust subheader for mobile view
    currentSlide = getCurrentSlide();  // Get the current slide index from URL or default to 0

    let activeSlides = document.querySelectorAll('.carousel-slide');
    
    showSlide(activeSlides, currentSlide);
    updateSubheader(currentSlide);
    updateLanguageSwitchLinks();
    updateDots();

    // Set current year in the footer
    const yearSpan = document.getElementById('current-year');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
});

// Handle window resizing to trim subheader text when the window size changes
window.addEventListener('resize', () => {
    trimSubheaderText();  // Adjust subheader text on resize
});

// Function to get the current slide index from the URL
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

// Function to update the subheader highlight
function updateSubheader(slideIndex) {
    const subheaderItems = document.querySelectorAll('.subheader-item');
    subheaderItems.forEach((item, index) => {
        item.classList.toggle('active', index === slideIndex);
    });
}

// Function to update the language switch links
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

// Function to lazy load background images
function lazyLoadBackgrounds() {
    const lazyBackgrounds = document.querySelectorAll('.carousel-slide');

    lazyBackgrounds.forEach(function(lazyBackground) {
        if (!lazyBackground.style.backgroundImage) {
            // Apply the background image from data-bg
            lazyBackground.style.backgroundImage = 'url(' + lazyBackground.dataset.bg + ')';
        }
    });
}

// Function to trim subheader text for mobile devices
function trimSubheaderText() {
    const subheaderItems = document.querySelectorAll('.subheader-item');

    subheaderItems.forEach(item => {
        const fullText = item.getAttribute('data-full-text');
        if (window.innerWidth <= 480) {
            const trimmedText = fullText.length > 10 ? fullText.slice(0, 8) + '...' : fullText;
            item.textContent = trimmedText;
        } else {
            item.textContent = fullText;
        }
    });
}
