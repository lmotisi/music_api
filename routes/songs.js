const router = require('express').Router();
const _ = require('lodash');
const SongService = require('../services/songService');

const mandatoryKeys = ['title', 'album', 'artist'];

/*const keys = _.keys(req.body);
const difference = _.difference(mandatoryKeys, keys);

if(difference.length) {
    res.status(400).send({message: "Il manque le(s) champs" + difference });
}*/
router.post('/', (req, res) => {
    return SongService.create(req.body)
        .then(song => {
            res.status(201).send(song);
        })
        .catch(err => {
            res.status(500).send(err);
        })
    ;
});

router.get('/', (req, res) => {
    SongService.find(req.query)
        .then(songs => {
            res.status(200).send(songs);
        })
    ;
});

router.get('/:id', (req, res) => {
    SongService.findById(req.params.id)
        .then(song => {
            res.status(200).send(song);
        })
        .catch(err => {
            res.status(500).send(err);
        })
});

router.get('/artists/:artist', (req,res) => {
    SongService.find({artist})
        .then(songs => {
            res.status(200).send(songs);
        })
        .catch(err => {
            res.status(500).send(err);
        })
});



module.exports = router;
