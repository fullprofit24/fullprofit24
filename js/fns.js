$(function(){
	/* + Функция ошибочного инпута */
	$('body').on('change blur click focus mousemove','.errorInput',function(){
		$(this).removeClass('errorInput');
	});
	/* - Функция ошибочного инпута */
	bindMainMenuDrop();
	goEl();
	bindYaReachGoal();

	bindPrivacyPolicyPopup();
});
// плавный скрол до элемента
function goEl(){

 $('.go_to').click( function(){
	var scroll_el = $(this).attr('href');
        if ($(scroll_el).length != 0) {
	    $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
        }
        //yaCounter54256198.reachGoal('rgPageServiceAdminTarifs');
	    return false;
    });
}

/**
 * Дроп меню
 */
function bindMainMenuDrop(){
	var ul=$('ul.dropDown');
	if(!ul.size())
		return false;
	$('li.drop',ul).hide();
	ul.on("mouseenter",function(){
		clearTimeout($(this).data('timer'));
		var li=$('li.drop',this);
		if(!li.hasClass('dropped')){
			li.stop().addClass('dropped').css({'margin-top':'-10px','opacity':0,'display':'block'}).animate({'margin-top':0,'opacity':1});
		}
	});
	ul.on("mouseleave",function(){
		var that=$(this);
		var li=$('li.drop',that);
		that.data('timer',setTimeout(function(){
			li.removeClass('dropped');
			li.animate({'margin-top':'-10px','opacity':0},function(){
				li.css({'display':'none'});
			});
		},500));
	});
}

function bindYaReachGoal(){
	$('body').on('click', '.jsReachGoalProject', function(){
		var th = $(this),
			name = th.data('reachgoal'),
			params = {text: $('.name_project',th.parents('.inf_project'))};
		//yaCounter54256198.reachGoal(name, params);
		return true;
	});
	$('body').on('click.reachgoal', '.jsReachGoal', function(){
		var th = $(this),
			name = th.data('reachgoal'),
			params = th.data('params');
		
		//$('textarea[name="msg"]',$('#formOrder')).val('');
		//$('textarea[name="msg"]',$('#formOrder')).val(params.text + '\nСообщение: ');
		if (params.text=='none') {
			$('.my_select_service',$('#formOrder')).css("display","none");
		} else {
			$('.my_select_service',$('#formOrder')).css("display","block");
			$('.my_select_service',$('#formOrder')).html('');
			$('.my_select_service',$('#formOrder')).html(params.text);
		}
		
		//yaCounter54256198.reachGoal(name, params);
		return true;
	});
	$('body').on('click', 'a[href^="tel:"]', function(){
		var href = $(this).attr('href');
		href = href.split('tel:').join('');
		//yaCounter54256198.reachGoal('rgCommonPhone', {href: href});
		return true;
	});
	$('body').on('click', 'a[href^="mailto:"]', function(){
		var href = $(this).attr('href');
		href = href.split('mailto:').join('');
		//yaCounter54256198.reachGoal('rgCommonEmail', {href: href});
		return true;
	});
	$('body').on('submit', '.jsReachGoalForm', function(){
		var th = $(this),
			name = th.data('reachgoal'),
			params = th.data('params');
		//yaCounter54256198.reachGoal(name, params);
		return true;
	});
	$(window).on('scroll',function(e){
		var st=$(window).scrollTop(),
			h=$(window).height();
		$('.jsReachGoalScroll').each(function(){
			var th=$(this),
				t=th.offset().top;
			if ((t > st) && (t < (st + h))) {
				var name = th.data('reachgoal'),
					params = th.data('params');
				th.removeClass('jsReachGoalScroll');
				/*if (typeof yaCounter54256198 != 'undefined')
					yaCounter54256198.reachGoal(name, params);*/
			}
		})
	});
}

/** 
 * Бинды уведомления для пользователей о том, что система собирает метаданные 
 */ 
function bindPrivacyPolicyPopup() { 
  var $popup = $('.privacy-policy-popup'); 
  var $closeButton = $popup.find('span'); 
 
  if (!$popup.length || !$closeButton.length) { 
    return false; 
  } 
 
  setTimeout(function() { 
    $popup.attr('data-shown', ''); 
 
    $closeButton.one('click', function() { 
      $popup.removeAttr('data-shown'); 
 
      $.ajax({ 
        url: '/handlers/privacy', 
        data: { 
          o: { 
            action: 'cookie' 
          } 
        }, 
        method: 'POST', 
        dataType: 'json' 
      }); 
 
      setTimeout(function() { 
        $popup.remove(); 
      }, 1000); 
    }); 
  }, 1000); 
}
