
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
  chunks: [],
  recordings: [],
  arrayBuffer: undefined,
  record: () => {
    $("#recordButton").on("click", (e) => {
      $("#recordButton").replaceWith("<img src='./images/cancel64.png' id='stop'>");

      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(handleSuccess); 
    });

    var handleSuccess = (stream) => {
      var mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start(3000);
      mediaRecorder.addEventListener('dataavailable', (e) => {
        console.log('avail: ', e.data);
        app.chunks.push(e.data);
      });
      mediaRecorder.addEventListener('stop', (e) => {
        var blob = new Blob(app.chunks, { 'type' : 'audio/ogg; codecs=opus' });
        var audioURL = window.URL.createObjectURL(blob);
        var fileReader = new FileReader();
        // var audioCtx = new AudioContext();
        
        fileReader.readAsArrayBuffer(blob);
        fileReader.onloadend = () => {
          app.arrayBuffer = fileReader.result;
          app.sendRecordings();
        }

        app.recordings.push(blob);
        app.chunks = [];
        
        $("#player").attr('src', audioURL);
      })

      //TODO: Cycle through questions on this stop/click
      $("#stop").on('click', () => {
        mediaRecorder.stop();
        $("#stop").replaceWith("<img src='./images/record64.png' id='recordButton'>");
        app.record();
      });
    };
  },
  sendRecordings: () => {
    $.ajax({
      url: '/toServer',
      data: app.arrayBuffer,
      responseType:'arraybuffer',
      processData: false,
      type: "POST"
    })
    .done(function() {
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  }
}

var authorization = {
  userJSONObject: {
    "word_count": 6582,
    "processed_language": "en",
    "personality": [
      {
        "trait_id": "big5_openness",
        "name": "Openness",
        "category": "personality",
        "percentile": 0.9805667785359738,
        "children": [
          {
            "trait_id": "facet_adventurousness",
            "name": "Adventurousness",
            "category": "personality",
            "percentile": 0.950428146311326
          },
          {
            "trait_id": "facet_artistic_interests",
            "name": "Artistic interests",
            "category": "personality",
            "percentile": 0.8849147656630096
          },
          {
            "trait_id": "facet_emotionality",
            "name": "Emotionality",
            "category": "personality",
            "percentile": 0.17046533752727244
          },
          {
            "trait_id": "facet_imagination",
            "name": "Imagination",
            "category": "personality",
            "percentile": 0.20111675093062387
          },
          {
            "trait_id": "facet_intellect",
            "name": "Intellect",
            "category": "personality",
            "percentile": 0.9823942785877824
          },
          {
            "trait_id": "facet_liberalism",
            "name": "Authority-challenging",
            "category": "personality",
            "percentile": 0.9648675417313879
          }
        ]
      },
      {
        "trait_id": "big5_conscientiousness",
        "name": "Conscientiousness",
        "category": "personality",
        "percentile": 0.8936538116484918,
        "children": [
          {
            "trait_id": "facet_achievement_striving",
            "name": "Achievement striving",
            "category": "personality",
            "percentile": 0.9216597978352439
          },
          {
            "trait_id": "facet_cautiousness",
            "name": "Cautiousness",
            "category": "personality",
            "percentile": 0.9589003591814163
          },
          {
            "trait_id": "facet_dutifulness",
            "name": "Dutifulness",
            "category": "personality",
            "percentile": 0.7565446465573455
          },
          {
            "trait_id": "facet_orderliness",
            "name": "Orderliness",
            "category": "personality",
            "percentile": 0.48132376796768517
          },
          {
            "trait_id": "facet_self_discipline",
            "name": "Self-discipline",
            "category": "personality",
            "percentile": 0.8215063478296609
          },
          {
            "trait_id": "facet_self_efficacy",
            "name": "Self-efficacy",
            "category": "personality",
            "percentile": 0.908624607288198
          }
        ]
      },
      {
        "trait_id": "big5_extraversion",
        "name": "Extraversion",
        "category": "personality",
        "percentile": 0.3362575928970771,
        "children": [
          {
            "trait_id": "facet_activity_level",
            "name": "Activity level",
            "category": "personality",
            "percentile": 0.9789796271350255
          },
          {
            "trait_id": "facet_assertiveness",
            "name": "Assertiveness",
            "category": "personality",
            "percentile": 0.9825306758805727
          },
          {
            "trait_id": "facet_cheerfulness",
            "name": "Cheerfulness",
            "category": "personality",
            "percentile": 0.19465786707554655
          },
          {
            "trait_id": "facet_excitement_seeking",
            "name": "Excitement-seeking",
            "category": "personality",
            "percentile": 0.21503977702456123
          },
          {
            "trait_id": "facet_friendliness",
            "name": "Outgoing",
            "category": "personality",
            "percentile": 0.6005946078251523
          },
          {
            "trait_id": "facet_gregariousness",
            "name": "Gregariousness",
            "category": "personality",
            "percentile": 0.24206546142537544
          }
        ]
      },
      {
        "trait_id": "big5_agreeableness",
        "name": "Agreeableness",
        "category": "personality",
        "percentile": 0.0533865832349148,
        "children": [
          {
            "trait_id": "facet_altruism",
            "name": "Altruism",
            "category": "personality",
            "percentile": 0.8722252950552395
          },
          {
            "trait_id": "facet_cooperation",
            "name": "Cooperation",
            "category": "personality",
            "percentile": 0.7599846803277625
          },
          {
            "trait_id": "facet_modesty",
            "name": "Modesty",
            "category": "personality",
            "percentile": 0.34947264959955104
          },
          {
            "trait_id": "facet_morality",
            "name": "Uncompromising",
            "category": "personality",
            "percentile": 0.6480217001263691
          },
          {
            "trait_id": "facet_sympathy",
            "name": "Sympathy",
            "category": "personality",
            "percentile": 0.9812271982935261
          },
          {
            "trait_id": "facet_trust",
            "name": "Trust",
            "category": "personality",
            "percentile": 0.9240876717984589
          }
        ]
      },
      {
        "trait_id": "big5_neuroticism",
        "name": "Emotional range",
        "category": "personality",
        "percentile": 0.9212642329050765,
        "children": [
          {
            "trait_id": "facet_anger",
            "name": "Fiery",
            "category": "personality",
            "percentile": 0.016657350192117615
          },
          {
            "trait_id": "facet_anxiety",
            "name": "Prone to worry",
            "category": "personality",
            "percentile": 0.049689060282152586
          },
          {
            "trait_id": "facet_depression",
            "name": "Melancholy",
            "category": "personality",
            "percentile": 0.2725502659709549
          },
          {
            "trait_id": "facet_immoderation",
            "name": "Immoderation",
            "category": "personality",
            "percentile": 0.006015482455870191
          },
          {
            "trait_id": "facet_self_consciousness",
            "name": "Self-consciousness",
            "category": "personality",
            "percentile": 0.1257492389288613
          },
          {
            "trait_id": "facet_vulnerability",
            "name": "Susceptible to stress",
            "category": "personality",
            "percentile": 0.057796181331887075
          }
        ]
      }
    ],
    "needs": [
      {
        "trait_id": "need_challenge",
        "name": "Challenge",
        "category": "needs",
        "percentile": 0.009295974292889309
      },
      {
        "trait_id": "need_closeness",
        "name": "Closeness",
        "category": "needs",
        "percentile": 0.16009921929894821
      },
      {
        "trait_id": "need_curiosity",
        "name": "Curiosity",
        "category": "needs",
        "percentile": 0.6536846492707111
      },
      {
        "trait_id": "need_excitement",
        "name": "Excitement",
        "category": "needs",
        "percentile": 0.09364803322659232
      },
      {
        "trait_id": "need_harmony",
        "name": "Harmony",
        "category": "needs",
        "percentile": 0.0576922917475059
      },
      {
        "trait_id": "need_ideal",
        "name": "Ideal",
        "category": "needs",
        "percentile": 0.008168529100234745
      },
      {
        "trait_id": "need_liberty",
        "name": "Liberty",
        "category": "needs",
        "percentile": 0.06366682309101934
      },
      {
        "trait_id": "need_love",
        "name": "Love",
        "category": "needs",
        "percentile": 0.028469441069982115
      },
      {
        "trait_id": "need_practicality",
        "name": "Practicality",
        "category": "needs",
        "percentile": 0.050598475805181176
      },
      {
        "trait_id": "need_self_expression",
        "name": "Self-expression",
        "category": "needs",
        "percentile": 0.040949707563547155
      },
      {
        "trait_id": "need_stability",
        "name": "Stability",
        "category": "needs",
        "percentile": 0.3829004285272741
      },
      {
        "trait_id": "need_structure",
        "name": "Structure",
        "category": "needs",
        "percentile": 0.8207207759334644
      }
    ],
    "values": [
      {
        "trait_id": "value_conservation",
        "name": "Conservation",
        "category": "values",
        "percentile": 0.16063478087796923
      },
      {
        "trait_id": "value_openness_to_change",
        "name": "Openness to change",
        "category": "values",
        "percentile": 0.5883913392447956
      },
      {
        "trait_id": "value_hedonism",
        "name": "Hedonism",
        "category": "values",
        "percentile": 0.0029501441024047392
      },
      {
        "trait_id": "value_self_enhancement",
        "name": "Self-enhancement",
        "category": "values",
        "percentile": 0.01213256688793024
      },
      {
        "trait_id": "value_self_transcendence",
        "name": "Self-transcendence",
        "category": "values",
        "percentile": 0.10538088756987435
      }
    ],
    "warnings": []
  },
	newUserEmail: "",
	newUserPassword:  "",
	newUserName: "",
	newUserPic: "",
	userEmail: "",
	userPassword: "",
	userResults: {},
  jsonObj: '',
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
        authorization.newUserPic = snapshot.val().picture;
        authorization.jsonObj = snapshot.val().jsonObj;
        $("#name").text(authorization.newUserName);
        $("#picture").html("<img src= " + authorization.newUserPicture + " alt= " + authorization.newUserName + ">");
         // example sunburst until object is successfully returned
        returnedData.renderSunburst('https://raw.githubusercontent.com/personality-insights/sunburst-chart/master/examples/profiles/en_v3.json');
         // final code sunburst
        //  if(authorization.jsonObj !== '') {
        //   returnedData.renderSunburst(authorization.jsonObj;
        // }
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
        JsonObj: authorization.jsonObj,
    	});    
      // $("#newUserModal").modal("hide");
      // authorization.hideModal();
  		$("#name").text(authorization.newUserName);
  		$("#picture").html("<img src= " + authorization.newUserPicture + " alt= " + authorization.newUserName + ">");
  	})
	}
}

var questions = {
  currentQuestion: 0,
  questions: [
  "What type of activities do you enjoy",
  "Do you enjoy meeting new people",
  "How do you typically help out others",
  "Do you often look for the root cause of an issue you are confronted with a road-block",
  "How do you react to making mistakes",
  "What do you do when you are disappointed with others",
  "Do you react immediately or step back and think when confronted with new information",
  "What do you do when you are disappointed with yourself",
  "Describe how you approac(h repairing something that is not working",
  "What type of original ideas do you enjoy",
  "How do you let people know that they have made a mistake",
  "Describe your level of modesty when you achieve something important",
  "How do you react when you are nervous",
  "What aspects of yourself are you critical about",
  "When are you comfortable at meeting new people",
  "Describe your goal-setting activities",
  "How do you feel about relaxation",
  "What is your view on weekly meetings when in a team setting",
  "How comfortable are you with improvising solutions",
  "What type of role or roles are you comfortable with when on a team",
  "How do you view lateness in other people",
  "What do you do when you find yourself under great stress",
  "How do you view fast-paced workplaces that are demanding",
  "What is your opinion on the size of your circle of acquaintances",
  "Describe the type of tv shows you enjoy watching",
  "How do you view established social rules and conventions",
  "When is it easy for you to get excited about something",
  "Do you rely more on feelings that you are having or a logical analysis when resolving an issue",
  "What types of activities do you do for liesure",
  "How far in advance do you make plans",
  "Do you need prolonged periods of solitude after socialization",
  "How much planning do you put into large decisions",
  "Are your actions frequently impacted by your emotions",
  "Do you often contemplate the complexity of life",
  "How quickly do you tend to complete tasks",
  "What level of volume do you tend to speak at",
  "How often do you do something to satisfy your curiousity",
  "When do you find it easiest to initiate conversations",
  "Describe your level of relaxation when under a tight deadline",
  "How do you react when presented with strong emotions",
  "What frequency to you look for new opportunities",
  "How often do you deviate from your normal routines",
  ],
  wordCount: 0,
  cycleQuestions: function (i) {
    $("#questionArea").empty().html("<h2>" + questions.questions[i] + "</h2>");
  },
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
  returnedJSON: {},
  wordCount: function(text) {
    text.split(" ");
    var newWords = text.length;
    questions.wordCount = questions.wordCount + newWords;
  },  
  getPercentages: function(jsonObj) {
    jsonObj = JSON.parse(jsonObj);
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
  renderSunburst : function (jsonObj) {
    // code for sunburst, needs to be linked to query event
    $.getJSON(jsonObj, '', function ( profile ) {
      // $('#profile').append('<pre>' + JSON.stringify(profile, null, 2) + '</pre>');
      var chart = new PersonalitySunburstChart({'selector':'#sunburstChart', 'version': 'v3'});
      chart.show(profile, authorization.newUserPic);
    });
  }
}
$(document).ready(function(){   
  // var json = require(["/en_v3.json"]); //with path
  questions.cycleQuestions(0);
  authorization.showModal();
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
  $("#sendRecordings").on("click", app.sendRecordings);
  app.record();
  $("#getNextQuestion").on("click", function () {
    console.log("next question button pressed");
    if(questions.currentQuestion < questions.questions.length && questions.wordCount < 1000) {
      questions.currentQuestion++;
      questions.cycleQuestions(questions.currentQuestion);
      console.log(questions.currentQuestion);
    } else if (questions.wordCount > 1000 || questions.currentQuestion > questions.questions.length -1) {
      $("#recordingArea").addClass("hidden");
      $("#tabbable-area").removeClass("hidden");
      // code to get results
    }
  });
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
  })
});

                



