


let html = document.documentElement;
let body = document.body;

let scroller = {
    target: document.querySelector("#js-scroll-content"),
    ease: 0.08, // <= scroll speed
    endY: 0,
    y: 0,
    resizeRequest: 1,
    scrollRequest: 0,
};

let requestId = null;

TweenLite.set(scroller.target, {
    rotation: 0.001,
    force3D: true,
});

window.addEventListener("load", onLoad);

function onLoad() {
    updateScroller();
    window.focus();
    window.addEventListener("resize", onResize);
    document.addEventListener("scroll", onScroll);
}

function updateScroller() {
   let resized = scroller.resizeRequest > 0;

    if (resized) {
        let height = scroller.target.clientHeight;
        body.style.height = height + "px";
        scroller.resizeRequest = 0;
    }

 let scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

    scroller.endY = scrollY;
    scroller.y += (scrollY - scroller.y) * scroller.ease;

    if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
        scroller.y = scrollY;
        scroller.scrollRequest = 0;
    }

    TweenLite.set(scroller.target, {
        y: -scroller.y,
    });

    requestId =
        scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
}

function onScroll() {
    scroller.scrollRequest++;
    if (!requestId) {
        requestId = requestAnimationFrame(updateScroller);
    }
}

function onResize() {
    scroller.resizeRequest++;
    if (!requestId) {
        requestId = requestAnimationFrame(updateScroller);
    }
}

jQuery(".filters").on("click", function() {
    setTimeout(function() {
        onScroll();
        onResize();
    }, 1000);
});

document.querySelector(".filters li").addEventListener("click", onResize);
document.querySelector(".filters li").addEventListener("click", onScroll);

// Scroll to top

const scrolltotop = document.querySelector(".scrolltop");

scrolltotop.addEventListener("click", () =>
    gsap.to(window, {
        scrollTo: 0,
    })
);

// Scroll to Section

let sections = $('section'),
    nav = $('.foody-nav-menu , .banner-btn'),
    nav_height = nav.outerHeight();

nav.find('a').on('click', function() {
    var $el = $(this),
        id = $el.attr('href');

    $('html, body').animate({
        scrollTop: $(id).offset().top - nav_height
    }, 500);

    return false;
});