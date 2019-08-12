var anchors = [];
var currentAnchor = 0;
var isAnimating  = false;

$(function(){
   
    function updateAnchors() {
        anchors = [];
        $('.anchor').each(function(i, element){
            anchors.push( $(element).offset().top );
        });
    }
    
    $('html, body').on('wheel mousewheel DOMMouseScroll MozMousePixelScroll', function(e){
        e.stopPropagation();
        e.preventDefault();
	window.scrollBy({ top: 100, behavior: 'smooth' });
	/*if (isAnimating) { return false; }

	var animation = "easeOutCubic";
	if (!isAnimating) {
		isAnimating  = true;
		if( e.originalEvent.wheelDelta >= 0 || e.originalEvent.deltaY < 0 ) { currentAnchor--;
		} else { currentAnchor++; }
		if( currentAnchor > (anchors.length - 1) ) currentAnchor = anchors.length - 1;
		if( currentAnchor < 0 ) currentAnchor = 0;
		if (currentAnchor == 5) animation = "linear";

		$('html, body').animate({
				scrollTop: (parseInt( anchors[currentAnchor] ) - 100)
			}, {
				duration: 1200,
				specialEasing: { scrollTop: animation },
				complete: function() { isAnimating  = false; }
			}
		);
	}*/
    });
    

    updateAnchors();   
    
});
