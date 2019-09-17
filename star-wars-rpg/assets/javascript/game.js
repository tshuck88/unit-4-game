$(document).ready(function () {
    var obiWan = {
        name: "Obi-Wan Kenobi",
        healthPoints: 120,
        attackPower: 8,
        counterAttackPower: 8
    };

    var lukeSkywalker = {
        name: "Luke Skywalker",
        healthPoints: 100,
        attackPower: 10,
        counterAttackPower: 5
    };

    var darthVader = {
        name: "Darth Vader",
        healthPoints: 150,
        attackPower: 6,
        counterAttackPower: 20
    };

    var darthMaul = {
        name: "Darth Maul",
        healthPoints: 150,
        attackPower: 4,
        counterAttackPower: 25
    };

    function displayGameText() {
        $(".obi-wan-kenobi.character-name").text(obiWan.name);
        $(".obi-wan-kenobi.character-hp").text(obiWan.healthPoints);
        $(".luke-skywalker.character-name").text(lukeSkywalker.name);
        $(".luke-skywalker.character-hp").text(lukeSkywalker.healthPoints);
        $(".darth-vader.character-name").text(darthVader.name);
        $(".darth-vader.character-hp").text(darthVader.healthPoints);
        $(".darth-maul.character-name").text(darthMaul.name);
        $(".darth-maul.character-hp").text(darthMaul.healthPoints);

    };
    displayGameText();

    $(".character").on("click", function(){
       var userCharacter = $(this).appendTo("#your-character-area");
       $(userCharacter).addClass("your-character").removeClass("character");
       $("#character-container").appendTo("#enemies-available-to-attack");
       $(".character").addClass("enemy-character").removeClass("character");
    });

    $(".enemy-character").on("click", function(){
        var chosenEnemeyCharacter = $(this).appendTo("#defender-area");
        $(chosenEnemeyCharacter).addClass("chosen-enemy")
    });


});