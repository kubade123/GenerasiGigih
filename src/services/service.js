const songs = require('../models/songs');
const {nanoid} = require('nanoid');

const addMultilpeSongs = (req,res) => {
    for (let i = 0; i < req.body.length ;i++) {
        const id = nanoid(16);
        let playCount = 0;
        const song = {
            id,
            ...req.body[i],
            playCount,
        };
        
        songs.push(song);
    }
}

const addSingleSong = (req,res) => {
    const { title, artist, url } = req.body;
    const id = nanoid(16);
    let playCount = 0;
    const song = {
        id,
        title,
        artist,
        url ,
        playCount,
    };

    songs.push(song);
}

module.exports = {addMultilpeSongs, addSingleSong};