// //Get the button:
// mybutton = document.getElementById("top");
// mybutton.addEventListener("click", function() {topFunction()})
// // When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// }


// // When the user clicks on the button, scroll to the top of the document
// function topFunction() {
//   document.body.scrollTop = 0; // For Safari
//   document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
// }

/// navigation javascript ///////


var $nav = $('.greedy-nav');
var $btn = $('.greedy-nav button');
var $vlinks = $('.greedy-nav .visible-links');
var $hlinks = $('.greedy-nav .hidden-links');

var breaks = [];

function updateNav() {

var availableSpace = $btn.hasClass('hidden') ? $nav.width() : $nav.width() - $btn.width() - 30;

// The visible list is overflowing the nav
if($vlinks.width() > availableSpace) {

// Record the width of the list
breaks.push($vlinks.width());

// Move item to the hidden list
$vlinks.children().last().prependTo($hlinks);

// Show the dropdown btn
if($btn.hasClass('hidden')) {
$btn.removeClass('hidden');
}

// The visible list is not overflowing
} else {

// There is space for another item in the nav
if(availableSpace > breaks[breaks.length-1]) {

// Move the item to the visible list
$hlinks.children().first().appendTo($vlinks);
breaks.pop();
}

// Hide the dropdown btn if hidden list is empty
if(breaks.length < 1) {
$btn.addClass('hidden');
$hlinks.addClass('hidden');
}
}

// Keep counter updated
$btn.attr("count", breaks.length);

// Recur if the visible list is still overflowing the nav
if($vlinks.width() > availableSpace) {
updateNav();
}

}

// Window listeners

$(window).resize(function() {
updateNav();
});

$btn.on('click', function() {
$hlinks.toggleClass('hidden');
});

updateNav();

