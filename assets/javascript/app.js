$(document).ready(function () {

    var questionList = [
        {
            question: "Hawaiian women were once forbidden by law to consume one fruit. What was the fruit?",
            answers: ["Pineapple", "Coconut", "Banana", "Passionfruit"],
            correct: 1,
        },
        {
            question: "In 1975, a Chinese expedition took place to climb Mount Everest. How many members did the expedition comprise?",
            answers: ["420", "440", "410", "400"],
            correct: 2,
        },
        {
            question: "Which was the first nation to give women the right to vote?",
            answers: ["America", "British", "France", "New Zeland"],
            correct: 3,
        },
        {
            question: "In the movie \"Finding Nemo\", what kind of fish swallows Marlin and Dory?",
            answers: ["The Blue Whale", "Shark", "The Humpback Whale", "The Grey Whale"],
            correct: 0,
        },
        {
            question: "How much do you think the average person's left hand types?",
            answers: ["35%", "55%", "56%", "46%"],
            correct: 2,
        },
        {
            question: "What was Walt Disney afraid of?",
            answers: ["Cat", "Mice", "Duck", "Nothing"],
            correct: 1,
        },
        {
            question: "Which was the first fruit that was eaten on the moon?",
            answers: ["Apple", "Banana", "Pear", "Peach"],
            correct: 3,
        },
        {
            question: "Which colors do colorblind people have trouble distinguishing?",
            answers: ["Between the colors red and green", "Between the colors red and yellow", "Between the colors blue and green", "Between the colors red and blue"],
            correct: 0,
        },
        {
            question: "Where would you find the world's most ancient forest?",
            answers: ["Africa", "Brazil", "Australia", "America"],
            correct: 2,
        },
        {
            question: "Which is the only U.S. state's capital city with not a single McDonald's fast food joint?",
            answers: ["Charleston, West Virginia", "Pierre, South Dakota", "Helena, Montana", "Montpelier, Vermont"],
            correct: 3,
        },
    ]

    var correctCount = 0;
    var wrongCount = 0;
    var unpickCount = 0;
    var questionCount = questionList.length;
    var storeArr= [];
    var userChoice = "";
    var timer = 20;
    var intervalTime;
    var runTimeReady= false;
    var index;
    var randomPick;

    function getImg() { 
        var req = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cats";
            $.ajax({url: req}).then(function(response){
                var link = response.data.fixed_height_downsampled_url;
                var gif = $("<img>").attr("src", link);
                $("#answer-section").append(gif);
          });
    }

    $("#restart").hide();

    $("#start").on("click", function() {
        $("#start").hide();
        renderPage();
        startTimer();
        for(var i = 0; i < questionList.length; i++) {
        storeArr.push(questionList[i]);
        }
    })

    function countdown() {
        $("#display-time").html("<p id='p-time'>Time remaining: " + timer + "</p>");
        timer --;
            if (timer === 0) {
                unpickCount++;
                stopTimer();
                $("#answer-section").html("<p>Time is up! The correct answer is: " + randomPick.answers[randomPick.correct] + "</p>");
                renderImg();
            }	
    }
    
    function startTimer() {
        if (!runTimeReady) {
            intervalTime = setInterval(countdown, 1000); 
            runTimeReady = true;
        }
    }
    
    function stopTimer() {
        runTimeReady = false;
        clearInterval(intervalTime);
    }

    function renderPage() {
        index = Math.floor(Math.random()* questionList.length);
        randomPick = questionList[index];
        
        $('#question').html('<p>' + randomPick.question);

        for(var i = 0; i < randomPick.answers.length; i++) {
            userChoice = $('<div class="user-answer">');
            userChoice.html(randomPick.answers[i]);
            userChoice.attr("data-choice", i);
            $('#answer-section').append(userChoice);
        }

        $('.user-answer').on('click', function(){
            userChoice = parseInt($(this).attr("data-choice"));

            if (userChoice === randomPick.correct) {
                stopTimer();
                correctCount++;
                userChoice="";
                $("#answer-section").html("<p>Correct!</p>");
                renderImg();
        
            } else {
                stopTimer();
                wrongCount++;
                userChoice="";
                $("#answer-section").html("<p>Wrong! The correct answer is: " + randomPick.answers[randomPick.correct] + "</p>");
                renderImg();
            }
        })
    }

    function renderImg () {
        getImg();
        questionList.splice(index, 1);

        var hide = setTimeout(function() {
            $("#answer-section").empty();
            timer= 20;

            if ((wrongCount + correctCount + unpickCount) === questionCount) {
                $("#question").empty();
                $("#question").html("<h3>Game Over!  You have: </h3>");
                $("#answer-section").append("<h4> Correct: " + correctCount + "</h4>" );
                $("#answer-section").append("<h4> Incorrect: " + wrongCount + "</h4>" );
                $("#answer-section").append("<h4> Unanswered: " + unpickCount + "</h4>" );
                $("#restart").show();
                correctCount = 0;
                wrongCount = 0;
                unpickCount = 0;

            } else {
                startTimer();
                renderPage();
            }
        }, 3000);
    }

    $("#restart").on("click", function() {
        $("#restart").hide();
        $("#question").empty();
        $("#answer-section").empty();
        
        for(var i = 0; i < storeArr.length; i++) {
            questionList.push(storeArr[i]);
        }
        startTimer();
        renderPage();
    });
});