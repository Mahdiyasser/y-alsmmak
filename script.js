function openCurtains() {
    var left  = document.querySelector('.leftcurtain');
    var right = document.querySelector('.rightcurtain');
    var rope  = document.querySelector('.rope');
    left.style.transition  = 'width 2s ease-in-out';
    right.style.transition = 'width 2s ease-in-out';
    left.style.width  = '0px';
    right.style.width = '0px';
    rope.style.transition = 'top 0.35s ease-out';
    rope.style.top = '-500px';
    PlaySound();
    // Unlock scrolling after curtains finish opening
    setTimeout(function() {
        document.body.style.overflow = 'auto';
    }, 2100);
}

function PlaySound() {
    var sound = document.getElementById("audiocracker");
    sound.play();
}

// Countdown timer
var countDownDate = new Date("feb 1, 2026 00:00:00").getTime();
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days    = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("demo").innerHTML =
        days + "<font color='blue'> أيام,</font> " +
        hours + "<font color='purple'>  ساعات,</font> " +
        minutes + "<font color='green'> الدقائق,</font><br> " +
        seconds + "<font color='green'> ثواني </font> قبل ";

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "";
    }
}, 1000);
