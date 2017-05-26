
$(document).ready(function() {

	function startTrivia() {
		$('.welcomePage').hide();
		$('.questionPage').show();
		showQuestion();
	}

	function showQuestion(){

		$('.result').html('');
		startTimer();
		var count = universal.question;
		var obj = questions[count];
		
		var qText = obj.q_text;
		var qDisplay = '<h3>'+qText+'</h3>'
		$('.text').html(qDisplay);
		
		var qAnswers = [obj.q_options_1, obj.q_options_2, obj.q_options_3, obj.q_options_4]
		$('.options').html('');
		for (var i = 0; i < qAnswers.length; i++) {
			var ans = qAnswers[i];
			var id = i + 1;
			var first = '<li id="'+id+'">'
			var last = '</li>'
			$('.options').append(first+ans+last);
		}

		for (var j = 1; j <= 4; j++) {
			$('#'+j).click(function(){
				showAnswer($(this).attr('id'));
			});
		}

	}

	function showAnswer(num) {
		stopTimer();
		universal.timer = 30;
		var count = universal.question;
		var obj = questions[count];
		var objCorrect = obj.q_correct_option
		if (num == 0){
			universal.noanswer++
			$('.result').html('<p>You ran out of time.</p>');
		} else if (num == objCorrect) {
			universal.correct++
			$('.result').html('<p>You\'re Right!</p>');
		} else {
			universal.wrong++
			$('.result').html('<p>Sorry, that is not correct.</p>');
			$('#'+num).addClass('wrong');
		}
		$('#'+objCorrect).addClass('correct');
		$('.result').append('<p>Correct: '+universal.correct+'</p>');
		$('.result').append('<p>Wrong: '+universal.wrong+'</p>');
		$('.result').append('<p>Timed Out: '+universal.noanswer+'</p>');
		universal.question++
		if (universal.question < 7) {
			setTimeout(showQuestion, 5000);	
		} else {
			setTimeout(gameOver, 5000);
		}
		
	}

	function gameOver() {
		
		$('.timer').html('<h2>The game is over. Thank you for playing Timed Trivia!</h2>');
		$('.text').html('');
		$('.result').html('<p>Correct: '+universal.correct+'</p>');
		$('.result').append('<p>Wrong: '+universal.wrong+'</p>');
		$('.result').append('<p>Timed Out: '+universal.noanswer+'</p>');

		if (universal.correct == 7) {
			$('.options').html('<p>Great job!</p>');
		} else if (universal.correct > universal.wrong) {
			$('.options').html('<p>Good job! Keep trying to see if you can get to 100%.</p>');
		} else {
			$('.options').html('<p>Thanks for playing!</p>');
		}
		$('.options').append('<button type="button" class="btn btn-success" id="startOverButton">Restart</button>');
		$('#startOverButton').click(function(){
			startOver();
		});
	}

	function startTimer(){
		
		universal.timer = 30;
		$('.timer').html('<h2>Time Remaining: ' + universal.timer + ' seconds</h2>');
		counter = setInterval(runTimer, 1000);
    }

   
    function runTimer(){
    	
    	
		universal.timer--

		$('.timer').html('<h2>Time Remaining: ' + universal.timer + ' seconds</h2>');
		
	
		if (universal.timer === 0){

			
			stopTimer();

		
			showAnswer(0);
		}
    }


    function stopTimer(){
		clearInterval(counter);
    }


	function startOver() {
		stopTimer();
		universal.correct = 0;
		universal.wrong = 0;
		universal.noanswer = 0;
		universal.question = 0;
		universal.timer = 30;
		startTrivia();
	}

	
	$('#startNav').click(function(){
		startTrivia();
	});

	
	$('#startButton').click(function(){
		startTrivia();
	});


	$('#startOverButton').click(function(){
		startOver();
	});
	
	var universal = {
		correct : 0,
		wrong : 0,
		noanswer : 0,
		question : 0,
		timer : 25,
	}

	function question(number,cat,text,opt1,opt2,opt3,opt4,ans,date,img) {
		this.id = number;
		this.q_category_id = cat;
		this.q_text = text;
		this.q_options_1 = opt1;
		this.q_options_2 = opt2;
		this.q_options_3 = opt3;
		this.q_options_4 = opt4;
		this.q_correct_option = ans;
		this.q_date_added = date;	
		this.image = img;
	}

	var question1 = new question(
		1,
		136,
		"What is the name of the actress who plays Hermione Granger in the Harry Potter series of films?",
		'Emma Roberts',
		'Jennifer Lawrence',
		'Nina Dobrev',
		'Emma Watson',
		4,
	
	)
	var question2 = new question(
		2,
		136,
		"Which house is Ron Weasley sorted into at Hogwarts School of Witchcraft and Wizardry?",
		'Raveclaw',
		'Slytherin',
		'Gryffindor',
		'Hufflepuff',
		3,
    )

	
	var question3 = new question(
		3,
		136,
		"Which of these is NOT one of the Unforgivable Curses?",
		'Sectumsempra',
		'Cruciatus Curse',
		'Imperius Curse',
		'Avada Kedavra',
		1,
		
	)
	var question4 = new question(
		4,
		136,
		"From what King's Cross platform does the Hogwarts Express leave?",
		'Eight and Three Quarters',
		'Nine and Three Quarters',
		'Five',
		'Ten',
		2,
		
	)
	var question5 = new question(
		5,
		136,
		"What's the name of Filch's cat?",
		'Mrs.Jones',
		'Ser Pounce',
		'Mrs.Norris',
		'Buttercup',
		3,
		
	)
	var question6 = new question(
		6,
		136,
		"What is the model of the first broom Harry ever receives?",
		'Firebolt',
		'Nimbus 2000',
		'Hoover 3000',
		'Cleansweep One',
		2,
		
	)
	var question7 = new question(
		7,
		136,
		"Who is not a character in Harry Potter?",
		'Ron Weasley',
		'Bart Simpson',
		'Draco Malfoy',
		'Luna Lovegood',
		2,
	
	)

	var questions = [question1, question2, question3, question4, question5, question6, question7]
});

