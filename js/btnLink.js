$(window).scroll(function(){
  var target = $('.cd-hero');
  var targetPos = target.offset().top;
  var winHeight = $(window).height();
  var scrollToElem = targetPos - winHeight;
  var winScrollTop = $(window).scrollTop();
  if(winScrollTop > scrollToElem){
    $('.site_top').addClass('active');
  } else {
    $('.site_top').removeClass('active');
  }
});


$('.site_top, .nav-btn-home').on('click', function(e){
        $('html, body').animate({
            scrollTop: 0
        }, 2000, 'swing', function(){
            currentAnchor = 0; // из скрипта 'scrollBlock.js' - на самый первый блок сайта
        });
});
$('.arrowDown').on('click', function(e){
	$('html, body').animate({
			scrollTop: (parseInt( anchors[1] ) - 100)
		}, {
			duration: 1200,
			specialEasing: { scrollTop: 'easeOutCubic' },
			complete: function() {
				currentAnchor = 1; // из скрипта 'scrollBlock.js' - на самый первый блок сайта
			}
		}
	);
});
$('.nav-btn-about').on('click', function(e){
        $('html, body').animate({
            scrollTop: (parseInt( anchors[4] ) - 100)
        }, 2000, 'swing', function(){
            currentAnchor = 4; // из скрипта 'scrollBlock.js' - на самый первый блок сайта
        });
});
$('.nav-btn-services').on('click', function(e){
        $('html, body').animate({
            scrollTop: (parseInt( anchors[1] ) - 100)
        }, 2000, 'swing', function(){
            currentAnchor = 1; // из скрипта 'scrollBlock.js' - на самый первый блок сайта
        });
});
$('.nav-btn-politics').on('click', function(e){
        $('html, body').animate({
            scrollTop: (parseInt( anchors[2] ) - 100)
        }, 2000, 'swing', function(){
            currentAnchor = 2; // из скрипта 'scrollBlock.js' - на самый первый блок сайта
        });
});
$('.nav-btn-contacts, .btn-toContacts').on('click', function(e){
        $('html, body').animate({
            scrollTop: (parseInt( anchors[5] ) - 100)
        }, 2000, 'swing', function(){
            currentAnchor = 5; // из скрипта 'scrollBlock.js' - на самый первый блок сайта
        });
});