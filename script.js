// Carousel functionality
class Carousel {
    constructor(element) {
        this.carousel = element;
        this.slides = this.carousel.querySelectorAll('.carousel-slide');
        this.dots = document.querySelectorAll('.carousel-dots .dot');
        this.currentSlide = 0;
        this.slideCount = this.slides.length;
        this.autoPlayInterval = null;
        
        this.init();
    }

    init() {
        // Create navigation buttons if they don't exist
        if (!this.carousel.querySelector('.carousel-nav')) {
            this.createNavigation();
        }

        // Add event listeners
        this.addEventListeners();

        // Start autoplay
        this.startAutoPlay();

        // Show first slide
        this.showSlide(0);
    }

    createNavigation() {
        const nav = document.createElement('div');
        nav.className = 'carousel-nav';
        
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-prev';
        prevBtn.innerHTML = '&#10094;';
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-next';
        nextBtn.innerHTML = '&#10095;';
        
        nav.appendChild(prevBtn);
        nav.appendChild(nextBtn);
        this.carousel.appendChild(nav);
    }

    addEventListeners() {
        const prevBtn = this.carousel.querySelector('.carousel-prev');
        const nextBtn = this.carousel.querySelector('.carousel-next');

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
            nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Dots navigation
        if (this.dots.length) {
            this.dots.forEach((dot, idx) => {
                dot.addEventListener('click', () => this.showSlide(idx));
            });
        }

        // Pause autoplay on hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }

    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active');
        });
        // Show the current slide
        this.slides[index].style.display = 'flex';
        this.slides[index].classList.add('active');
        this.currentSlide = index;
        // Update dots
        if (this.dots.length) {
            this.dots.forEach(dot => dot.classList.remove('active'));
            this.dots[index].classList.add('active');
        }
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slideCount;
        this.showSlide(next);
    }

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
        this.showSlide(prev);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

// Modal functionality
function openModal() {
    document.getElementById('modal-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
    // Carousel
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => new Carousel(carousel));

    // Modal
    const addSkillBtn = document.getElementById('add-skill-btn');
    const cancelModalBtn = document.getElementById('cancel-modal');
    const addSkillModalBtn = document.getElementById('add-skill-modal');
    const modalOverlay = document.getElementById('modal-overlay');

    addSkillBtn.addEventListener('click', openModal);
    cancelModalBtn.addEventListener('click', closeModal);
    addSkillModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}); 