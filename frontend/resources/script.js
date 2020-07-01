$(document).ready(function() {
    $("body").scroll(function() {
        var $nav = $(".nav");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
        $nav.toggleClass('over', $(this).scrollTop() > 1900);
    })
})

/* ------------------------ Time ------------------------ */

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var time = h;
    if (h != 12) h = h % 12;
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    if (time >= 12)
        document.getElementById('time').innerHTML =
        h + ":" + m + ":" + s + " PM";
    else
        document.getElementById('time').innerHTML =
        h + ":" + m + ":" + s + " AM";
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i }; // add zero in front of numbers < 10
    return i;
}

/* ------------------------ Drag ------------------------ */
$(function() {
    $("#sortable").sortable();
    $("#sortable").disableSelection();
});