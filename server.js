const express = require('express');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const bodyParser = require('body-parser');
const config = require('./config.js');
const app = express();

console.log('speech: ', config.speechToTextConfig);
const PORT = process.env.PORT || 3000;

app.use(bodyParser());
app.use(fileUpload());
app.use(express.static('./public'));

app.listen(PORT, () => {
	console.log(`Listening on: ${PORT}`)
});

app.get("/", function (req, res) {
  	res.sendFile("./public/index.html");
});

app.post('/toSpeech', function(req, res) {
	if (!req.files)
		return res.status(400).send('No files were uploaded.');

	let file = req.files.data;

	file.mv('./test.webm', (err) => {
		if (err)
			return res.status(500).send(err);
		
		console.log("File Uploaded.");
		
		var speech_to_text = new SpeechToTextV1 (config.speechToTextConfig);
		var params = {
			audio: fs.createReadStream('./test.webm'),
			content_type: 'audio/webm',
			timestamps: false,
			word_alternatives_threshold: 0.9,
		};
		speech_to_text.recognize(params, (error, transcript) => {
	    	if (error)
	      		console.log('Error:', error);
	    	else
	      		res.json(transcript);
		});
	})
});

app.post('/toPersonality', function(req, res) {
	var string = req.body.arrJoin;
	console.log(string);

	var personality_insights = new PersonalityInsightsV3({
  		username: config.personUserName,
  		password: config.personPassword,
  		version_date: '2017-10-13'
	});

	var params = {
  		text: string,
  		consumption_preferences: true,
  		raw_scores: true,
 		headers: {
    		'accept-language': 'en'
  		}
	};

	personality_insights.profile(params, function(error, response) {
  		if (error)
    		console.log('Error:', error);
  		else
    		console.log(JSON.stringify(response, null, 2));
    		res.json(response);
  	});
});