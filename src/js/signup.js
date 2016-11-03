var nameInput = document.querySelector('#inputName');
var emailInput = document.querySelector('#inputEmail');
var passwordInput = document.querySelector('#inputPassword');
var repeatPasswordInput = document.querySelector('#inputRepeatPassword');

var submit = document.querySelector('#submit');
var message = document.querySelector('section[data-route="message"]');

var labelName = document.querySelector('#labelName');
var labelEmail = document.querySelector('#labelEmail');
var labelPassword = document.querySelector('#labelPassword');
var labelRepeatPassword = document.querySelector('#labelRepeatPassword');

var startValidity = false,endValidity = false;

function setValidityMsg(label,type,message){
	label.innerHTML = message;
	var div = label.parentNode;
	if( type === 0 ){
		div.classList = ['form-group has-warning'];
	}else if( type === 1){
		div.classList = ['form-group has-success'];
	}
}

emailInput.addEventListener('input' , function(){
	if(emailInput.validationMessage.length === 0){
		setValidityMsg(labelEmail,1,'Email');
	}else{
		setValidityMsg(labelEmail,0,'Email (' + emailInput.validationMessage + ')');
	}
});

passwordInput.addEventListener('input' , function(){
	var password = passwordInput.value;
	if(password.length < 10){
		setValidityMsg(labelPassword,0,'Password (fewer than 10 characters)');
	}else if(password.length > 20){
		setValidityMsg(labelPassword,0,'Password (greater than 20 characters)');
	}else if(!password.match(/[a-z]/g)){
		setValidityMsg(labelPassword,0,'Password (missing a lowercase letter)');
	}else if(!password.match(/[A-Z]/g)){
		setValidityMsg(labelPassword,0,'Password (missing a uppercase letter)');
	}else {
		setValidityMsg(labelPassword,1,'Password');
	}
});

repeatPasswordInput.addEventListener('input' , function(){
	if(repeatPasswordInput.value === passwordInput.value){
		setValidityMsg(labelRepeatPassword,1,'Repeat Password');
	}else{
		setValidityMsg(labelRepeatPassword,0,'Repeat Password (don\'t match)');
	}
});

nameInput.addEventListener('input' , function(){
	if(nameInput.value.length > 1){
		setValidityMsg(labelName,1,'Name');
	}else{
		setValidityMsg(labelName,0,'Name (required)');
	}
});


submit.onclick = function(){

	var password = passwordInput.value;
	var repeatPassword = repeatPasswordInput.value;

	if (password !== repeatPassword) {
		return repeatPasswordInput.setCustomValidity('the password must match');
	} 

	if(!(nameInput.checkValidity() && passwordInput.checkValidity() 
		&& repeatPasswordInput.checkValidity() 
		&& emailInput.checkValidity()))
	{
		message.innerHTML = '<div class="alert alert-danger" role="alert">Please complete the form</div>';
		return;
	}
	
	firebase.auth().createUserWithEmailAndPassword(emailInput.value,password).catch(function(error){
		return message.innerHTML = '<div class="alert alert-danger" role="alert">' + error.message + '.</div>';
	});


	firebase.auth().currentUser.updateProfile({
		displayName : nameInput.value
	}).then(function(){
		setTimeout(function(){
			self.location.href = 'app.html';
		},1500);
	});
		


	message.innerHTML = '<div class="alert alert-success" role="alert">Success</div>';
	return;
	self.location.href = 'app.html';

};