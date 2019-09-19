$(document).ready(function () {

    // array of character objects
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

    // global variables
    var userCharacter;
    var userCharacterID;
    var enemyCharacterID;
    var chosenEnemeyCharacter;
    var isEnemyChosen = false;
    var currentAttackPower = 0;
    var gameReset = true;

    // function to update the game text
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

    // function to reset the game
    function restartGame() {
        currentAttackPower = 0;
        characterList[0].healthPoints = 120;
        characterList[1].healthPoints = 100;
        characterList[2].healthPoints = 150;
        characterList[3].healthPoints = 180;
        gameReset = true;
        isEnemyChosen = false;
        $("#character-container").appendTo("#choose-character-area");
        $(".your-character").appendTo("#character-container");
        $(".your-character").addClass("character").removeClass("your-character");
        $(".chosen-enemy").appendTo("#character-container");
        $(".chosen-enemy, .enemy-character").addClass("character").removeClass("enemy-character").removeClass("chosen-enemy");
        $(".character").show()
        $("#user-attack-message").text("");
        $("#enemy-attack-message").text("");
        displayGameText();
    };

    // call the game text function to show character names and hp on page load
    displayGameText();

    // function to move the user selected character to the your character section. also moves the remaining character to the enemies available to attack section
    $(document).on("click", ".character", function () {
        userCharacter = $(this).appendTo("#your-character-area"); // sets user character to the one the user clicked
        userCharacterID = $(this).attr("id"); // stores the id from the selected character
        $(userCharacter).addClass("your-character").removeClass("character"); // adds class your-character and removes character class from selected character for styling and functionality
        $("#character-container").appendTo("#enemies-available-to-attack"); // moves the character container holding the remaing enemies to the enemies available to attack section
        $(".character").addClass("enemy-character").removeClass("character"); // adds enemy-character class and removes character for styling and functionality
    });

    // function to move the selected enemy to the defender area
    $(document).on("click", ".enemy-character", function () {
        if (!isEnemyChosen) { // makes sure an enemy hasn't already been chosen
            chosenEnemeyCharacter = $(this).appendTo("#defender-area"); // sets user chosen enemy 
            enemyCharacterID = $(this).attr("id"); // stores id from selected enemy
            $(chosenEnemeyCharacter).addClass("chosen-enemy"); // adds chosen-enemy class for styling and functionality
            isEnemyChosen = true; // unable to choose another enemey if user has already selected one
            $("#user-attack-message").text(""); // resets attack message
            gameReset = false;
        }
    });

    $(document).on("click", "#attack-button", function () {
        if (!gameReset && isEnemyChosen) { // if the attack button is clicked, run the following code only if the game is not reset and an enemy is chosen
            for (i = 0; i < characterList.length; i++) { // for loop to compare stored user character id against the object characterIDs. user character is set to the object that matches the id
                if (characterList[i].characterID === userCharacterID) {
                    userCharacter = characterList[i];
                }
            };
            for (j = 0; j < characterList.length; j++) { // for loop to compare stored enemy character id against the object characterIDs. chosen enemy character is set to the object that matches the id
                if (characterList[j].characterID === enemyCharacterID) {
                    chosenEnemeyCharacter = characterList[j];
                }
            };
            function userAttack() { // function for user attacks
                currentAttackPower = currentAttackPower + userCharacter.attackPower;
                chosenEnemeyCharacter.healthPoints = chosenEnemeyCharacter.healthPoints - currentAttackPower;
                displayGameText();
            };
            function enemyAttack() { // function for enemy attacks
                userCharacter.healthPoints = userCharacter.healthPoints - chosenEnemeyCharacter.counterAttackPower;
                displayGameText();
            };
            if (userCharacter.healthPoints > 0 && chosenEnemeyCharacter.healthPoints > 0) { // if both user and enemy characters are above 0 hp then the user will attack
                userAttack();
                if (chosenEnemeyCharacter.healthPoints > 0) { // if after the user attack if the enemy is still alive, enemy will attack
                    enemyAttack();
                    $("#user-attack-message").text("You attacked " + chosenEnemeyCharacter.name + " for " + currentAttackPower + " damage.");
                    $("#enemy-attack-message").text(chosenEnemeyCharacter.name + " attacked you back for " + chosenEnemeyCharacter.counterAttackPower + " damage.")
                } else if (chosenEnemeyCharacter.healthPoints <= 0 && $("#character-container").children().length == 0) { // if after user attack the enemy is defeated and there are no more characters to choose from
                    $(".chosen-enemy").hide(); // remove enemy from arena
                    $("#user-attack-message").text("You won!!!! GAME OVER!!!!"); // and the user has won the game
                    $("#enemy-attack-message").html('<button type="button" id="restart-button">Restart Game</button>'); // inserts a restart game button
                    $("#restart-button").on("click", function () { // calls restart game function on click
                        restartGame();
                    });
                } else if (chosenEnemeyCharacter.healthPoints <= 0) { // if after user attack enemy is defeated
                    $(".chosen-enemy").hide(); // remove enemy from arena
                    $("#user-attack-message").text("You defeated " + chosenEnemeyCharacter.name + ". Choose another enemy to fight."); // and choose another enemy to fight
                    $("#enemy-attack-message").text("");
                    isEnemyChosen = false; // disables attack button until another enemy is chosen
                }
                if (userCharacter.healthPoints <= 0) { // iff the user characters hp is 0 or less
                    $("#user-attack-message").text("You have been defeated. GAME OVER!!!!"); // then the user has been defeated
                    $("#enemy-attack-message").html('<button type="button" id="restart-button">Restart Game</button>'); // insert restart game button
                    $("#restart-button").on("click", function () { // and reset game on click
                        restartGame();
                    });
                }
            };
        } else if (!gameReset && !isEnemyChosen) { // if the attack button is clicked while the game is not reset and there is no enemy chosen
            $("#user-attack-message").text("There is nothing to attack. Please choose another enemy."); // then tells the user to select an enemy
        }
    });
});
