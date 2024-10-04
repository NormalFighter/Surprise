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

    // Pause and reset the currently playing audio
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


/*-------------------------------------------------*/
// Confetti code
const Confettiful = function (el) {
    this.el = el;
    this.containerEl = null;

    // Confetti settings
    this.confettiFrequency = window.innerWidth < 768 ? 5 : 3; // Reduce frequency on mobile
    this.confettiColors = ["#fce18a", "#ff726d", "#b48def", "#f4306d"];
    this.confettiAnimations = ["slow", "medium", "fast"];

    this._setupElements();
    this._renderConfetti();
};

// Set up the confetti container
Confettiful.prototype._setupElements = function () {
    const containerEl = document.createElement("div");
    const elPosition = this.el.style.position;

    if (elPosition !== "relative" || elPosition !== "absolute") {
        this.el.style.position = "relative";
    }

    containerEl.classList.add("confetti-container");
    this.el.appendChild(containerEl);
    this.containerEl = containerEl;
};

// Render confetti at a reduced rate
Confettiful.prototype._renderConfetti = function () {
    this.confettiInterval = setInterval(() => {
        // Check if we have reached the max confetti count for mobile
        if (this.containerEl.childElementCount >= (window.innerWidth < 768 ? 80 : 150)) {
            return;
        }

        const confettiEl = document.createElement("div");
        const confettiSize = Math.floor(Math.random() * 3) + 7 + "px";
        const confettiBackground = this.confettiColors[
            Math.floor(Math.random() * this.confettiColors.length)
        ];
        const confettiLeft = Math.floor(Math.random() * this.el.offsetWidth) + "px";
        const confettiAnimation = this.confettiAnimations[
            Math.floor(Math.random() * this.confettiAnimations.length)
        ];

        confettiEl.classList.add(
            "confetti",
            "confetti--animation-" + confettiAnimation
        );
        confettiEl.style.left = confettiLeft;
        confettiEl.style.width = confettiSize;
        confettiEl.style.height = confettiSize;
        confettiEl.style.backgroundColor = confettiBackground;

        confettiEl.removeTimeout = setTimeout(function () {
            confettiEl.parentNode.removeChild(confettiEl);
        }, 3000); // Reduce lifetime

        this.containerEl.appendChild(confettiEl);
    }, window.innerWidth < 768 ? 100 : 50); // Slow down on mobile
};

// Instantiate confetti only on the landing page
window.confettiful = new Confettiful(document.querySelector(".js-container"));

const bgm = document.getElementById('bgm');
const volumeSlider = document.getElementById('volume-slider');

// Set the default volume
bgm.volume = 0.2;  // Set to 30% by default

// Event listener to update BGM volume based on slider input
volumeSlider.addEventListener('input', function() {
    bgm.volume = volumeSlider.value;
});
