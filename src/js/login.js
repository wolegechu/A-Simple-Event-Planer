//self.location.href='';
var home = document.querySelector('section[data-route="home"]');

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		// User is signed in.
		home.innerHTML = '<div class="alert alert-success" role="alert">Welcome!</div>';
		setTimeout(function(){
			self.location.href = 'app.html';
		},2000);
	} 
});

var submit = document.querySelector('#submit');
var inputEmail = document.querySelector('#inputEmail');
var inputPassword = document.querySelector('#inputPassword');

submit.disabled = true;
function submitAbility(){
	if(inputEmail.value.length > 0 && inputPassword.value.length > 0){
		submit.disabled = false;
	}else {
		submit.disabled = true;
	}
}

inputEmail.addEventListener('input',submitAbility);
inputPassword.addEventListener('input',submitAbility);

submit.onclick = function(){
	var email = inputEmail.value;
	var password = inputPassword.value;
	console.log(firebase);
	firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error){
		home.innerHTML = '<div class="alert alert-danger" role="alert">' + error.message + '</div>';
	});
};