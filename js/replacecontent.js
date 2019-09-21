// калалог заголовков и селекторов
var content = {
    direct: [
    	{
    	selector: '#home_point > div.contentContainer > div.videoMain.videoMainIndex.magic_100 > div.block_btn_video > h1',
    	content: 'Настройка и ведение Яндекс Директ'
    	},
    	{
    	selector: '#home_point > div.contentContainer > div.videoMain.videoMainIndex.magic_100 > div.block_btn_video > p',
    	content: 'Эффективная настройка контекстной рекламы в Яндекс Директ от 5000р., ведение от 3000 руб.!'
    	}
    ],
    ads: [
        {
        selector: '#home_point > div.contentContainer > div.videoMain.videoMainIndex.magic_100 > div.block_btn_video > h1',
        content: 'Настройка и ведение Google Ads'
        },
        {
    	selector: '#home_point > div.contentContainer > div.videoMain.videoMainIndex.magic_100 > div.block_btn_video > p',
    	content: 'Эффективная настройка контекстной рекламы в Google Ads от 5000р., ведение от 3000 руб.!'
        }
    ]
};

// заменяет контент
function replacer(content, utm) {
    if (utm in content) {
        for (i in content[utm]) {
        	if(document.querySelector(content[utm][i]['selector'])!=null) {document.querySelector(content[utm][i]['selector']).innerHTML=content[utm][i]['content'];};
        };
    } else {
        console.log("Каталог контента не имеет такой utm метки");
    };
};


// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// записывает utm в cookie на 30 дней
function setCookie(utm) {
	var date = new Date(new Date().getTime() + (30*24*60*60*1000));
	document.cookie = 'utm_replace=' + utm + '; path=/; expires=' + date.toUTCString();
};

// объединяет все функции в один алгоритм
function replacerMain(content) {
	// check is there utm in url
	if (/utm_replace=([^&]*)/g.exec(document.URL)) {
		var utm = /utm_replace=([^&]*)/g.exec(document.URL)[1];
		} else {
		var utm = null
	};

	if (utm != null) {
		replacer(content, utm);
		setCookie(utm);
	} else if (getCookie('utm_replace') != undefined) {
		replacer(content, getCookie('utm_replace'));
	} else {
		console.log('UTM replacer не нашел метку ни в URL, ни в cookie')
	};
};
replacerMain(content);
