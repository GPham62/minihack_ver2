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
            const sum = data.gameFound.sumScore[0] + data.gameFound.sumScore[1] + data.gameFound.sumScore[2] + data.gameFound.sumScore[3];
            $("#SOS").html(sum);
            for(i=0; i<data.gameFound.round.length; i++){
                $(".table tbody").append(
                    `
                    <tr>
                        <th scope="row">${i + 1}</th>
                        <td><input type = "number" id ="${i + 1}" name ="0" value = ${data.gameFound.round[i].score["0"]}></td>
                        <td><input type = "number" id ="${i + 1}" name="1" value = ${data.gameFound.round[i].score["1"]}></td>
                        <td><input type = "number" id ="${i + 1}" name="2" value = ${data.gameFound.round[i].score["2"]}></td>
                        <td><input type = "number" id ="${i + 1}" name="3" value = ${data.gameFound.round[i].score["3"]}></td>
                    </tr>
                    `
                )
            };
        },
        error: function(err){
            console.log(err);
        }
    })
}

let current = 0;

$("#submit").on("input", function(){
    $.ajax({
        url: "/api/games/" + gameId + "/addround",
        type: "GET",
        success: function(data){
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
            $("#SOPS1").text(data.sumScore[0]);
            $("#SOPS2").text(data.sumScore[1]);
            $("#SOPS3").text(data.sumScore[2]);
            $("#SOPS4").text(data.sumScore[3]);
            const total = data.sumScore[0] + data.sumScore[1] + data.sumScore[2] + data.sumScore[3];
            $('#SOS').text(total);
        },
        error: function(err){
            console.log(err);
        }
    })
})
