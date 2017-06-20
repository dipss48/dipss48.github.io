function populate() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        //show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        //show choices
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id,guess){
    var button=document.getElementById(id);
    button.onclick=function(){
        quiz.guess(guess);
        populate();
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element= document.getElementById("progress");
    element.innerHTML="Question" + currentQuestionNumber + "of" +quiz.questions.length;
}

function showScores() {
    var gameOverHtml = "<h1>Result</h1>";
    gameOverHtml += "<h2 id='score'> Your scores:" + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHtml;

}

var questions=[
    new Question("Berapa hasil penjumlahan dari 1+1?",["2","4","3","1"],"2"),
    new Question("Berapa hasil penjumlahan dari 13+7?",["21","19","20","22"],"20"),
    new Question("Berapa hasil pengurangan dari 48-45?",["2","4","3","1"],"3"),
    new Question("Berapa hasil pengurangan dari 32-8?",["23","26","24","28"],"24"),
    new Question("Berapa hasil perkalian dari 3x3?",["6","9","12","3"],"9"),
    new Question("Berapa hasil perkalian dari 9x5?",["50","95","45","65"],"45"),
    new Question("Berapa hasil pembagian dari 9:9?",["1","0","2","3"],"1"),
    new Question("Berapa hasil pembagian dari 20:10",["1","10","2","5"],"2")

];

var quiz = new Quiz(questions);

populate();