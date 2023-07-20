const { express } = require('../../app');
const router = express.Router();
const {addSongHandler,getAllSongsHandler, playSongHandler} = require('../controllers/handler');
const songs = require('../models/songs');

router.get('/songs',  (req, res) => {
    if(JSON.stringify(req.query) === "{}"|| req.query.sortKey){
        getAllSongsHandler(req, res);
    }
    else {
        playSongHandler(req, res);
    }
});

router.post('/songs',  (req, res) => {
    addSongHandler(req, res);
});

module.exports = router;