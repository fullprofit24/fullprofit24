$(function(){
	bindClientsSlider();
});

/**
 * Бинд слайдера клиентов на главной
 */
function bindClientsSlider(){
	var slider=$(".slider_clients");
	if(!slider.size())
		return false;
	$("#owl-clients").owlCarousel({
		"items":4,
		"autoplay":true,
		"autoplayTimeout":10000,
		"autoplayHoverPause":true,
		"loop":true,
		"responsive":false
	});
	$("a.btn_slider_cl").on('click',function(){
		$("#owl-clients").trigger(($(this).is(".prev")?"prev.":"next.")+"owl.carousel");
		return false;
	});
}