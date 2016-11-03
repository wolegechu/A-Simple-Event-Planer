var nameInput = document.querySelector('#inputName');
var emailInput = document.querySelector('#inputEmail');
var passwordInput = document.querySelector('#inputPassword');
var repeatPasswordInput = document.querySelector('#inputRepeatPassword');

var submit = document.querySelector('#submit');
var message = document.querySelector('section[data-route="message"]');


submit.onclick = function(){
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