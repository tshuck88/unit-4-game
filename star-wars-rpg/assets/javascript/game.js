$(document).ready(function () {

    var characterList = [
        {
            name: "Obi-Wan Kenobi",
            healthPoints: 120,
            attackPower: 8,
            counterAttackPower: 8,
            characterID: "obi-wan-kenobi"
        },
        {
            name: "Luke Skywalker",
            healthPoints: 100,
            attackPower: 10,
            counterAttackPower: 5,
            characterID: "luke-skywalker"
        },
        {
            name: "Darth Vader",
            healthPoints: 150,
            attackPower: 6,
            counterAttackPower: 20,
            characterID: "darth-vader"
        },
        {
            name: "Darth Maul",
            healthPoints: 180,
            attackPower: 4,
            counterAttackPower: 25,
            characterID: "darth-maul"
        }
    ];

    var userCharacter;
    var userCharacterID;
    var enemyCharacterID;
    var chosenEnemeyCharacter;
    var isEnemyChosen = false;
    var currentAttackPower = 0;

    function displayGameText() {
        $(".obi-wan-kenobi.character-name").text(characterList[0].name);
        $(".obi-wan-kenobi.character-hp").text(characterList[0].healthPoints);
        $(".luke-skywalker.character-name").text(characterList[1].name);
        $(".luke-skywalker.character-hp").text(characterList[1].healthPoints);
        $(".darth-vader.character-name").text(characterList[2].name);
        $(".darth-vader.character-hp").text(characterList[2].healthPoints);
        $(".darth-maul.character-name").text(characterList[3].name);
        $(".darth-maul.character-hp").text(characterList[3].healthPoints);
    };
    function restartGame() {
        currentAttackPower = 0;
        characterList[0].healthPoints = 120;
        characterList[1].healthPoints = 100;
        characterList[2].healthPoints = 150;
        characterList[3].healthPoints = 180;
        $("#character-container").appendTo("#choose-character-area");
        $(".chosen-enemy").appendTo("#character-container")
        $(".chosen-enemy").addClass("character").removeClass("enemy-character").removeClass("chosen-enemy");
        // $(".character").appendTo("#charater-container");
        $("#user-attack-message").text("");
        $("#enemy-attack-message").text("");
        
        displayGameText();
    };

    displayGameText();

    $(document).on("click", ".character", function () {
        userCharacter = $(this).appendTo("#your-character-area");
        userCharacterID = $(this).attr("id");
        $(userCharacter).addClass("your-character").removeClass("character");
        $("#character-container").appendTo("#enemies-available-to-attack");
        $(".character").addClass("enemy-character").removeClass("character");
    });

    $(document).on("click", ".enemy-character", function () {
        if (!isEnemyChosen) {
            chosenEnemeyCharacter = $(this).appendTo("#defender-area");
            enemyCharacterID = $(this).attr("id");
            $(chosenEnemeyCharacter).addClass("chosen-enemy");
            isEnemyChosen = true;
            $("#user-attack-message").text("");
        }
    });
    $(document).on("click", "#attack-button", function () {
        for (i = 0; i < characterList.length; i++) {
            if (characterList[i].characterID === userCharacterID) {
                userCharacter = characterList[i];
            }
        };
        for (j = 0; j < characterList.length; j++) {
            if (characterList[j].characterID === enemyCharacterID) {
                chosenEnemeyCharacter = characterList[j];
            }
        };
        function userAttack() {
            currentAttackPower = currentAttackPower + userCharacter.attackPower;
            chosenEnemeyCharacter.healthPoints = chosenEnemeyCharacter.healthPoints - currentAttackPower;
            displayGameText();
        };
        function enemyAttack() {
            userCharacter.healthPoints = userCharacter.healthPoints - chosenEnemeyCharacter.counterAttackPower;
            displayGameText();
        };
        if (userCharacter.healthPoints > 0 && chosenEnemeyCharacter.healthPoints > 0) {
            userAttack();
            if (userCharacter.healthPoints > 0 && chosenEnemeyCharacter.healthPoints > 0) {
                enemyAttack();
                $("#user-attack-message").text("You attacked " + chosenEnemeyCharacter.name + " for " + currentAttackPower + " damage.");
                $("#enemy-attack-message").text(chosenEnemeyCharacter.name + " attack you back for " + chosenEnemeyCharacter.counterAttackPower + " damage.")
            } else if (userCharacter.healthPoints > 0 && chosenEnemeyCharacter.healthPoints <= 0 && $("#character-container").children().length == 0){
                $(".chosen-enemy").detach();
                $("#user-attack-message").text("You won!!!! GAME OVER!!!!");
                $("#enemy-attack-message").html('<button type="button" id="restart-button">Restart Game</button>');
                $("#restart-button").on("click", function(){
                    restartGame();
                });
            } else if (userCharacter.healthPoints > 0 && chosenEnemeyCharacter.healthPoints <= 0) {
                $(".chosen-enemy").detach();
                $("#user-attack-message").text("You defeated " + chosenEnemeyCharacter.name + ". Choose another enemy to fight.");
                $("#enemy-attack-message").text("");
                isEnemyChosen = false;
            } 
            if (userCharacter.healthPoints <= 0 && chosenEnemeyCharacter.healthPoints > 0){
                $("#user-attack-message").text("You have been defeated. GAME OVER!!!!");
                $("#enemy-attack-message").text("");
            }  
        };
    });
});
