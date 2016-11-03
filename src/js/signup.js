var nameInput = document.querySelector('#inputName');
var emailInput = document.querySelector('#inputEmail');
var passwordInput = document.querySelector('#inputPassword');
var repeatPasswordInput = document.querySelector('#inputRepeatPassword');
var birthdayInput = document.querySelector('#inputBirthday');

var submit = document.querySelector('#submit');
var message = document.querySelector('section[data-route="message"]');

var labelName = document.querySelector('#labelName');
var labelEmail = document.querySelector('#labelEmail');
var labelPassword = document.querySelector('#labelPassword');
var labelRepeatPassword = document.querySelector('#labelRepeatPassword');
var labelBirthday = document.querySelector('#labelBirthday');

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
	if(emailInput.value.length > 1){
		setValidityMsg(labelEmail,1,'Email');
	}else{
		setValidityMsg(labelEmail,0,'Email (required)');
	}
});

passwordInput.addEventListener('input' , function(){
	var password = passwordInput.value;
	if(password.length < 16){
		setValidityMsg(labelPassword,0,'Password (fewer than 16 characters)');
	}else if(password.length > 30){
		setValidityMsg(labelPassword,0,'Password (greater than 30 characters)');
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

birthdayInput.addEventListener('input' , function(){
	if(birthdayInput.value.length > 1){
		setValidityMsg(labelBirthday,1,'Birthday');
	}else{
		setValidityMsg(labelBirthday,0,'Birthday (required)');
	}
});

nameInput.addEventListener('input' , function(){
	if(nameInput.value.length > 1){
		setValidityMsg(labelName,1,'Name');
		validation = true;
	}else{
		setValidityMsg(labelName,0,'Name (required)');
		validation = false;
	}
});





function checkRequirements(password){
	if (password.length < 16) {
		return passwordInput.setCustomValidity('fewer than 16 characters');
	}else if(password.length > 30){
		return passwordInput.setCustomValidity('greater than 30 characters');
	}

	if (!password.match(/[a-z]/g)) {
		return passwordInput.setCustomValidity('missing a lowercase letter');
	}

	if (!password.match(/[A-Z]/g)) {
		return passwordInput.setCustomValidity('missing a uppercase letter');
	}
}

submit.onclick = function(){

	var password = passwordInput.value;
	var repeatPassword = repeatPasswordInput.value;

	checkRequirements(password);

	if (password !== repeatPassword) {
		return repeatPasswordInput.setCustomValidity('the password must match');
	} 
	
	
	firebase.auth().createUserWithEmailAndPassword(emailInput.value,password).catch(function(error){
		
	});

	firebase.auth().onAuthStateChanged(function(user){
		if(user){
			user.updateProfile({
				displayName : nameInput.value
			}).then(function(){
				
				message.innerHTML = '<div class="alert alert-success" role="alert">Success</div>';
				setTimeout(function(){
					self.location.href = 'app.html';
				},1500);

				
			});
		}else{
			message.innerHTML = '<div class="alert alert-danger" role="alert">Failed,please try again</div>';
		}
	});


};