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

var inputLocation = document.querySelector('#inputLocation');
var eventName = document.querySelector('#inputEventName');
var startTime = document.querySelector('#inputStartTime');
var endTime = document.querySelector('#inputEndTime');
var host = document.querySelector('#inputHost');
var guestList = document.querySelector('#inputGuestList');
var comment = document.querySelector('#inputComment');
var type = document.querySelector('#inputType');


var labelEventName = document.querySelector('#labelEventName');
var labelStartTime = document.querySelector('#labelStartTime');
var labelEndTime = document.querySelector('#labelEndTime');
var labelHost = document.querySelector('#labelHost');
var labelLocation = document.querySelector('#labelLocation');
var labelComment = document.querySelector('#labelComment');
var labelType = document.querySelector('#labelType');
var validation = false;

function setValidityMsg(label,type,message){
	label.innerHTML = message;
	var div = label.parentNode;
	if( type === 0 ){
		div.classList = ['form-group has-warning'];
	}else if( type === 1){
		div.classList = ['form-group has-success'];
	}
}


var startTimestamp,endTimestamp;
var currentTimestamp = new Date();


(function realtimeCheck(){
	eventName.addEventListener('input' , function(){
		if(eventName.value.length > 1){
			setValidityMsg(labelEventName,1,'Event Name');
			validation = true;
		}else{
			setValidityMsg(labelEventName,0,'Event Name (required)');
			validation = false;
		}
	});

	type.addEventListener('input' , function(){
		if(type.value.length > 1){
			setValidityMsg(labelType,1,'Event Type');
			validation = true;
		}else{
			setValidityMsg(labelType,0,'Event Type (required)');
			validation = false;
		}
	});

	inputLocation.addEventListener('input' , function(){
		if(inputLocation.value.length > 1){
			setValidityMsg(labelLocation,1,'Location');
			validation = true;
		}else{
			setValidityMsg(labelLocation,0,'Location (required)');
			validation = false;
		}
	});

	comment.addEventListener('input' , function(){
		if(comment.value.length > 1){
			setValidityMsg(labelComment,1,'Comment');
			validation = true;
		}else{
			setValidityMsg(labelComment,0,'Comment (required)');
			validation = false;
		}
	});

	host.addEventListener('input' , function(){
		if(host.value.length > 1){
			setValidityMsg(labelHost,1,'Host');
			validation = true;
		}else{
			setValidityMsg(labelHost,0,'Host (required)');
			validation = false;
		}
	});

	startTime.addEventListener('keyup' , function(){
		startTimestamp = new Date(startTime.value);
		if(startTimestamp > currentTimestamp){
			setValidityMsg(labelStartTime,1,'Start Time');
			validation = true;
		}else{
			setValidityMsg(labelStartTime,0,'Start Time (it should start in the future)');
			validation = false;
		}
	});

	endTime.addEventListener('keyup' , function(){
		endTimestamp = new Date(endTime.value);
		if(endTimestamp > startTimestamp){
			setValidityMsg(labelEndTime,1,'End Time');
			validation = true;
		}else{
			setValidityMsg(labelEndTime,0,'End Time (End date-time should take place after Start date-time)');
			validation = false;
		}
	});

}());


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
	if(eventName.value.length > 1){
		setValidityMsg(labelEventName,1,'Event Name');
		validation = true;
	}else{
		setValidityMsg(labelEventName,0,'Event Name (required)');
		validation = false;
	}

	if(inputLocation.value.length > 1){
		setValidityMsg(labelLocation,1,'Location');
		validation = true;
	}else{
		setValidityMsg(labelLocation,0,'Location (required)');
		validation = false;
	}

	if(comment.value.length > 1){
		setValidityMsg(labelComment,1,'Comment');
		validation = true;
	}else{
		setValidityMsg(labelComment,0,'Comment (required)');
		validation = false;
	}

	if(host.value.length > 1){
		setValidityMsg(labelHost,1,'Host');
		validation = true;
	}else{
		setValidityMsg(labelHost,0,'Host (required)');
		validation = false;
	}

	startTimestamp = new Date(startTime.value);
	if(startTimestamp > currentTimestamp){
		setValidityMsg(labelStartTime,1,'Start Time');
		validation = true;
	}else{
		setValidityMsg(labelStartTime,0,'Start Time (it should start in the future)');
		validation = false;
	}

	endTimestamp = new Date(endTime.value);
	if(endTimestamp > startTimestamp){
		setValidityMsg(labelEndTime,1,'End Time');
		validation = true;
	}else{
		setValidityMsg(labelEndTime,0,'End Time (End date-time should take place after Start date-time)');
		validation = false;
	}

	if(validation === false) return;


	var postData = {
		name : eventName.value,
		type : type.value,
		host : host.value,
		startTime : startTime.value,//timestamp
		endTime : endTime.value,
		guestList : guestList.value,
		location : inputLocation.value,
		comment : comment.value,
	};
	var newPost = database.ref('events/' + userName).push();
	newPost.set(postData);
	var message = document.querySelector('section[data-route="message"]');
	message.innerHTML = '<div class="alert alert-success" role="alert">Created!</div>';

};
