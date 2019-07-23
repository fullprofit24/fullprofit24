$(function(){
	bindOrderSite();

	$('.btn-close').on('click', function() {
		$('.modal-wrapper').toggleClass('open');
		$('.front, .site').toggleClass('blur-it');
	});
});

/**
 * Форма заказа сайта
 */
function bindOrderSite(){
	var frm=$('#formOrder');
	if(!frm.size())
		return false;
	var func={};
	/* + Работа со слайдером */
	var max=Math.floor(Math.random() * (100000 - 100 + 1)) + 100;
	noUiSlider.create($('.captcha_sub',frm)[0],{
		start:0,
		animate:false,
		range: {
			'min': 0,
			'max': max
		},
	});
	$('.captcha_sub',frm)[0].noUiSlider.on('slide', function(e){
		var val=(e*1/max)*100;
		if(val==100){
			$('.captcha_sub',frm).attr('disabled',true);
			$('.captcha_sub',frm).addClass('success');
		}
	});
	$('.captcha_sub',frm)[0].noUiSlider.on('change', function(num){
		var val=(num*1/max)*100;
		if(val==100){
			$('.captcha_sub',frm).attr('disabled',true);
			$('.captcha_sub',frm).addClass('success');
		}else{
			var d=20,
			b=20,
			e=(num*1)/d; 
			for(var f=0; f<d; f++){
				var c=$(this); 
				setTimeout(function(){
					var i=$('.captcha_sub',frm)[0].noUiSlider.get(); 
					$('.captcha_sub',frm)[0].noUiSlider.set(i-e);
				},b+b*f);
			}
			$('.captcha_sub',frm).removeClass('success');
		}
	});
	/* - Работа со слайдером */
	/* + Маски ввода */
	$('input[name="phone"]',frm).inputmask('+7(999)999-99-99');
	$('input[name="email"]',frm).inputmask({'alias':'email','placeholder':'_'});
	/* - Маски ввода */
	/* + Кнопка закрытия */
	$('.close',frm).on('click',function(){
		func.clean();
		setTimeout(function(){
			$('.order_block.main',frm).show();
			$('.order_block.thanks',frm).hide();
		},500);
	});
	/* - Кнопка закрытия */
	/* + Загрузка файла */
	$('.fileOrder',frm).on('click',function(){
		$('#fileOrder',frm).trigger('click');
		return false;
	});
	$('.delFile',frm).hide().on('click',function(){
		document.getElementById("fileOrder").value="";
		$('#fileOrder',frm).trigger('change');
		return false;
	});
	$('#fileOrder',frm).on('change',function(){
		if($(this).val()===''){
			$('.fileOrder .b_dot',frm).text('Прикрепить файл (до 10 Мб)');
			$('.delFile',frm).hide();
		}else{
			var file=$(this)[0].files[0];
			$('.fileOrder .b_dot',frm).text(file.name);
			$('.delFile',frm).show();
		}
	});
	/* - Загрузка файла */
	/* + Очистка и сабмит формы */
	/* ++ Сабмит формы */
	frm.on('submit',function(){
		func.sbm();
		return false;
	});
	/* -- Сабмит формы */
		/* ++ Очистка формы */
		func.clean=function(){
			setTimeout(function(){
				$('.errorInput',frm).removeClass('errorInput');
				$('.captcha_sub',frm).removeClass('success');
				$('.captcha_sub',frm).attr('disabled',false);
				$('.captcha_sub',frm)[0].noUiSlider.set(0);
				$('input[type="text"]',frm).val('');
				$('textarea',frm).val('');
				document.getElementById("fileOrder").value="";
				$('#fileOrder',frm).trigger('change');
			},500);
		};
		/* -- Очистка формы */

		/* ++ Собрать инфу по инпутам */
		func.getObj=function(){
			var obj={};
			obj.name=$('input[name="name"]',frm).val();
			obj.phone=$('input[name="phone"]',frm).val();
			obj.email=$('input[name="email"]',frm).val();
			obj.msg=$('textarea[name="msg"]',frm).val();
			return obj;
		};
		/* -- Собрать инфу по инпутам */
		/* ++ Реальный сабмит формы */
		func.sbm=function(){
			var err='';
			$('.errorInput',frm).removeClass('errorInput');
			if($('.captcha_sub',frm)[0].noUiSlider.get()!=max){
				err+='Переместите бегунок вправо<br />';
				$('.captcha',frm).addClass('errorInput');
			}
			var obj=func.getObj();
			if(obj.name===''){
				err+='Введите имя<br />';
				$('input[name="name"]',frm).addClass('errorInput');
			}

			// if(obj.phone===''&&obj.email===''){
			// 	err+='Введите Email или Телефон<br />';
			// 	$('input[name="phone"]',frm).addClass('errorInput');
			// 	$('input[name="email"]',frm).addClass('errorInput');
			// }else{
			// 	if(obj.phone!==''){
			// 		if(!$('input[name="phone"]',frm).inputmask('isComplete')){
			// 			err+='Введите телефон полностью<br />';
			// 			$('input[name="phone"]',frm).addClass('errorInput');
			// 		}
			// 	}
			// 	if(obj.email!==''){
			// 		if(!$('input[name="email"]',frm).inputmask('isComplete')){
			// 			err+='Введите email полностью<br />';
			// 			$('input[name="email"]',frm).addClass('errorInput');
			// 		}
			// 	}
			// }
			
			// Проверка на э-мэил
			if(obj.email!==''){
				if(!$('input[name="email"]',frm).inputmask('isComplete')){
					obj.email='nomail-client@noreply.ru'
				}
			} else { obj.email='nomail-client@noreply.ru' }

			if(obj.phone===''){
				err+='Введите телефон<br />';
				$('input[name="phone"]',frm).addClass('errorInput');
			}else{
				if(obj.phone!==''){
					if(!$('input[name="phone"]',frm).inputmask('isComplete')){
						err+='Введите телефон полностью<br />';
						$('input[name="phone"]',frm).addClass('errorInput');
					}
				}
			}
			if(err){
				console.log('Заполните необходимые поля!');
			}else{
				obj.file=0;
				func.hand(obj);
			}
		};
		/* -- Реальный сабмит формы */
		/* ++ Отправка данных в хендлер */
		func.hand=function(obj){

			// Отпрака посредством сервиса через класс MailTo
			var name = obj.name;
			var mail = obj.email;
			var msg = "ТЕЛ.НОМЕР: " + obj.phone + ". " + obj.msg;
			var send_one = false, event_one = false;
			var send_two = false, event_two = false;
			var post_one = new MailTo(name, mail, msg);
			var post_two = new MailTo(name, mail, msg);
			
			// Это асинхронные функции, которые могут исполнится не  по порядку,
			// поэтому делаем итоговую проверку отправки в каждом блоке адресата
			post_one.response(function(isSend) {
				event_one = true;
				if (isSend) {
					// если сообщение отправилось
					console.log("ОТПРАВКА УСПЕШНА :)");
					send_one = true;
					if (send_one && send_two) {
						func.clean();
						$('.order_block.main',frm).slideUp();
						$('.order_block.thanks',frm).slideDown();
					}
				} else {
					// если сообщения не отправились с ошибкой на сервере
					if ((event_one && event_two) && !(send_one || send_two)) {						
						console.log("Ошибка на сервере :-(  Свяжитесь с нами по контактам ниже :-)");
						$('.modal-wrapper').toggleClass('open');
						$('.front, .site').toggleClass('blur-it');
					}
				}
			});
			post_two.response(function(isSend) {
				event_two = true;
				if (isSend) {
					// если сообщение отправилось
					console.log("ОТПРАВКА УСПЕШНА :)");
					send_two = true;
					if (send_one && send_two) {
						func.clean();
						$('.order_block.main',frm).slideUp();
						$('.order_block.thanks',frm).slideDown();
					}
				} else {
					// если сообщения не отправились с ошибкой на сервере
					if ((event_one && event_two) && !(send_one || send_two)) {						
						console.log("Ошибка на сервере :-(  Свяжитесь с нами по контактам ниже :-)");
						$('.modal-wrapper').toggleClass('open');
						$('.front, .site').toggleClass('blur-it');
					}
				}
			});

			//obj.mode='sendorder';
			post_one.send('mr.gifo@yandex.ru',
				  'Martin',
				  'Вопрос с Сайта FULLPROFIT!');
			post_two.send('alexanderr58@bk.ru',
				  'Alex',
				  'Вопрос с Сайта FULLPROFIT!');


		};
		/* -- Отправка данных в хендлер */
	/* - Очистка и сабмит формы */



	/* + Кнопка в спасибо */
	$('.again',frm).on('click',function(){
		$('.order_block.main',frm).slideDown();
		$('.order_block.thanks',frm).slideUp();
		return false;
	});
	/* - Кнопка в спасибо */
}
