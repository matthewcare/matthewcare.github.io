'use-strict';

var note = {
	CONSTANTFREQ: 440,
	notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
	get: function (freq) {
		if (!freq)
			return 'please enter a number';
		return this.notes[(69 + Math.round(12 * ( Math.log(freq / this.CONSTANTFREQ) ) / Math.log(2) )) % 12];
	}
};

var analyser = null;



function convertToMono( input ) {
    var splitter = AudioContext.createChannelSplitter(2),
    	merger = AudioContext.createChannelMerger(2);

    input.connect( splitter );
    splitter.connect( merger, 0, 0 );
    splitter.connect( merger, 0, 1 );
    return merger;
}

function error() {
    alert('Stream generation failed.');
}

function getUserMedia(dictionary, callback) {
    try {
        if (!navigator.getUserMedia)
        	navigator.getUserMedia = navigator.webkitGetUserMedia;
        navigator.getUserMedia(dictionary, callback, error);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }
}

function gotStream(stream) {
    // Create an AudioNode from the stream.
    var mediaStreamSource = AudioContext.createMediaStreamSource(stream);

    // Connect it to the destination.
    analyser = AudioContext.createAnalyser();
    analyser.fftSize = 2048;
    convertToMono( mediaStreamSource ).connect( analyser );
    updatePitch();
}

function toggleLiveInput() {
    getUserMedia({audio:true}, gotStream);
}