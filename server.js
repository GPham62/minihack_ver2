const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect("mongodb://localhost:27017/gamelist-17", {useNewUrlParser: true}, (err) => {
    if (err) console.log("DB connect fail!", err);
    else console.log("DB connect success!");
});

const GameModel = require("./models/GameModel");

app.use(express.static("resources"));

app.use(express.static("public"));

app.post("/api/generateNewGame", (req, res)=>{
    GameModel.create({
        name: "...",
        sumScore: 0,
        playerName:{player1: req.body.player1Name, player2: req.body.player2Name, player3: req.body.player3Name, player4: req.body.player4Name,},
        round: [],
        sumScore: [0, 0, 0, 0],
    }, (err, gameCreated)=>{
        if (err) console.log(err)
        else res.send({gameCreated: gameCreated});
    });
});

app.post("/games/api/:gameid/savedata", (req, res)=>{
    GameModel.findOne({_id: req.params.gameid}, (err, gameFound) =>{
        if (err) console.log(err);
        if (!gameFound || !gameFound._id) res.status(404).send({message: "Game not exist!"});
        else {
            gameFound.round[req.body.round].score[req.body.player] = req.body.value;
            gameFound.sumScore[req.body.player] = gameFound.sumScore[req.body.player]*1 + req.body.value*1;
            GameModel.findByIdAndUpdate(
                req.params.gameid,
                {
                     $set: { round:  gameFound.round, sumScore: gameFound.sumScore},
                },
                { new: true},
                (err, gameUpdated) => {
                    if(err) console.log(err)
                    else res.send(gameUpdated);
                });
        }
    })
});


app.get("/games/:gameid", (req,res) =>{
    res.sendFile(__dirname + "/public/gamePage.html");
});

app.get("/api/games/:gameid", (req, res) =>{
    GameModel.findOne({_id: req.params.gameid}).exec((err, gameFound) =>{
        if (err) console.log(err);
        if (!gameFound || !gameFound._id) res.status(404).send({message: "Game not exist!"});
        else res.send({gameFound: gameFound});
    })
})

let index = 0;
app.get("/api/games/:gameid/addround", (req, res) =>{
    index++;
    GameModel.findByIdAndUpdate(
        req.params.gameid,
        {
            "$push": {"round": {score: [0,0,0,0]}},
        },
        {new: true},
        function(err, updated){
        if (err) console.log(err);
        else res.send({newRound: updated});
    });
})

app.get("/", (req, res)=>{
    res.redirect(__dirname + "/public/index.html");
});

app.listen(8080, (err) => {
    if (err) console.log(err);
    else console.log("Server start success!");
});

