/*
    Forced scroll
*/

// Wait for the window to load
window.addEventListener("load", function() {
    let userScrolled = false;
    
    this.setTimeout(function() {
        // Smoothly scroll down
        if (!userScrolled) {
            window.scrollTo({
                top: 400,
                left: 0,
                behaviour: "smooth"
            });
        }
    }, 5000);

    // Detect if user has scrolled
    window.addEventListener("scroll", function() {
        let scrollPosition = window.scrollY;

        if (scrollPosition > 0) {
            userScrolled = true;
        }
    });
});

// Image sliders
window.onload = function()
{
    const sliderContainer = document.querySelector('.slider-container');

    if (sliderContainer == null || sliderContainer == undefined) return;

    const slider = document.querySelector('.slider');
    const interval = 3000;
    
    let slides = document.querySelectorAll('.slide');
    let index = 1;
    let slideId;
    
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    
    firstClone.id = 'first-clone';
    lastClone.id = 'last-clone';
    
    slider.append(firstClone);
    slider.prepend(lastClone);
    
    if (slides[index] == null || slides[index] == undefined) return;

    const slideWidth = slides[index].clientWidth;
    
    slider.style.transform = `translateX(${-slideWidth * index}px)`;
    
    const startSlide = () => {
        slideId = setInterval(() => {
            moveToNextSlide();
        }, interval);
    };

    slider.addEventListener('transitionend', () => {
        let slides = getSlides();
        if (slides[index].id === firstClone.id) {
            slider.style.transition = 'none';
            index = 1;
            slider.style.transform = `translateX(${-slideWidth * index}px)`;
        }

        if (slides[index].id === lastClone.id) {
            slider.style.transition = 'none';
            index = slides.length - 2;
            slider.style.transform = `translateX(${-slideWidth * index}px)`;
        }
    });

    const getSlides = () => document.querySelectorAll('.slide');

    const moveToNextSlide = () => {
        let slides = getSlides();
        if(index >= slides.length - 1) return;

        index++;
        slider.style.transform = `translateX(${-slideWidth * index}px)`;
        slider.style.transition = '.7s';
    }

    const moveToPreviousSlide = () => {
        if (index <= 0) return;

        index--;
        slider.style.transform = `translateX(${-slideWidth * index}px)`;
        slider.style.transition = '.7s';
    }

    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideId);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        clearInterval(slideId);
        startSlide();
    });

    startSlide();
}

// Appear on scroll: Text
window.addEventListener('scroll', appearOnScrollText);

appearOnScrollText();

function appearOnScrollText() {
    const boxes = document.querySelectorAll('.appear-on-scroll');

    const triggerBottom = window.innerHeight / 1.1;

    boxes.forEach(box => {
        if (box.classList.contains('show')) return;

        const boxTop = box.getBoundingClientRect().bottom;

        if (boxTop < triggerBottom) {
            box.classList.add('show');
        }
    });
}

// Appear on scroll: Glitched heading
window.addEventListener('scroll', appearOnScrollGlitchedHeading);

appearOnScrollGlitchedHeading();

function appearOnScrollGlitchedHeading() {
    const headings = document.querySelectorAll('.glitchedHeading');
    const triggerBottom = window.innerHeight / 1.1;

    headings.forEach(heading => {
        const headingBottom = heading.getBoundingClientRect().bottom;
        const headingGlitchLayers = heading.querySelectorAll('.glitch-layer');

        if (headingBottom < triggerBottom) {
            headingGlitchLayers.forEach(headingGlitchLayer => {
                headingGlitchLayer.classList.add('hasGlitched');
                headingGlitchLayer.style.animation = 'glitch-animation-' + 1 + ' 0.5s linear alternate';
            });
        }
    });
}

// Appear on scroll: Glitched image
window.addEventListener('scroll', appearOnScrollGlitchedImage);

appearOnScrollGlitchedImage();

function appearOnScrollGlitchedImage() {
    const glitchedImage = document.querySelectorAll('.glitchedImage');
    const triggerBottom = window.innerHeight / 1.1;

    glitchedImage.forEach(glitchedImage => {
        const imageBottom = glitchedImage.getBoundingClientRect().bottom;
        const image = glitchedImage.firstElementChild;
        const imageGlitchLayers = glitchedImage.querySelectorAll('.glitch-layer');

        if (imageBottom < triggerBottom) {
            image.classList.add("imageHasGlitched");
            imageGlitchLayers.forEach(imageGlitchLayer => {
                imageGlitchLayer.classList.add('hasGlitched');
                imageGlitchLayer.style.animation = 'glitch-animation-' + 1 + ' 0.5s linear alternate';
            });
        }
    });
}