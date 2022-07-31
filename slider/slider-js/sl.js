// selectors
const slides = document.querySelectorAll('.slide');

//events


slides.forEach(slide => {
    slide.addEventListener('click', () => {
        document.querySelector('.slide.active').classList.remove('active');
        slide.classList.add('active');
    });
});

const random = max => Math.floor(Math.random()*max);

const index = random(slides.length);
slides[index].classList.add('active');