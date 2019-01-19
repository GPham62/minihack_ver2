const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    playerName:{type: Object},
    round: [ { score: [Number] } ],
    sumScore: [{type: Number}],
},{
    timestamps: true,
});

module.exports = mongoose.model("game", GameSchema);