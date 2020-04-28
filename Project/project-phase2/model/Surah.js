const mongoose = require("mongoose");

const surahSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    englishName: {type: String, required: true},
    ayaCount: {type: Number, required: true}
});

const Surah = mongoose.model('Surah', surahSchema);

module.exports = Surah;