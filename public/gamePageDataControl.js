const gameId = window.location.pathname.replace("/games/", "");
function loadData(){
    $.ajax({
        url: "/api/games/" + gameId,
        type: "GET",
        success: function(data){
            $("#player1Name").replaceWith('<th scope="col" id="#player1Name">' + data.gameFound.playerName.player1 +'</th>');
            $("#player2Name").replaceWith('<th scope="col" id="#player2Name">' + data.gameFound.playerName.player2 +'</th>');
            $("#player3Name").replaceWith('<th scope="col" id="#player3Name">' + data.gameFound.playerName.player3 +'</th>');
            $("#player4Name").replaceWith('<th scope="col" id="#player4Name">' + data.gameFound.playerName.player4 +'</th>');
            $("#SOPS1").replaceWith('<td id="#SOPS1">0</td>');
            $("#SOPS2").replaceWith('<td id="#SOPS2">0</td>');
            $("#SOPS3").replaceWith('<td id="#SOPS3">0</td>');
            $("#SOPS4").replaceWith('<td id="#SOPS4">0</td>');
            $("#SoS").replaceWith('<span id="SoS">0</span>');
        },
        error: function(err){
            console.log(err);
        }
    })
}

$("#submit").on("click", function(){
    $.ajax({
        url: "/api/games/" + gameId + "/addgame",
        type: "GET",
        success: function(data){
            $(".table tbody").append(
                `
                <tr>
                    <th scope="row">${data.newRound.round.number}</th>
                    <td id="1"><input type = "number" value = ${data.newRound.round.score["1"]}></td>
                    <td id="2"><input type = "number" value = ${data.newRound.round.score["2"]}></td>
                    <td id="3"><input type = "number" value = ${data.newRound.round.score["3"]}></td>
                    <td id="4"><input type = "number" value = ${data.newRound.round.score["4"]}></td>
                  </tr>
                `
            )
        },
        error: function(err){
            console.log(err);
        }
    })
})
