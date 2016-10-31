var nameInput = document.querySelector('#inputName');
var emailInput = document.querySelector('#inputEmail');
var passwordInput = document.querySelector('#inputPassword');
var repeatPasswordInput = document.querySelector('#inputRepeatPassword');
var birthdayInput = document.querySelector('#InputBirthday');

var submit = document.querySelector('#submit');


submit.onclick = function(){
	function checkRequirements(){
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

	if (password === repeatPassword) {
		checkRequirements();
	} else {
		return repeatPasswordInput.setCustomValidity('the password must match');
	}

	firebase.auth().createUserWithEmailAndPassword(emailInput.value,password).catch(function(error){
		
	});

	firebase.auth().onAuthStateChanged(function(user){
		if(user){
			user.updateProfile({
				displayName : nameInput.value
			}).then(function(){
				alert('Success!Now you can use the Planner.');
			});
		}else{
			alert('Failed,please try again.');
		}
	});


};