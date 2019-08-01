setTimeout(function() {
      if (window.location.hash) {   
          var hash = window.location.hash.substr(1);
          var scrollPos = $('a[name="'+hash+'"]').offset().top;
          $("html, body").animate({ scrollTop: scrollPos }, 1000);
       }
}, 1);

$('.nav-btn-contacts, .btn-toContacts').on('click', function(e){
        $('html, body').animate({
            scrollTop: (parseInt( anchors[1] ) - 100)
        }, 2000, 'swing', function(){
            //currentAnchor = 5; // из скрипта 'scrollBlock.js' - на самый первый блок сайта
        });
});
