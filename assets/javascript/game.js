$(document).ready(function () {

    var wins = 0;
    var losses = 0;
    var totalScore;
    var randomNumber;
    var blueCrystal;
    var greenCrystal;
    var pinkCrystal;
    var yellowCrystal;
    

    function initializeGame() {
        randomNumber = Math.floor(Math.random() * 101 + 19);
        $("#random-number-text").text(randomNumber);
        totalScore = 0;
        blueCrystal = Math.floor(Math.random() * 11 + 1);
        greenCrystal = Math.floor(Math.random() * 11 + 1);
        pinkCrystal = Math.floor(Math.random() * 11 + 1);
        yellowCrystal = Math.floor(Math.random() * 11 + 1);
        displayGameText();
    };

    function displayGameText() {
        $("#wins-text").text(wins);
        $("#losses-text").text(losses);
        $("#total-score-text").text(totalScore);
    };

    initializeGame();

    $("#blue-crystal-img").on("click", function(){
        totalScore = totalScore + blueCrystal;
        displayGameText();
    });

    $("#green-crystal-img").on("click", function(){
        totalScore = totalScore + greenCrystal;
        displayGameText();
    });

    $("#pink-crystal-img").on("click", function(){
        totalScore = totalScore + pinkCrystal;
        displayGameText();
    });

    $("#yellow-crystal-img").on("click", function(){
        totalScore = totalScore + yellowCrystal;
        displayGameText();
    });

    if(totalScore = randomNumber){
        wins++;
        initializeGame();
    };
    if(totalScore > randomNumber){
        losses++
        initializeGame();
    };

});
