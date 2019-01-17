$("#mainForm").on("submit", function(event){
    event.preventDefault();
    var playerNames = {player1Name: $("#player1Name").val(),
                         player2Name: $("#player2Name").val(),
                         player3Name: $("#player3Name").val(), 
                         player4Name: $("#player4Name").val()};
    $.ajax({
        url: "/api/generateNewGame",
        type: "POST",
        data: playerNames,
        success: function(data){
            window.location.href = "/games/" + data.gameCreated._id;
        },
        error: function(err){
            console.log(err);
        }
    })
})