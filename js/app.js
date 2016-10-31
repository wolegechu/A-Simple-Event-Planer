var userName = '';
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		userName = user.displayName;
	} else {
		self.location.href = 'index.html';
	}
});

var database = firebase.database();
var ref = database.ref('events/' + userName);
var tableRef = document.querySelector('#tableEvents');

//display events
ref.orderByKey().once('value').then(function(snapshoot){
	var events = snapshoot.val();
	for(var key in events[userName]){
		var event = events[userName][key];
		var row = tableRef.insertRow(0);
		row.innerHTML = '<th>' + event.name + '</th><th>' + event.type + '</th><th>' + event.host + '</th><th>' + event.startTime + '</th><th>' + event.location + '</th>';
		//console.log(event.name);
	}
});

ref.on('child_changed', function(childSnapshot, prevChildKey) {
	var keys = Object.keys(childSnapshot.val());
	var event = childSnapshot.val()[keys[keys.length-1]];
	
	var row = tableRef.insertRow(0);
	row.innerHTML = '<th>' + event.name + '</th><th>' + event.type + '</th><th>' + event.host + '</th><th>' + event.startTime + '</th><th>' + event.location + '</th>';
		
});

document.querySelector('#submit').onclick = function(){
	// add new event
	var eventName = document.querySelector('#inputEventName').value;
	var type = document.querySelector('#inputType').value;
	var host = document.querySelector('#inputHost').value;
	var startTime = document.querySelector('#inputStartTime').value;
	var endTime = document.querySelector('#inputEndTime').value;
	var guestList = document.querySelector('#inputGuestList').value;
	var location = document.querySelector('#inputLocation').value;
	var comment = document.querySelector('#inputComment').value;

	var postData = {
		name : eventName,
		type : type,
		host : host,
		startTime : startTime,//timestamp
		endTime : endTime,
		guestList : guestList,
		location : location,
		comment : comment,
	};

	// Get a key for a new Post.
	var newPost = database.ref('events/' + userName).push();
	newPost.set(postData);
	alert('Create new event success.');
};
