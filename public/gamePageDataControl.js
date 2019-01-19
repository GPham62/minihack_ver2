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
            $("#SOPS1").html(data.gameFound.sumScore[0]);
            $("#SOPS2").html(data.gameFound.sumScore[1]);
            $("#SOPS3").html(data.gameFound.sumScore[2]);
            $("#SOPS4").html(data.gameFound.sumScore[3]);
        },
        error: function(err){
            console.log(err);
        }
    })
}

let current = 0;

$("#submit").on("click", function(){
    $.ajax({
        url: "/api/games/" + gameId + "/addround",
        type: "GET",
        success: function(data){
            console.log(data.newRound.round.length);
            current = data.newRound.round.length - 1;
            $(".table tbody").append(
                `
                <tr>
                    <th scope="row">${current + 1}</th>
                    <td><input type = "number" id ="${current}" name ="0" value = ${data.newRound.round[current].score["0"]}></td>
                    <td><input type = "number" id ="${current}" name="1" value = ${data.newRound.round[current].score["1"]}></td>
                    <td><input type = "number" id ="${current}" name="2" value = ${data.newRound.round[current].score["2"]}></td>
                    <td><input type = "number" id ="${current}" name="3" value = ${data.newRound.round[current].score["3"]}></td>
                  </tr>
                `
            )
        },
        error: function(err){
            console.log(err);
        }
    })
})

$(document).on('change','input', function(){
    const data1 = {round: $(this).attr('id'), player: $(this).attr('name'), value: $(this).val()};
    $.ajax({
        url: "/games/api/" + gameId +"/savedata",
        type: "POST",
        data: data1,
        success: function(data){
            $("#SOPS1").val() = data.sumScore[0];
        },
        error: function(err){
            console.log(err);
        }
    })
})
