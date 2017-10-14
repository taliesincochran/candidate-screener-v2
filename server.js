const express = require('express');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(fileUpload());
app.use(express.static('./public'));

app.listen(PORT, () => {
	console.log(`Listening on: ${PORT}`)
});

app.get("/", function (req, res) {
  	res.sendFile("./public/index.html");
});

app.post('/toServer', function(req, res) {
	var speech_to_text = new SpeechToTextV1 (speechToTextConfig);
	var params = {
		audio: fs.createReadStream(),
		content_type: 'audio/webm;codecs=opus',
		timestamps: false,
		word_alternatives_threshold: 0.9,
	};
	console.log(req.files.data);
	if (!req.files)
		return res.status(400).send('No files were uploaded.');

	let file = req.files.data;

	file.mv('./test.webm', (err) => {
		if (err)
			return res.status(500).send(err);
		
		res.send('File uploaded!');
	})

	speech_to_text.recognize(params, (error, transcript) => {
	    if (error)
	      	console.log('Error:', error);
	    else
	      	console.log(JSON.stringify(transcript, null, 2));
	      	console.log(transcript);
	});
});
