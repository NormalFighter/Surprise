const slides = document.querySelectorAll('.slide');  // All slides
const slider = document.querySelector('.slider');    // Slider container
const nextBtn = document.getElementById('next-btn'); // Next button
const prevBtn = document.getElementById('prev-btn'); // Previous button

let currentSlide = 0; // Track the current slide
let currentAudio = null; // Track the currently playing audio

// Function to show a slide based on the index
function showSlide(index) {
    const totalSlides = slides.length;

    // Ensure index stays within bounds
    if (index < 0) {
        currentSlide = 0;
    } else if (index >= totalSlides) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    // Pause the current audio if it's playing
    if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        currentAudio.currentTime = 0;  // Reset audio to the beginning
    }

    // Slide the slider container
    slider.style.transform = `translateX(-${currentSlide * 100}vw)`;

    // Play audio if on a friend's slide
    const audio = slides[currentSlide].querySelector('audio');
    if (audio) {
        audio.volume = 0.8;  // Set wish audio volume higher (80%)
        audio.play();
        currentAudio = audio;  // Track the current audio
    }

    // Show or hide navigation buttons based on the current slide
    prevBtn.style.display = currentSlide === 0 ? 'none' : 'block';
    nextBtn.style.display = currentSlide === totalSlides - 1 ? 'none' : 'block';
}

// Button click listeners for next and previous
nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));

// Swipe detection for mobile
let touchStartX = 0;
document.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
});

document.addEventListener('touchend', (event) => {
    const touchEndX = event.changedTouches[0].clientX;

    if (touchEndX < touchStartX - 50) { // Swipe left (next slide)
        showSlide(currentSlide + 1);
    }

    if (touchEndX > touchStartX + 50) { // Swipe right (previous slide)
        showSlide(currentSlide - 1);
    }
});

// Show the landing page initially
showSlide(currentSlide);

const bgm = document.getElementById('bgm');
const volumeSlider = document.getElementById('volume-slider');

// Set the default volume
bgm.volume = 0.2;  // Set to 30% by default

// Event listener to update BGM volume based on slider input
volumeSlider.addEventListener('input', function() {
    bgm.volume = volumeSlider.value;
});

