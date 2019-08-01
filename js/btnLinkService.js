// Плавный анимированный переход по якорю с главной страницы
setTimeout(function() {
      if (window.location.hash) {
	  $("html,body").scrollTop("0");
          var hash = window.location.hash;
          var scrollPos = $(hash).offset().top;
	  $('html, body').animate({
			scrollTop: (scrollPos - 100)
		}, 2000, 'swing', function(){
            		//currentAnchor = 5;
	  });
       }
}, 1);

$('.nav-btn-contacts, .btn-toContacts').on('click', function(e){
        $('html, body').animate({
            scrollTop: (parseInt( anchors[1] ) - 100)
        }, 2000, 'swing', function(){
            //currentAnchor = 5; // из скрипта 'scrollBlock.js' - на самый первый блок сайта
        });
});
