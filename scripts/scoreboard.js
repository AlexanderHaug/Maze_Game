const SCOREBOARD = document.querySelectorAll(".scoreboard li");

function updateScoreboard(playerName, playerScore) {
    let tempName = playerName;
    let tempScore = playerScore;
    for (let x = 0; x < SCOREBOARD.length; x++) {
        let currentScore = SCOREBOARD[x].innerHTML.split(",");
        if (playerScore < currentScore[1]) {
            SCOREBOARD[x].innerHTML = tempName + ", " + tempScore;
            tempName = currentScore[0];
            tempScore = currentScore[1];
        }
    }
}
