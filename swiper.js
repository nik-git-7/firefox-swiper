const SPEED = 4;
const MIN_DELTA = 100;

let totalWheel = 0;
let timeout;
let html = document.querySelector('body');
let allowWheel = true;

let clear = function() {
    timeout = setTimeout(function () {
        allowWheel = false;
        totalWheel = 0;
        html.style.transition = "transform 100ms";
        html.style.transform = "translateX(" + totalWheel + "px)";
        setTimeout(function () {
            allowWheel = true;
            html.style.transition = "transform 0ms";
        }, 500);
    }, 100);
};

let back = function () {
    allowWheel = false;
    totalWheel = 0;
    html.style.transition = "transform 200ms";
    html.style.transform = "translateX(100vw)";
    setTimeout(function () {
        window.history.back();
        html.style.transform = "translateX(0)";
        setTimeout(function () {
            allowWheel = true;
            html.style.transition = "transform 0ms";
        }, 1000);
    }, 100);
};

let forward = function () {
    allowWheel = false;
    totalWheel = 0;
    html.style.transition = "transform 200ms";
    html.style.transform = "translateX(-100vw)";
    setTimeout(function () {
        window.history.forward();
        html.style.transform = "translateX(0)";
        setTimeout(function () {
            allowWheel = true;
            html.style.transition = "transform 0ms";
        }, 1000);
    }, 100);
};

/*document.addEventListener("touchstart", function (e) {
    console.log("Hello World")
});
document.addEventListener("touchend", function (e) {
    console.log("Hello World")
});*/
window.addEventListener("wheel", function (e) {
    if (allowWheel) {
        fire(e.deltaX);
    }
});

function fire(deltaX) {
    clearTimeout(timeout);
    totalWheel -= SPEED * deltaX;
    html.style.transform = "translateX(" + totalWheel + "px)";
    if (totalWheel > MIN_DELTA) {
        back();
    } else if (totalWheel < -1 * MIN_DELTA) {
        forward();
    } else {
        clear();
    }
}
