'use strict';

window.onscroll = function () {
  TestimonialRandomizer.init();
};
const TestimonialRandomizer = {
  people: [],
  getFiveRandomIndex() {
    const fiveRandIndexFromPeople = new Set();
    while (fiveRandIndexFromPeople.size < 5) {
      fiveRandIndexFromPeople.add(Math.floor(Math.random() * this.people.length));
    }
    return Array.from(fiveRandIndexFromPeople);
  },
  fillTestimonialArea() {
    const fiveWinner = this.getFiveRandomIndex().map(index => this.people[index]);
    for (let i = 0; i < fiveWinner.length; i += 1) {
      $(`#testim-content div:nth-child(${i + 1}) img`).attr('src', fiveWinner[i].picture);
      $(`#testim-content div:nth-child(${i + 1}) .h4`).text(`${fiveWinner[i].name.first} ${fiveWinner[i].name.last}`);
      $(`#testim-content div:nth-child(${i + 1}) p`).html(`${fiveWinner[i].greeting}`);
    }
  },
  getData(data) {
    this.people = data;
    this.fillTestimonialArea();
  },
  getJSON() {
    $.getJSON("http://46.101.237.11/json/users.json", (data) => { this.getData(data); });
  },
  init() {
    this.getJSON();
  },
};


/*
function scrolledWindow() {
  const nav = document.querySelector('.fixed-top');
  const top = document.body.scrollTop || document.documentElement.scrollTop
  if (top !== 0) {
    nav.classList.add('scrolled-nav');
  } else {
    nav.classList.remove('scrolled-nav');
  }
}
// open modals with jquery
$(document).ready(() => {
  $('#privacyAnchor').click(() => {
    $('#privacy').modal();
  });
});
$(document).ready(() => {
  $('#termsAnchor').click(() => {
    $('#terms').modal();
  });
});
$(document).ready(() => {
  $('#faqAnchor').click(() => {
    $('#faq').modal();
  });
});

const data = [];
$.getJSON("http://46.101.237.11/json/users.json", function (data) {
  this.data = data;
  console.log(data);

})*/

let testim = document.getElementById("testim"),
  testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
  testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
  testimLeftArrow = document.getElementById("left-arrow"),
  testimRightArrow = document.getElementById("right-arrow"),
  testimSpeed = 4500,
  currentSlide = 0,
  currentActive = 0,
  testimTimer,
  touchStartPos,
  touchEndPos,
  touchPosDiff,
  ignoreTouch = 30;
;

window.onload = function onload() {

  // Testim Script
  function playSlide(slide) {
    for (var k = 0; k < testimDots.length; k++) {
      testimContent[k].classList.remove("active");
      testimContent[k].classList.remove("inactive");
      testimDots[k].classList.remove("active");
    }

    if (slide < 0) {
      slide = currentSlide = testimContent.length - 1;
    }

    if (slide > testimContent.length - 1) {
      slide = currentSlide = 0;
    }

    if (currentActive != currentSlide) {
      testimContent[currentActive].classList.add("inactive");
    }
    testimContent[slide].classList.add("active");
    testimDots[slide].classList.add("active");

    currentActive = currentSlide;

    clearTimeout(testimTimer);
    testimTimer = setTimeout(function () {
      playSlide(currentSlide += 1);
    }, testimSpeed)
  }

  testimLeftArrow.addEventListener("click", function () {
    playSlide(currentSlide -= 1);
  })

  testimRightArrow.addEventListener("click", function () {
    playSlide(currentSlide += 1);
  })

  for (var l = 0; l < testimDots.length; l++) {
    testimDots[l].addEventListener("click", function () {
      playSlide(currentSlide = testimDots.indexOf(this));
    })
  }

  playSlide(currentSlide);

  // keyboard shortcuts
  document.addEventListener("keyup", function (e) {
    switch (e.keyCode) {
      case 37:
        testimLeftArrow.click();
        break;

      case 39:
        testimRightArrow.click();
        break;

      case 39:
        testimRightArrow.click();
        break;

      default:
        break;
    }
  })

  testim.addEventListener("touchstart", function (e) {
    touchStartPos = e.changedTouches[0].clientX;
  })

  testim.addEventListener("touchend", function (e) {
    touchEndPos = e.changedTouches[0].clientX;

    touchPosDiff = touchStartPos - touchEndPos;

    console.log(touchPosDiff);
    console.log(touchStartPos);
    console.log(touchEndPos);


    if (touchPosDiff > 0 + ignoreTouch) {
      testimLeftArrow.click();
    } else if (touchPosDiff < 0 - ignoreTouch) {
      testimRightArrow.click();
    } else {
      return;
    }

  })
}