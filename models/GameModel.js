const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: {type: String},
    sumScore: {type: Number},
    playerName:{type: Object},
    round: {type: Object}
},{
    timestamps: true,
});

module.exports = mongoose.model("game", GameSchema);