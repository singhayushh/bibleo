$(document).ready(function() {
    $("body").scroll(function() {
        var $nav = $(".nav");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
        $nav.toggleClass('overview', $(this).scrollTop() > 2000);
    })
})