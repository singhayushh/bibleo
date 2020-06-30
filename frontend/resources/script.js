$(document).ready(function() {
    $("body").scroll(function() {
        var $nav = $(".nav");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
        $nav.toggleClass('over', $(this).scrollTop() > 1900);
    })
})