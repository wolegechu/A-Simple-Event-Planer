//self.location.href='';
firebase.auth().onAuthStateChanged(function(user) {
	console.log(user);
	if (user) {
		// User is signed in.
		alert('Welcome!');
		self.location.href = 'app.html';
	} 
});


var submit = document.querySelector('#submit');
submit.onclick = function(){
	var email = document.querySelector('#inputEmail').value;
	var password = document.querySelector('#inputPassword').value;
	console.log(firebase);
	firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error){
		alert(error.message);
	});
};