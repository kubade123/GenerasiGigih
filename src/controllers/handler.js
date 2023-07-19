const {nanoid} = require('nanoid');
const songs = require('../models/songs');



const addSongHandler = (req, res) => {
    const { title, artist, url } = req.body;

    const id = nanoid(16);
    let playCount = 0;

    const newSong = {
        id,
        title,
        artist,
        playCount,
        url 
    }

    if(newSong) {
        if (!title) {
            res.status(400).json({
                status: "fail",
                message: 'Gagal menambahkan lagu. Mohon isi judul lagu',
            });
            return res;
        }
        songs.push(newSong);
        res.status(200).json({
            status: "success",
            message: 'Berhasil menambahkan lagu',
            data: newSong,
        })
        return res;
    }
    res.status(200).send("ok")
    return res;
}

const getAllSongsHandler = (req, res) => {
    if(songs.length !== 0) {
        const sortKey = req.query.sortKey || 'title';
        const sortOrder = req.query.sortOrder ? req.query.sortOrder.toLowerCase() : 'asc';
        if (sortOrder === 'asc') {
            songs.sort((a, b) => {
                if (a[sortKey] < b[sortKey]) return -1;
                if (a[sortKey] > b[sortKey]) return 1;
                return 0;
              });
        }
        else {
            songs.sort((a, b) => {
                if (a[sortKey] < b[sortKey]) return 1;
                if (a[sortKey] > b[sortKey]) return -1;
                return 0;
              });
        }
        

        console.log(songs);
        res.status(200).json({
            status: "success",
            message: "Berikut adalah playlist lagu Anda",
            playlist: songs,
        });
        return res;
    }
    res.status(500).json({
        status: "Fail",
        message: "Belum ada lagu di dalam playlist. Mohon tambahkan lagu terlebih dahulu"});
    };

const playSongHandler = (req, res) => {
    let songTitle = req.query.title;
    const songFiltered = songs.filter((s) => s.title.toUpperCase() === songTitle.toUpperCase());
    console.log(songFiltered)
    if (songFiltered.length !== 0){
        songFiltered[0].playCount += 1;
        res.status(200).send(`Memutar lagu berjudul ${songFiltered[0].title}`);
        return res;
    }
    res.status(500).json({
        status: "Fail",
        message: `Lagu ${songTitle} belum ada di playlist, mohon tambahkan terlebih dahulu.`});
    };

module.exports = {addSongHandler, getAllSongsHandler, playSongHandler};