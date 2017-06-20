
document.addEventListener("DOMContentLoaded", function() { initialiseMediaPlayer(); }, false);


var mediaPlayer;
var playPauseBtn;
var muteBtn;
var progressBar;

function initialiseMediaPlayer() {
	mediaPlayer = document.getElementById('media-video');
	

	playPauseBtn = document.getElementById('play-pause-button');
	muteBtn = document.getElementById('mute-button');
	progressBar = document.getElementById('progress-bar');


	mediaPlayer.controls = false;
	

	mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
	

	mediaPlayer.addEventListener('play', function() {
		// pause button
		changeButtonType(playPauseBtn, 'pause');
	}, false);
	mediaPlayer.addEventListener('pause', function() {
		// play button
		changeButtonType(playPauseBtn, 'play');
	}, false);

	mediaPlayer.addEventListener('volumechange', function(e) { 
		// mute/unmute
		if (mediaPlayer.muted) changeButtonType(muteBtn, 'unmute');
		else changeButtonType(muteBtn, 'mute');
	}, false);	
	mediaPlayer.addEventListener('ended', function() { this.pause(); }, false);	
}

function togglePlayPause() {
	//  paused/ended
	if (mediaPlayer.paused || mediaPlayer.ended) {
		// pause button
		changeButtonType(playPauseBtn, 'pause');
		// Play
		mediaPlayer.play();
	}
	else {
		// play button
		changeButtonType(playPauseBtn, 'play');
		// Pause
		mediaPlayer.pause();
	}
}


function stopPlayer() {
	mediaPlayer.pause();
	mediaPlayer.currentTime = 0;
}


function changeVolume(direction) {
	if (direction === '+') mediaPlayer.volume += mediaPlayer.volume == 1 ? 0 : 0.1;
	else mediaPlayer.volume -= (mediaPlayer.volume == 0 ? 0 : 0.1);
	mediaPlayer.volume = parseFloat(mediaPlayer.volume).toFixed(1);
}


function toggleMute() {
	if (mediaPlayer.muted) {
				changeButtonType(muteBtn, 'mute');

		mediaPlayer.muted = false;
	}
	else {

		changeButtonType(muteBtn, 'unmute');

		mediaPlayer.muted = true;
	}
}


function replayMedia() {
	resetPlayer();
	mediaPlayer.play();
}


function updateProgressBar() {

	var percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);

	progressBar.value = percentage;

	progressBar.innerHTML = percentage + '% played';
}


function changeButtonType(btn, value) {
	btn.title = value;
	btn.innerHTML = value;
	btn.className = value;
}


function loadVideo() {
	for (var i = 0; i < arguments.length; i++) {
		var file = arguments[i].split('.');
		var ext = file[file.length - 1];

		if (canPlayVideo(ext)) {

			resetPlayer();
			mediaPlayer.src = arguments[i];
			mediaPlayer.load();
			break;
		}
	}
}


function canPlayVideo(ext) {
	var ableToPlay = mediaPlayer.canPlayType('video/' + ext);
	if (ableToPlay == '') return false;
	else return true;
}


function resetPlayer() {

	progressBar.value = 0;

	mediaPlayer.currentTime = 0;

	changeButtonType(playPauseBtn, 'play');
}