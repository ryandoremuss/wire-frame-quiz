

const correctAnswerIcon = 'https://media3.giphy.com/media/3ohs4l6IhkEXqnxv6E/200w.webp?cid=ecf05e47d8c0ab0e42dfbf617b9dfed613806590bcb135bc&rid=200w.webp';
const wrongAnswerIcon= "https://media1.giphy.com/media/3o6Mb43PiNTQS5WgLu/200.webp?cid=ecf05e471aa7b85bbb5f97dd40e430a9343042897137fff9&rid=200.webp";
const warningIcon = "https://media.giphy.com/media/3HAYjfdSLFvQRVRb2AE/giphy.gif";

let questionCounter = 0;
let score = 0;
let questionsArray = [
  {
      question: "1. Who is the current Quarterback for the Eagles?",
      optionone: "Carson Wentz",
      optiontwo: "Donovan McNab",
      optionthree: "Randall Cunningham",
      optionfour: "Kevin Kolb",
      correctAnswer: "Carson Wentz"
    },
    {
       question: "2. When dis the Eagles win their first Superbowl?",
      optionone: "2019",
      optiontwo: "1975",
      optionthree: "2003",
      optionfour: "2018",
      correctAnswer: "2018"
    },
    {
      question: "3. Who is the all time leading rusher for the Eagles?",
      optionone: "Lesean McCoy",
      optiontwo: "Miles Sanders",
      optionthree: "Brian Westbrook",
      optionfour: "Duce Staley",
      correctAnswer: "Lesean McCoy"
      
    },
    {
      question: "4. Who is the current Tightend for the Eagles?",
      optionone: "Eric Ebron",
      optiontwo: "Tony Gonzales",
      optionthree: "Zach Ertz",
      optionfour: "Brent Celek",
      correctAnswer: "Zach Ertz"
    },
    {
      question: "5. How many Pro Bowlers did the Eagles have in 2020?",
      optionone: "Two",
      optiontwo: "Five",
      optionthree: "Three",
      optionfour: "Ten",
      correctAnswer: "Three"
    },
    {
      question: "6. What is the name of the Eagles Stadium?",
      optionone: "Lincoln Financial Field",
      optiontwo: "Arrowhead Stadium",
      optionthree: "NRG Stadium",
      optionfour: "MetLife Stadium",
      correctAnswer: "Lincoln Financial Field"
    },
     {
      question: "7. Who is the best team in the NFC East?",
      optionone: "Philadelphia Eagles",
      optiontwo: "Dallas Cowboys",
      optionthree: "New York Giants",
      optionfour: "Washington Redskins",
      correctAnswer: "Philadelphia Eagles"
    },
  
    ];

let questionsCount = questionsArray.length;

function handleStartClick(){
    $('.js-start-button').on('click',function(event){
        $('.progress-section').show();
        $('.start-section').hide();
        $('.end-section').hide();
        $('.quiz-box').fadeIn("slow");
        renderQuizBox(); 

    });
}


function renderQuizBox(){
  renderQuestionCount();
  renderQuestion();
  renderScore();
}
function renderScore(){
  $(".progress-section .score-card").text(`${score}/${questionsCount}`);
}
function renderQuestionCount(){
  $(".progress-section .question-count").text(`Question ${questionCounter+1} of ${questionsCount}`);
}


function renderQuestion(){
  $(".questions-form p").text(questionsArray[questionCounter].question);
  $(".questions-form #option-one").val(questionsArray[questionCounter].optionone);
  $(".questions-form #option-two").val(questionsArray[questionCounter].optiontwo);
  $(".questions-form #option-three").val(questionsArray[questionCounter].optionthree);
  $(".questions-form #option-four").val(questionsArray[questionCounter].optionfour);
   
  $(".questions-form #option-one").next().text(questionsArray[questionCounter].optionone);
  $(".questions-form #option-two").next().text(questionsArray[questionCounter].optiontwo);
  $(".questions-form #option-three").next().text(questionsArray[questionCounter].optionthree);
  $(".questions-form #option-four").next().text(questionsArray[questionCounter].optionfour);
}

function handleSubmitAnswer(){
  $('.js-submit-button').on('click',function(event){
    console.log("handleSubmitAnswer() ran");
    let selectedOption = $('input[type=radio]:checked').val();
    if(selectedOption === undefined) {
       displayPopup(false, selectedOption);
    }
    else{
      $('input[type=radio]:checked').attr('checked',false);
      checkAnswer(selectedOption);
    }
 });
}

console.log(questionsArray[4].correctAnswer);

function checkAnswer(selected){
  let rightAnswer = questionsArray[questionCounter].correctAnswer;
  
  if(selected === rightAnswer){
    score++; 
    displayPopup(true, rightAnswer);
  } 
  else{
   displayPopup(false, rightAnswer);
  }
}


function displayPopup(statusFlag, answer){
  $('.feedback-section').show();
  if(statusFlag){
    const randomIcon = correctAnswerIcon;
    $(".popup-box img").attr("src",randomIcon);
    $(".popup-box #popup-text").text("Correct Answer!");
    $(".popup-box").show();
  }
  else{
      if(answer === undefined) {
         questionCounter--;
         $(".popup-box img").attr("src",warningIcon);
         $(".popup-box #popup-text").text('Please select an option');
       }
      else{
         $(".popup-box img").attr("src",wrongAnswerIcon);
        $(".popup-box #popup-text").text(`The correct answer was: ${answer}`);
      }
    }
     $(".popup-box").show();
}



function handlePopupClose(){
  $('.js-close-button').on('click', function(event){
    console.log("handlePopupClose() ran");
    $('.popup-box').hide();
    $('.feedback-section').hide();
    $('.quiz-box').hide().fadeIn();
    questionCounter++;
    if(questionCounter < questionsArray.length) {
       $('.quiz-box').fadeIn();
       renderQuizBox();
    }
    else{
      $('.quiz-box').hide();
      displayFinalScore();
    }
  });
}


function displayFinalScore(){
   $('.end-section').fadeIn(1000);
   $('.end-section h4').text(`Your Score is: ${score}/${questionsCount}`);
   $('.correct .count' ).text(score);
   $('.wrong .count').text(questionsCount - score);
   resetQuiz();
}


function resetQuiz(){
  questionCounter = 0;
  score = 0;
}


function handleStartOver(){
  $('.js-startover-button').on('click',function(event){
    console.log("handleStartOver() ran");
    $('.end-section').hide();
    $('.quiz-box').fadeIn();
    renderQuizBox();
  });
}

function init(){
  $('.end-section').hide();
  $('.progress-section').hide();
  $('.quiz-box').hide();
  $('.feedback-section').hide();
  handleStartClick();
  handleSubmitAnswer();
  handlePopupClose();
  handleStartOver()
}
$(init());