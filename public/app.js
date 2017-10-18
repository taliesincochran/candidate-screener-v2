var firebaseConfig = {
    apiKey: "AIzaSyClwYtwK0OH96cCKCis8T8KWFL9u8lJfH8",
    authDomain: "uncbootcampproject1.firebaseapp.com",
    databaseURL: "https://uncbootcampproject1.firebaseio.com",
    projectId: "uncbootcampproject1",
    storageBucket: "uncbootcampproject1.appspot.com",
    messagingSenderId: "1007244888274"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var app = {
  wordCount: 0,
  recordings: [],
  blob: undefined,
  answer: "",
  answerArr: [],
  personalityProfile: {},
  record: () => {
    $("#recordButton").on("click", (e) => {
      $("#recordButton").replaceWith("<image src='./images/cancel64.png' id='stop'></image>");
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(handleSuccess); 
    });

    var handleSuccess = (stream) => {
      var mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus"
      });
      mediaRecorder.start();
      mediaRecorder.addEventListener('dataavailable', (e) => {
        app.blob = e.data;
      });
      mediaRecorder.addEventListener('stop', (e) => {
        app.sendRecordings();
      })

      $("#stop").on('click', () => {
        console.log("stop clicked");
        mediaRecorder.stop();
        $("#stop").replaceWith("<image src='./images/record64.png' id='recordButton'></image>");
        app.record();
        questions.cycleQuestions()
      });
    };
  },
  sendRecordings: () => {
    console.log(app.blob);
    var form = new FormData();
    form.append('fname', 'test.webm')
    form.append('data', app.blob);

    $.ajax({
      url: '/toSpeech',
      data: form,
      processData: false,
      contentType: false,
      type: "POST"
    })
    .done(function(res) {
      console.log("success");
      var transArr = [];
      var trans = res.results;

      for (var i=0; i<trans.length; i++) {
        transArr.push(res.results[i].alternatives[0].transcript);
      };
      app.answer = transArr.join("");
      app.answerArr.push(app.answer);
      console.log(app.answerArr);
      app.wordCounter();
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  },
  wordCounter: () => {
    var answerLength = app.answer.split(" ");
    app.wordCount += answerLength.length;
    $("#wordCount").html(`Word Count: ${app.wordCount}`);
    app.progressUpdate();
  },
  progressUpdate: () => {
    console.log(app.wordCount);
    var progressWidth = (app.wordCount / 100) * 100;
    $("#progressBar").attr("aria-valuenow", app.wordCount);
    $("#progressBar").css("width", progressWidth + "%");
    if (app.wordCount >= 100) {
      $("#getPersonalityBtn").removeClass("disabled");
      $('#getPersonalityBtn').on('click', () => {
        app.checkPersonality();
      });
    };
  },
  checkPersonality: () => {
    var arrJoin = app.answerArr.join("");
    console.log('answerArr:', typeof arrJoin);

    $.ajax({
      url: '/toPersonality',
      data: {
        "arrJoin": arrJoin
      },
      dataType: 'json',
      type: "POST"
    })
    .done(function(res) {
      console.log('success');
      console.log(res);
      app.personalityProfile = res;
      if(Object.keys(app.personalityProfile).indexOf("needs") !== -1) {
        returnedData.getPercentages(app.personalityProfile);
        returnedData.renderSunburst(app.personalityProfile);
        $("#main").addClass('hidden');;
        $("tabbable-area").removeClass("hidden");
      }
    })
  }
}

var questions = {
  currentQuestion: 0,
  questions: [
    "Tell me about yourself.",
    "What are your strengths?",
    "What are your weaknesses?",
    "Why do you want this job?",
    "Where would you like to be in your career five years from now?",
    "What\'s your ideal company?",
    "What attracted you to this company?",
    "Why should we hire you?",
    "What did you like least about your last job?",
    "When were you most satisfied in your job?",
    "What can you do for us that other candidates can\'t?",
    "What were the responsibilities of your last position?",
    "Why are you leaving your present job?",
    "What do you know about this industry?",
    "What do you know about our company?",
    "Are you willing to relocate?",
    "What was the last project you led, and what was its outcome?",
    "Give me an example of a time that you felt you went above and beyond the call of duty at work.",
    "Can you describe a time when your work was criticized?",
    "Have you ever been on a team where someone was not pulling their own weight? How did you handle it?",
    "Tell me about a time when you had to give someone difficult feedback. How did you handle it?",
    "What is your greatest failure, and what did you learn from it?",
    "How do you handle working with people who annoy you?",
    "If I were your supervisor and asked you to do something that you disagreed with, what would you do?",
    "What was the most difficult period in your life, and how did you deal with it?",
    "Give me an example of a time you did something wrong. How did you handle it?",
    "Tell me about a time where you had to deal with conflict on the job.",
    "If you were at a business lunch and you ordered a rare steak and they brought it to you well done, what would you do?",
    "If you found out your company was doing something against the law, like fraud, what would you do?",
    "What assignment was too difficult for you, and how did you resolve the issue?",
    "What/\'s the most difficult decision you\'ve made in the last two years and how did you come to that decision?",
    "Describe how you would handle a situation if you were required to finish multiple tasks by the end of the day, and there was no conceivable way that you could finish them.",
    "What salary are you seeking?",
    "What\'s your salary history?",
    "If I were to give you this salary you requested but let you write your job description for the next year, what would it say?",
    "What are you looking for in terms of career development?",
    "How do you want to improve yourself in the next year?",
    "What kind of goals would you have in mind if you got this job?",
    "If I were to ask your last supervisor to provide you additional training or exposure, what would she suggest?",
    "How would you go about establishing your credibility quickly with the team?",
    "How long will it take for you to make a significant contribution?",
    "What do you see yourself doing within the first 30 days of this job?",
    "If selected for this position, can you describe your strategy for the first 90 days?",
    "How would you describe your work style? ",
    "What would be your ideal working environment?",
    "What do you look for in terms of culture—structured or entrepreneurial? ",
    "Give examples of ideas you\'ve had or implemented.",
    "What techniques and tools do you use to keep yourself organized?",
    "If you had to choose one, would you consider yourself a big-picture person or a detail-oriented person?",
    "Tell me about your proudest achievement.",
    "Who was your favorite manager and why?",
    "What do you think of your previous boss?",
    "Was there a person in your career who really made a difference?",
    "What kind of personality do you work best with and why?",
    "What are you most proud of? ",
    "What do you like to do?",
    "What are your lifelong dreams?",
    "What do you ultimately want to become?",
    "What is your personal mission statement?",
    "What are three positive things your last boss would say about you?",
    "What negative thing would your last boss say about you?",
    "What three character traits would your friends use to describe you?",
    "What are three positive character traits you don\'t have?",
    "If you were interviewing someone for this position, what traits would you look for?",
    "List five words that describe your character.",
    "Who has impacted you most in your career and how?",
    "What is your greatest fear?",
    "What is your biggest regret and why?",
    "What\'s the most important thing you learned in school?",
    "Why did you choose your major?",
    "What will you miss about your present/last job?",
    "What is your greatest achievement outside of work?",
    "What are the qualities of a good leader? A bad leader?",
    "Do you think a leader should be feared or liked?",
    "How do you feel about taking no for an answer?",
    "How would you feel about working for someone who knows less than you?",
    "How do you think I rate as an interviewer?",
    "Tell me one thing about yourself you wouldn\'t want me to know.",
    "Tell me the difference between good and exceptional.",
    "What kind of car do you drive?",
    "If you could be anywhere in the world right now, where would you be?",
    "What\'s the last book you read?",
    "What magazines do you subscribe to?",
    "What\'s the best movie you\'ve seen in the last year?",
    "What would you do if you won the lottery?",
    "Who are your heroes?",
    "What do you like to do for fun?",
    "What do you do in your spare time?",
    "What is your favorite memory from childhood?",
    "How many times do a clock\'s hands overlap in a day?",
    "How would you weigh a plane without scales?",
    "Tell me 10 ways to use a pencil other than writing.",
    "If you were an animal, which one would you want to be?",
    "Why is there fuzz on a tennis ball?",
    "If you could choose one superhero power, what would it be and why?",
    "If you could get rid of any one of the US states, which one would you get rid of and why?",
    "With your eyes closed, tell me step-by-step how to tie my shoes."
    ],
  cycleQuestions: function () {
    $("#questionArea").empty().html("<h2>" + questions.questions[questions.currentQuestion] + "</h2>");
    questions.currentQuestion++;
  },
}

$(document).ready(function(){   
  // var json = require(["/en_v3.json"]); //with path
  questions.cycleQuestions();
  visualize();
  authorization.showModal();
  $("#sunburstArea").hide();
  console.log("fired");   
  $('#submitNewUser').on("click", function (event) {
    event.preventDefault();
    authorization.getNewUser();     
    authorization.signUp(authorization.newUserEmail, authorization.newUserPassword); 
  });
  $('#submitUser').on("click", function(event) {
    event.preventDefault();
    authorization.establishedUser();      
    authorization.signIn(authorization.userEmail, authorization.userPassword);
  });
  $("#errorButton").on("click", function() {
    $("#error").html(authorization.errorMessage);
    authorization.showModal();
    // $('#errorModal').modal('hide');
    console.log(authorization.errorMessage);
  });
  $('#submitNewUserProfile').on('click', function() {
    authorization.makeNewProfile();
    // authorization.hideModal();
  });
  app.record();
  // this code must be removed before launch
  $("#test-button").on("click", function() {
    $("#recordingArea").addClass("hidden");
    $("#tabbable-area").removeClass('hidden')
  });
  // end temp code
  $("#clickTable").on("click", function() {
    $("td.column" + 0).each(function(i,cell){
        $(cell).text(Math.round(returnedData.percentileArray[i] * 100) + " %"); 
    })
  })
  $(".oprah, .lebron, .francisco, .pope, .trika, .yudarvish, .krungy, .trump, .obama, .gandhi, .hitler, .castro, .mandela, .thatcher").on("click", function(){
    var target = $(event.target).attr("class");
    var targetName = returnedData[target].name;
    var targetNumber = returnedData[target].percentile;
    $("td.column" + $(this).closest("div").children("button").attr("data-array")).removeClass("hidden");
    $(event.target).closest("div").children("button").html(targetName + " ").append($("<span class='caret'>"));
    $("td.column" + $(this).closest("div").children("button").attr("data-array")).each(function(i,cell){
        $(cell).text(Math.round(targetNumber[i] * 100) + " %");
    })
    $(this).closest("th").next("th").removeClass("hidden");
  })
  $(".hideme").on("click", function(){
    $("td.column" + $(this).closest("div").children("button").attr("data-array")).addClass("hidden");
    $(event.target).closest("div").children("button").html("Select a Profile" + " ").append($("<span class='caret'>"));
    $("td.column" + $(this).closest("div").children("button").attr("data-array")).each(function(i,cell){
        $(cell).text(""); 
    })
    $(this).closest("th").addClass("hidden");
  })
  $(".yourself").on("click", function(){
    $("td.column" + $(this).closest("div").children("button").attr("data-array")).removeClass("hidden");
    $(event.target).closest("div").children("button").html("Your Results!" + " ").append($("<span class='caret'>"));
    $("td.column" + $(this).closest("div").children("button").attr("data-array")).each(function(i,cell){
        $(cell).text(Math.round(returnedData.percentileArray[i] * 100) + " %");   
    })
    $(this).closest("th").next("th").removeClass("hidden");
  })
  $("#insert0").on("click", function(){
      $("td").removeClass("hidden");
      $("th").removeClass("hidden");
  });
});

var authorization = {
	newUserEmail: "",
	newUserPassword:  "",
	newUserName: "",
	newUserPicture: "",
	userEmail: "",
	userPassword: "",
	errorMessage: undefined,
	errorCode: undefined,
  loggedIn: false,
	hideModal: function() {
  	$("#signInModal").modal('hide');
	},
	showModal: function() {
    if(!authorization.loggedIn) {
  	 $('#signInModal').modal('show');
    }
	},
	showError: function() {
  	$('#errorModal').modal('show');
	},  
	errorModal: function() {
  	$("#error").html(authorization.errorMessage);
  	$("#errorModal").modal('show');
    console.log(authorization.errorMessage);
	},
	signUp : function (email, password) {
  	console.log("signUp fired");
  	firebase.auth().createUserWithEmailAndPassword(email, password).then(authorization.makeNewProfile, function(error) {
    	authorization.errorCode = error.code;     
    	authorization.errorMessage = error.message;
    	authorization.errorModal(); 
  	});
	},
	signIn: function(email,password) {
  	console.log("signIn fired");  
  	firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
      authorization.hideModal;
      authorization.loggedIn = true;
      var temp = authorization.userEmail.replace("@","AT").replace(".","dot");
      console.log(temp);
      userRef = database.ref("/users/" + temp);
      userRef.once("value", function (snapshot) {
        authorization.userName =snapshot.val().name;
        authorization.userEmail = snapshot.val().email;
        authorization.newUserPicture = snapshot.val().picture;
        app.personalityProfile = snapshot.val().jsonObj;
        $("#name").text(authorization.newUserName);
        $("#picture").html("<img src= " + authorization.newUserPicture + " alt= " + authorization.newUserName + ">");
        if(Object.keys(snapshot.val()['jsonObj']).indexOf('needs') !== -1) {
          console.log(Object.keys(snapshot.val()['jsonObj']).indexOf('needs') !== -1);
          $('#main').addClass('hidden');
          $('#tabbable-area').removeClass('hidden');
          returnedData.renderSunburst(app.personalityProfile);
          returnedData.getPercentages(app.personalityProfile);
        }
      })
      }, function(error) {
    	 authorization.errorCode = error.code;     
    	 authorization.errorMessage = error.message;
    	 authorization.errorModal();  
    })      
  },  
	getNewUser: function () {
  	authorization.newUserEmail = $("#newUserEmail").val().trim();
  	console.log(authorization.newUserEmail);
  	authorization.newUserPassword = $("#newUserPassword").val().trim();
  	console.log(authorization.newUserPassword);
	},
	establishedUser : function() {
  	authorization.userEmail = $("#userEmail").val().trim();
  	console.log(authorization.userEmail);
  	authorization.userPassword = $("#userPassword").val().trim();
  	console.log(authorization.userPassword);
	},
	makeNewProfile: function() {
  	// authorization.hideModal() 
    authorization.loggedIn = true;
  	$("#newUserModal").modal("show").modal({
      keyboard: false,
      backdrop: 'static'
    });
  	$("#submitNewUserProfile").one("click", function() {
    	authorization.newUserPicture = $("#newUserPicture").val();
      if(authorization.newUserPicture === "") {
        authorization.newUserPicture = "https://upload.wikimedia.org/wikipedia/commons/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg";
      }
    	authorization.newUserName = $("#newUserName").val().trim();
      var temp = authorization.newUserEmail.replace("@","AT").replace(".","dot");
      console.log(temp);
      var userRef = database.ref("/users/" + temp);
      console.log(userRef);
      userRef.set({
        name: authorization.newUserName,
        email: authorization.newUserEmail,
        picture: authorization.newUserPicture,
        JsonObj: app.personalityProfile,
      });    
      // $("#newUserModal").modal("hide");
      // authorization.hideModal();
      $("#name").text(authorization.newUserName);
      $("#picture").html("<img src= " + authorization.newUserPicture + " alt= " + authorization.newUserName + ">");
    })
  }
}

var returnedData = {
  oprah: {
    name: 'Oprah Winfrey',
    percentile: [0.9045974768772631, 0.979020151157223, 0.9949131538964932, 0.8714517724206985, 0.8835958016905783, 0.6486344859769609, 0.8447942535266787, 0.7225672485998437, 0.8414459590561325, 0.6154468578992052, 0.8344273426362091, 0.7041262378443771, 0.8860397181738027, 0.6742837190539857, 0.9430030813836863, 0.5936685312560723, 0.9603396711358586, 0.6570127643040208, 0.9925983032671806, 0.8640865926210066, 0.7777409427743414, 0.8952857419791408, 0.9946593546657979, 0.9031062247867181, 0.16919226490209904, 0.4213023245514933, 0.1490766395109473, 0.27027043771581183, 0.2932568173816944, 0.3862483573834662, 0.6699981453953803, 0.8366389466400306, 0.9338147737801343, 0.7368905165835662, 0.9681096581919224, 0.6846651401449015, 0.7944143551559404, 0.8187640742747349, 0.3446986354072157, 0.8698181973941164, 0.8705205013979391, 0.7464328575416121, 0.8866722687387552, 0.8696769334020679, 0.4401896345423686, 0.6488575994223287, 0.8280778884301451],
  },
  thatcher: {
    name: 'Margaret Thatcher',
    percentile: [0.9374527996062192, 0.9773168145364901, 0.3804036886987906, 0.5364348111736614, 0.9996006369127585, 0.9905032580680213, 0.813933633402993, 0.9058489788174191, 0.7443281321555386, 0.45272188119414297, 0.549084337414253, 0.8406231226883425, 0.910613728684712, 0.9350191052383781, 0.0441554630756788, 0.23263282761379894, 0.4182884726742127, 0.10247448865570624, 0.9091637056060767, 0.7024031404234096, 0.2066254185059957, 0.5363289458541625, 0.9976349628956303, 0.9087292540472518, 0.10185957231215081, 0.13576125819998325, 0.46844505865168545, 0.01864603738811499, 0.3260662012125928, 0.08652518419964095, 0.008502631155467455, 0.06351822744574548, 0.692526109970631, 0.05173358996759564, 0.017083804628708177, 0.018382699276218106, 0.027394649449428266, 0.009261519808418939, 0.02607380834774975, 0.02718627432077586, 0.13580179906982126, 0.5632484076223282, 0.06409656031475075, 0.5849283541134964, 0.008873156190805476, 0.011358662490529303, 0.05244301413272229],
  },
  mandela : {
    name: 'Nelson Mandela',
    percentile: [0.8223302390022965, 0.9947840545857607, 0.693928087129967, 0.4728465336245797, 0.9943194666660151, 0.9705379598422191, 0.9083987668625181, 0.9387193515388077, 0.7551646821097708, 0.48292348092942833, 0.6314248666354814, 0.853087145363542, 0.974042876146406, 0.9661780820759149, 0.2098226212198241, 0.25938389027890374, 0.5682228750322702, 0.17564642154223425, 0.9849502744971712, 0.7388123249532124, 0.43213818772006823, 0.8528345715117802, 0.9997373924660162, 0.9167182697086713, 0.035035044434989504, 0.12052749027965148, 0.3831505053367896, 0.01047031034736029, 0.24696166096880579, 0.09476414533490979, 0.014420425190443287, 0.28811034045430206, 0.8779348900302287, 0.11034052509466397, 0.18764788274825278, 0.06050874761402675, 0.06991648967755693, 0.014880896566380586, 0.009539912632816228, 0.11813880422435069, 0.4682881880456197, 0.8175340328996034, 0.30732768450530445, 0.6502023772851052, 0.008174408222873297, 0.01135418034586727, 0.19482988945835333],
  },
  lebron: {
    name: 'Lebron James',
    percentile: [0.6269902936062357, 0.36502449340082244, 0.5752771228616291, 0.6481685797103492, 0.2664554099521871, 0.41616860883248225, 0.6261327313053244, 0.6480554261936675, 0.40733337460093866, 0.7503536559594022, 0.7469491071859603, 0.5294511637795698, 0.5873567314350663, 0.6318532123843141, 0.8605364160669948, 0.5690047072868194, 0.802255639510169, 0.765372217791862, 0.36476308920687384, 0.44466012599995514, 0.4138063404356892, 0.47046909315192526, 0.3895370798038354, 0.6442270337822046, 0.403684964668657, 0.3313283429129452, 0.19722793550998774, 0.34686729097194513, 0.38860826848123536, 0.29822479421785864, 0.9827953401601988, 0.72264321320099, 0.7425116633091209, 0.868405704355734, 0.8143365951087413, 0.9331595028753162, 0.8472933689697666, 0.7834845877475016, 0.811689288325228, 0.7267389138586393, 0.9749889630209273, 0.9293164686930295, 0.9516083704167001, 0.807672580636824, 0.8529759970344017, 0.9424726774444263, 0.6350518411502284],
  },
  francisco: {
    name: 'Don Francisco',
    percentile: [0.864962440522111, 0.9004253590243274, 0.8724898327115851, 0.2909787013263092, 0.6334088346595961, 0.4658298227976128, 0.9999950908870002, 0.6707523250015972, 0.9113425894013334, 0.8625352199314595, 0.8573709430049077, 0.7734342676895236, 0.558362371856944, 0.7480320041303965, 0.19547204498612486, 0.502863546685085, 0.6797246579488931, 0.5254689500390161, 0.9012935209482639, 0.7641529380585877, 0.3999201810418615, 0.9355014895572737, 0.999706785041975, 0.6993975426912754, 0.5906532453190162, 0.31220067535623247, 0.3154626534886743, 0.2779785921745229, 0.45236003038997225, 0.40756273936092713, 0.3967996812908378, 0.9542588714053908, 0.43252760303951737, 0.35292111876720744, 0.9411552127656749, 0.27701301819167606, 0.44538693012407604, 0.34001017139022227, 0.5768167663962133, 0.051724581830119076, 0.8699411961270979, 0.24461631162101005, 0.705727361021331, 0.1534801251977338, 0.14539421720911466, 0.032273645450885735, 0.7022229640179992],
  },
  pope: {
    name: 'Pope Francis',
    percentile: [0.9047119471922769, 0.9978071901084233, 0.8214803886709241, 0.6390466257839776, 0.8573551303024011, 0.024034325414907576, 0.9951148647740571, 0.856832233039848, 0.7699203978742354, 0.8679547808482388, 0.9788521449925296, 0.9156601755287503, 0.9626422697722952, 0.8316883596060847, 0.3350894362596379, 0.27388860018140027, 0.7331312309127891, 0.4179520624697462, 0.9702495521677015, 0.9029419927011584, 0.2745801546685792, 0.9725935600481782, 0.9998263148940999, 0.9165650862183052, 0.5907189451204847, 0.018585788644091716, 0.1473715998179268, 0.4856238077019195, 0.3311084665931633, 0.4689826901887899, 0.27585749983421987, 0.7874021524778323, 0.58568368182687, 0.09516833607517866, 0.9914494316285338, 0.3408047178209128, 0.5683155654945713, 0.9538976354186413, 0.7304252217656043, 0.3230883097234797, 0.9262051232803428, 0.7814992434312298, 0.988777181621985, 0.2634152393192255, 0.1323516973979051, 0.2593096102461644, 0.8647318472428795],
  },
  trika: {
    name: "Mohamed Aboutreka",
    percentile: [0.5, 0.797390917136013, 0.36758320948318685, 0.5, 0.5, 0.0934220728805128, 0.5, 0.9242611533802372, 0.5, 0.706465370663126, 0.8566584035650248, 0.8263948273131865, 0.9787826802174382, 0.9793977330244692, 0.5, 0.10557267217480637, 0.5, 0.027845809613400718, 0.5, 0.5, 0.5, 0.8464519435006734, 0.966731683954345, 0.5, 0.5, 0.5, 0.3670445355599977, 0.5, 0.5, 0.3380893416978269, 0.17901586557440857, 0.5875516173276638, 0.7324252782082484, 0.054618063244745385, 0.7162122079266344, 0.5, 0.5, 0.5, 0.5, 0.4351596082022684, 0.3097565955388345, 0.5, 0.13039420890669495, 0.8571961107743071, 0.02837305950265001, 0.5, 0.7922775256246859],
  },
  yudarvish: {
    name:"Yu Darvish",
    percentile: [0.9013405857178858, 0.6288665899816019, 0.479866901538338, 0.8017686266157893, 0.935013916542565, 0.9997778422308049, 0.9908793303994343, 0.11418829482745985, 0.9654552767843745, 0.9270119441277715, 0.9999985377357488, 0.9989597992083652, 0.9804447323784393, 0.8698866228415263, 0.9999656170930411, 0.7196711376466169, 0.9973268928316792, 0.13941138897796307, 0.9750736370270047, 0.926246014782379, 0.03563911358518007, 0.9722672364765088, 0.9943275851605067, 0.9889149968544818, 0.03657363685062465, 0.012056827535942394, 0.0003900981151319094, 0.04707939595189542, 0.00016265160244222088, 0.001449664879295931, 0.16055172722562994, 0.27863900543264464, 0.7695318905378726, 0.49513092412667903, 0.00036024492985192724, 0.7433137708642358, 0.5059466136938756, 0.17264291806107046, 0.08181683812131324, 0.12955257411984106, 0.6705547824935054, 0.36331695223132826, 0.11967003750277272, 0.9629397965854345, 0.03349858461048877, 0.19418868883758256, 0.37505183002914955],
  },
  krungy: {
    name:"Sandara Park",
    percentile:[0.8931060549196488, 0.6105514948347511, 0.7922774585993877, 0.4358473099013371, 0.10600727320702646, 0.28626035817882717, 0.9429038181420627, 0.9053047760607527, 0.9392619137756562, 0.9212690474234502, 0.9493520053196292, 0.8918256170539017, 0.7590642159703642, 0.9663725928403287, 0.982560082111247, 0.5, 0.971646885892856, 0.948177457018448, 0.9224057347922524, 0.7921877495703146, 0.11690112490990395, 0.680821794367931, 0.8617868168966534, 0.6911376997602139, 0.46673695230407164, 0.2411288553733592, 0.10549018212994804, 0.9030998428715753, 0.0627048943288731, 0.2796743201539127, 0.6531327845214338, 0.7651078981627474, 0.41085377280787844, 0.8007599309734382, 0.34952457410464144, 0.22360149553489828, 0.5, 0.7474816146215313, 0.3147986201664026, 0.44014400953067967, 0.5, 0.2674646070642859, 0.5, 0.7092389296691549, 0.6115942903780126, 0.6280874687283317, 0.7540385419997337],
  },
  trump:{
    name: 'Donald Trump',
    percentile: [0.9171549965296588, 0.945572890658265, 0.5460691901194775, 0.25737514347153523, 0.9904049305957137, 0.8425307742859092, 0.9242604000854027, 0.9393727173030115, 0.8864791716731311, 0.550789896567996, 0.852942101244335, 0.8857280045673919, 0.9589424873308011, 0.9853104704271848, 0.208155751219343, 0.11658443297062715, 0.7631502966897648, 0.30802851912906515, 0.9768381085734834, 0.6790087681419217, 0.5794968048470877, 0.8968058874729506, 0.9997496328652311, 0.7475621713786113, 0.036672401910370855, 0.07410100758528831, 0.21413643670179572, 0.009628149294851007, 0.07407981990359763, 0.0368744330903375, 0.008010202902165142, 0.2262995793495764, 0.5558252677585925, 0.0743796295041595, 0.09590770403428917, 0.03891042375101683, 0.04136434083654389, 0.007009347926964948, 0.011341965614146854, 0.07877978966260896, 0.6205954862111378, 0.8004305433419275, 0.2417004139573049, 0.5177594556655578, 0.010194059158556257, 0.0017519905961687066, 0.1531162412731486], 
  },
  obama: {
    name: 'Barrack Obama',
    percentile:[0.8475547997319268, 0.5450272499125016, 0.20926650190835205, 0.1596790800171281, 0.9946027078235723, 0.7611119662927026, 0.9028542006699269, 0.8956062681968635, 0.7951624691256027, 0.3593515969916575, 0.851455631042451, 0.9787651919377697, 0.9110739274022662, 0.9976470744394481, 0.33475246496762456, 0.1686254776245596, 0.765749092596101, 0.43490721244148145, 0.9238482589630905, 0.5490129073312107, 0.12631650230896874, 0.8438369872479472, 0.989251893075217, 0.5482063406637532, 0.040999616818235385, 0.02878348357578464, 0.23184511192411406, 0.046066801914799504, 0.08475871766453952, 0.037906501839809204, 0.3392505619910239, 0.0686944758673676, 0.6285129423518493, 0.14988767716942997, 0.09236983602028076, 0.29515901920240906, 0.1458215926272447, 0.03960818214347017, 0.18739760333131683, 0.030955710171101325, 0.21258840339994095, 0.8049592337091038, 0.16470772102430248, 0.41836192917150344, 0.0489114295565693, 0.03444714630976964, 0.15838152766499647],
  },
  gandhi: {
    name: 'Mahatma Gandhi',
    percentile: [0.4351643175940774, 0.9874121822675781, 0.6899856828357956, 0.5772966244125871, 0.9995791680621113, 0.9829019970597569, 0.621168815162213, 0.9853213536575152, 0.6980033493252186, 0.7645987774797851, 0.46375700194877745, 0.6971110893406969, 0.7163146299746701, 0.7799949179608919, 0.011434113574410376, 0.08515106308398385, 0.09258950434468494, 0.007692008265823447, 0.844725296484347, 0.8333059621837748, 0.590527230701885, 0.7852238753275051, 0.9911717966573271, 0.5382901467428538, 0.06242350931887747, 0.20370058617607428, 0.7678559688118921, 0.399176799753004, 0.7127633765364474, 0.1948281354234478, 0.0010062971272329357, 0.09305019619412624, 0.9109812038737704, 0.027063650398074346, 0.1667714891740264, 0.029184270046258842, 0.03453176955248949, 0.020930840622959412, 0.05959745476081402, 0.13194373297905115, 0.19755000419944224, 0.5723618540131682, 0.015829609163499847, 0.5750146304259024, 0.02842438888589599, 0.004719428545424675, 0.3172840659845215],
  },
  hitler: {
    name: 'Adolf Hitler',
    percentile:[0.5444479938457826, 0.9436692219278711, 0.6441505865109712, 0.5189227613942844, 0.9990371965357328, 0.9620390657363639, 0.5593023700747599, 0.8652366486618455, 0.8308053885960744, 0.14478191203372415, 0.2215180155554038, 0.6719844738587586, 0.794654156896957, 0.8600013354408349, 0.02820779142462687, 0.13135818843629055, 0.2475752991969915, 0.03578495697450146, 0.9429400167787068, 0.5803108648295623, 0.3451078472693275, 0.5268865823820421, 0.9982798861868591, 0.7832123318889058, 0.16515869010839096, 0.37846191830807224, 0.6790085782738282, 0.15513847705850087, 0.7013617124645122, 0.3256926350781115, 0.01725017357872638, 0.12919652586318986, 0.7001895448795324, 0.04517328077092336, 0.10327429515284658, 0.08407012236497552, 0.03674078248426049, 0.005224948512317473, 0.02367527688190857, 0.026564383653593537, 0.15833758908059292, 0.6558633764991031, 0.1654194429784363, 0.554423833693355, 0.018226353942696893, 0.022582423570649213, 0.13179926151438326],
  },
  castro: {
    name: 'Fidel Castro',
    percentile:[0.8137334975525239, 0.9047935458848445, 0.46599054370823645, 0.5570556746615858, 0.9952003314272646, 0.9396923696173237, 0.7644661228326617, 0.8625300461590555, 0.8010591349795437, 0.31398023698752153, 0.5460565798278585, 0.944528668213289, 0.939546688151285, 0.9582551268658188, 0.07424333290818874, 0.21011528422956227, 0.5168411104701112, 0.07778563267995559, 0.9582252146615475, 0.7122397176785423, 0.2274027893245476, 0.5160727175078579, 0.9962350548987078, 0.857273430738265, 0.14261592729097117, 0.23486133112562235, 0.5915667461831399, 0.06790890166874453, 0.5532045734022171, 0.16607120651319512, 0.030216676344073046, 0.12928228799481073, 0.7997346472240552, 0.07150488345516948, 0.15221296363559444, 0.08111880434304752, 0.09074266661608499, 0.015961753954620517, 0.07269107148910836, 0.0292968321924143, 0.16776719791254008, 0.6392230437758015, 0.062322545357356485, 0.776443942918551, 0.022267981461598307, 0.06820272597110882, 0.10124446519057284]
  },
  newText: "",
  percentileArray:[],
  getPercentages: function(jsonObj) {
    for (var i = 0; i<5; i++) {
        console.log(jsonObj.personality[i].name);
        for(var j=0; j<6; j++) {     
        returnedData.percentileArray.push(jsonObj.personality[i].children[j].percentile);
      }
    }
    for (var i = 0; i<12; i++) {
        returnedData.percentileArray.push(jsonObj.needs[i].percentile);
    }
    for (var i = 0; i <5; i++) {
        returnedData.percentileArray.push(jsonObj.values[i].percentile);
    }
  },
  renderSunburst : () => {
    $.getJSON('./profiles/en_v3.json', '', function ( profile ) {
      $('#profile').append('<pre>' + JSON.stringify(profile, null, 2) + '</pre>');
      var chart = new PersonalitySunburstChart({'selector':'#sunburstChart', 'version': 'v3'});
      chart.show(profile, './profile_photo.jpg');
    });
  }
}
var visualize = function () {
  var context = new AudioContext();
  var visCanvas = document.getElementById('visualizer')
  var visualizer = new App.FrequencyVisualizer(context, visCanvas);
  var gain = 0;
  var audioSource

  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

  if (navigator.getUserMedia) {
    navigator.getUserMedia (
      {
        audio: true,
        video: false
      },
      function (stream) {
        audioSource = context.createMediaStreamSource(stream);
        visualizer.acceptConnection(audioSource);
      },
      function (err) {
         console.log('Error initializing user media stream: ' + err);
      }
    );
  }
};