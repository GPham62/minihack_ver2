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
            
        },
        error: function(err){
            console.log(err);
        }
    })
}

let current = 0;

$("#submit").on("click", function(){
    $.ajax({
        url: "/api/games/" + gameId + "/addgame",
        type: "GET",
        success: function(data){
            console.log(data.newRound.round.length);
            current = data.newRound.round.length - 1;
            $(".table tbody").append(
                `
                <tr>
                    <th scope="row">${data.newRound.round.length - 1}</th>
                    <td><input type = "number" id ="${current}" name ="1" value = ${data.newRound.round[current].score["1"]}></td>
                    <td><input type = "number" id ="${current}" name="2" value = ${data.newRound.round[current].score["2"]}></td>
                    <td><input type = "number" id ="${current}" name="3" value = ${data.newRound.round[current].score["3"]}></td>
                    <td><input type = "number" id ="${current}" name="4" value = ${data.newRound.round[current].score["4"]}></td>
                  </tr>
                `
            )
        },
        error: function(err){
            console.log(err);
        }
    })
})

$(document).on('keyup','input', function(){
    const data1 = {round: $(this).attr('id'), player: $(this).attr('name'), value: $(this).val()};
    $.ajax({
        url: "/games/api/" + gameId +"/savedata",
        type: "POST",
        data: data1,
        success: function(data){
            console.log(data);
        },
        error: function(err){
            console.log(err);
        }
    })
})