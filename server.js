const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const GameModel = require("./models/GameModel");

app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect("mongodb://localhost:27017/gamelist-17", {useNewUrlParser: true}, (err) => {
    if (err) console.log("DB connect fail!", err);
    else console.log("DB connect success!");
});

app.use(express.static("resources"));

app.use(express.static("public"));

app.post("/api/generateNewGame", (req, res)=>{
    GameModel.create({
        name: "BocBatHo",
        sumScore: 0,
        playerName:{player1: req.body.player1Name, player2: req.body.player2Name, player3: req.body.player3Name, player4: req.body.player4Name,},
        round: {},
    }, (err, gameCreated)=>{
        if (err) console.log(err)
        else res.send({gameCreated: gameCreated});
    });
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
app.get("/api/games/:gameid/addgame", (req, res) =>{
    GameModel.findOne({_id: req.params.gameid}).exec((err, gameFound) =>{
        if (err) console.log(err);
        if (!gameFound || !gameFound._id) res.status(404).send({message: "Game not exist!"});
        else {
            index ++;
            gameFound.round = {number: index, score: {1: 0, 2:0, 3:0, 4:0}};
            gameFound.save((err, updated) =>{
                if (err) console.log(err);
                else res.send({newRound: updated});
            })           
        }
    })
})

app.get("/", (req, res)=>{
    res.redirect(__dirname + "/public/index.html");
});

app.listen(8080, (err) => {
    if (err) console.log(err);
    else console.log("Server start success!");
});

