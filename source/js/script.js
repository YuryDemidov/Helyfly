// Script opens/closes popup
var popUp = document.querySelector('.popup');
var openButton = document.querySelectorAll('.popup-open-button');
var closeButton = popUp.querySelector('.popup__close-btn');
var closeArea = popUp.querySelector('.popup__background');
var dateInput = popUp.querySelector('#date-id');

var restoreScrolling = function (container) {
  container.style.overflow = 'initial';
}

for (var i = 0; i <= openButton.length - 1; i++) {
  openButton[i].addEventListener('click', function(evt){
    evt.preventDefault();
    popUp.classList.add('popup--visible');
    dateInput.focus();
    document.body.style.overflow = 'hidden';
  });
}

closeButton.addEventListener('click', function() {
  popUp.classList.remove('popup--visible');
  restoreScrolling(document.body);
});
closeArea.addEventListener('click', function() {
  popUp.classList.remove('popup--visible');
  restoreScrolling(document.body);
});

window.addEventListener('keydown', function() {
  if (event.code == 'Escape') {
    if (popUp.classList.contains('popup--visible')) {
      popUp.classList.remove('popup--visible');
      restoreScrolling(document.body);
    }
  }
});

// Script shows video after clicking on its poster
var videoContainer = document.querySelector('.about-tour__video');
var poster = document.querySelector('.about-tour__poster');
var playButton = document.querySelector('.about-tour__btn-play');

videoContainer.addEventListener('click', function() {
  poster.classList.add('about-tour__js-invisible');
  playButton.classList.add('about-tour__js-invisible');
});

// Script provides the slider function
var slideIndex = 1;
showSlides(slideIndex);

// Function shows next slide
function plusSlide() {
  showSlides(slideIndex += 1);
}

// Function shows previous slide
function minusSlide() {
  showSlides(slideIndex -= 1);
}

// Function sets current slide
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// Main slider function
function showSlides(n) {
  var i;
  var slides = document.querySelectorAll(".photographs__slide");
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
      slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
      slides[i].classList.add('hidden__photo');
  }
  slides[slideIndex - 1].classList.remove('hidden__photo', 'hidden__content');
}

// Script displays full content
// after click on button "Show more"
var containers = document.querySelectorAll('.hidden');

var addButtonClickHandler = function (button, content) {
  button.addEventListener('click', function() {
    for (var j = 0; j < content.length; j++) {
      content[j].classList.remove('hidden__content', 'review--unvisible');
    }
    button.style.display = 'none';
  });
}

for (var i = 0; i < containers.length; i++) {
  var hiddenContent = containers[i].querySelectorAll('.hidden__content');
  var buttonOpenContent = containers[i].querySelector('.hidden__open-button');
  var reviewsCounter = document.querySelector('.reviews__count');

  addButtonClickHandler(buttonOpenContent, hiddenContent);

  if (containers[i].classList.contains('reviews')) {
    reviewsCounter.innerHTML = hiddenContent.length;
  }
}
