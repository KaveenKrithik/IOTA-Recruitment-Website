let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

// Throttle function to optimize scroll event
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Scroll functionality for highlighting active navbar link
window.onscroll = throttle(() => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navlinks.forEach((link) => {
        link.classList.remove('active');
        document.querySelector(`header nav a[href*="${id}"]`).classList.add('active');
      });
    }
  });
}, 100);

// Toggle the menu icon and the navbar visibility on smaller screens
menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    // Scrolling down
    header.classList.add('hide');
  } else {
    // Scrolling up
    header.classList.remove('hide');
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});

// Additional logic for responsive behavior (if needed)
function handleResponsiveBehavior() {
  if (window.innerWidth <= 768) {
    navbar.classList.add('mobile');
  } else {
    navbar.classList.remove('mobile');
  }
}

window.addEventListener('resize', handleResponsiveBehavior);
handleResponsiveBehavior(); 

