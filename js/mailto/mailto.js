/* Класс MailTo создаёт объект отправителя рассылки с полями - имя, почта оправителя, письмо.
   Каждый раз вызывая метод send текущего объекта, вы можете рассылать письмо по новым адресам.
   Класс использует сервис sendinblue для почтовых рассылок.
   @autor: mr.gifo */

var mailto_maxDestination = 4; // максимальное количество адресатов на одну инициализацию
var mailto_countDestination = 0;

// Конструктор
function MailTo(sender_name, sender_email, message) {
	mailto_countDestination++;
	this.count = mailto_countDestination;
	this.sender = (mailto_countDestination > mailto_maxDestination) ? 'error' : sender_name;
	this.email = (mailto_countDestination > mailto_maxDestination) ? 'error' : sender_email;
	this.message = (mailto_countDestination > mailto_maxDestination) ? 'error' : message;
}

// Обнуление класса и его объектов
MailTo.init = function() {
	mailto_countDestination = 0;
}

// Каждому из 4-х возможных адресатов соответствует отдельный callback-response
MailTo.prototype.callbackToSendOne = function() {}
MailTo.prototype.callbackToSendTwo = function() {}
MailTo.prototype.callbackToSendTree = function() {}
MailTo.prototype.callbackToSendFour = function() {}

// Callback метод - позволяет получить статус отправки текущего письма (true/false)
MailTo.prototype.response = function(callback) {
	if (this.count===1) callbackToSendOne = callback;
	if (this.count===2) callbackToSendTwo = callback;
	if (this.count===3) callbackToSendTree = callback;
	if (this.count===4) callbackToSendFour = callback;
}

// Метод отправки письма получателю
// Поля - email получателя, имя (название организации) получателя, тема (заголовок) письма
MailTo.prototype.send = function(target_email, target_addressee, title_message) {
	if (this.count > mailto_maxDestination) {
		console.log('LOG: MailTo - error send the message, need to hold init()!');
	} else {
		var count = this.count;
		var xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		xmlhttp.open('POST', 'https://api.sendinblue.com/v3/smtp/email');
		xmlhttp.setRequestHeader('Content-Type', 'application/json');
		xmlhttp.setRequestHeader('api-key', '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');
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				var is_send = (xmlhttp.status == 201) ? true : false;
				if (count===1) callbackToSendOne(is_send);
				if (count===2) callbackToSendTwo(is_send);
				if (count===3) callbackToSendTree(is_send);
				if (count===4) callbackToSendFour(is_send);
				console.log('this-count=',count);
			}
		}
		xmlhttp.send(JSON.stringify({
			"sender": {
				"name": this.sender,
				"email": this.email
			},
			"htmlContent": "<p> " + this.message + " </p>",
			"subject": title_message,
			"replyTo": {
				"email": this.email,
				"name": this.sender
			},
			"to": [{
				"email": target_email,
				"name": target_addressee
			}]
		}));
	}
}
