$(document).ready(function() {

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
        $("#random-number-text").text(randomNumber);
    };

    initializeGame();

    $("#blue-crystal-img").on("click", function() {
        totalScore = totalScore + blueCrystal;
        displayGameText();
    });

    $("#green-crystal-img").on("click", function() {
        totalScore = totalScore + greenCrystal;
        displayGameText();
    });

    $("#pink-crystal-img").on("click", function() {
        totalScore = totalScore + pinkCrystal;
        displayGameText();
    });

    $("#yellow-crystal-img").on("click", function() {
        totalScore = totalScore + yellowCrystal;
        displayGameText();
    });

    $(".crystal").on("click", function() {
        if (totalScore === randomNumber) {
            wins++;
            initializeGame();
        };
        if (totalScore > randomNumber) {
            losses++
            initializeGame();
        };
    });
});
