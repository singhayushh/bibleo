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

/* ---------------------- Add-Book ---------------------- */

$('div.add-btn').click(function() {
    $(".popup").css({ "display": "flex" });
});

$('div.close-btn').click(function() {
    $(".popup").css({ "display": "none" });
});


/* --------------------- Book-Cover --------------------- */

$(window).on("load", function() {
    var $pic = $(".image").text().trim().split(" ");
    for(var $i = 0; $i < $pic.length; $i++) {
        if ($pic[$i] === "default") {
            $pic[$i] = `./resources/img/book-cover/5.png`
        }
        $(`li:nth-child(${$i + 1}) img`).attr("src", $pic[$i].toString());
    }
    
});
