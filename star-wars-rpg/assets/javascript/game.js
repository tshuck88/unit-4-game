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
            healthPoints: 150,
            attackPower: 4,
            counterAttackPower: 25,
            characterID: "darth-maul"
        }
    ];
    var obiWan = {
        name: "Obi-Wan Kenobi",
        healthPoints: 120,
        attackPower: 8,
        counterAttackPower: 8,
        characterID: "obi-wan-kenobi"
    };

    var lukeSkywalker = {
        name: "Luke Skywalker",
        healthPoints: 100,
        attackPower: 10,
        counterAttackPower: 5,
        characterID: "luke-skywalker"
    };

    var darthVader = {
        name: "Darth Vader",
        healthPoints: 150,
        attackPower: 6,
        counterAttackPower: 20,
        characterID: "darth-vader"
    };

    var darthMaul = {
        name: "Darth Maul",
        healthPoints: 150,
        attackPower: 4,
        counterAttackPower: 25,
        characterID: "darth-maul"
    };

    var userCharacter;
    var userCharacterID;
    var enemyCharacterID;
    var chosenEnemeyCharacter;
    var isEnemyChosen = false;

    function displayGameText() {
        $(".obi-wan-kenobi.character-name").text(obiWan.name);
        $(".obi-wan-kenobi.character-hp").text(obiWan.healthPoints);
        $(".luke-skywalker.character-name").text(lukeSkywalker.name);
        $(".luke-skywalker.character-hp").text(lukeSkywalker.healthPoints);
        $(".darth-vader.character-name").text(darthVader.name);
        $(".darth-vader.character-hp").text(darthVader.healthPoints);
        $(".darth-maul.character-name").text(darthMaul.name);
        $(".darth-maul.character-hp").text(darthMaul.healthPoints);
    }
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
        }
    });
    $(document).on("click", "#attack-button", function () {
        userCharacter = $.grep(characterList, function (obj) {
            return obj.characterID === userCharacterID
        });
        chosenEnemeyCharacter = $.grep(characterList, function(obj){
            return obj.characterID === enemyCharacterID
        });
    });

});
