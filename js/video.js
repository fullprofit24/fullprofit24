$(function(){
	bindVideoMain();
});

/**
 * Функционал видео на главной странице
 */
function bindVideoMain(){
	var mini=document.getElementById('videoBigM');
	if(mini){
		mini.addEventListener('canplay', function() {
		  mini.play();
		});
		mini.load();
		mini.volume = 0;
		mini.play();
	}
	var frm=$('#showVideoMain');
	if(!frm.size())
		return false;
	//Остановка произведения и скрытие видео
	$('a.stopVideoMain',frm).on('click',function(){
		var video = document.getElementById("videoBigV");
		video.currentTime=0;
		video.pause();
	});
	//Включить просмотр видео
	var fst=true;
	$('a#showVideoMainPlay').on('click',function(){
		var video = document.getElementById("videoBigV");
		if(fst){
			frm.MGpload({
				click:function(){
					frm.MGpload('stop');
					video.currentTime=0;
					video.pause();
					video.onloadeddata=function(){};
					window.location.hash='#';
				}
			});
			video.load();
			video.onloadeddata=function(){
				fst=false;
				frm.MGpload('stop');
				video.currentTime=0;
				video.play();
			};
		}else{
			video.currentTime=0;
			video.play();
		}
	});
	if(window.location.hash=='#showVideoMain'){
		var video = document.getElementById("videoBigV");
		video.currentTime=0;
		video.play();
	}
	$(window).on('hashchange',function(){
		if(window.location.hash!='#showVideoMain'){
			var video = document.getElementById("videoBigV");
			video.pause();
			video.currentTime=0;
		}
	});
}