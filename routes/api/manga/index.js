var express = require('express');
var router = express.Router();

function initMangaApi(db){

    var mangaModel = require('./manga.model')(db);

    router.get('/', (req, res)=>{
        res.status(200).json({ok});
    });

    router.post('/new', (req, res) =>{
        var newManga = Object.assign(
            {},
            req.body,
            {
               "NumeroTomos" : parseInt(req.body.NumeroTomos),
                "KeyWords" : req.body.KeyWords.split(','),
                "Categorias" : req.body.Categorias.split(','),
            }
        );

        mangaModel.addManga(newManga, (err, result)=>{
            if(err){
                res.status(404).json(err);
            }else{
                res.status(200).json(result);
            }
        });
    });
    
    // {
    //     "Nombre":"",
    //     "Autor":"",
    //     "PaisOrigen":"",
    //     "NumeroTomos": 0,
    //     "Estado": [Ongoing | Completed | Hiatsu |Dicontinued],
    //     "KeyWords": [Arreglo de palabras],
    //     "Categorias":[Arreglo de categorías]
    //}

    router.get('/all', (req, res) =>{
        mangaModel.getAllManga((err, result)=>{
            if(err){
                res.status(400).json(err);
            }else{
                res.status(200).json(result);
            }
        })
    });

    router.put('/update/:manga', (req, res) =>{
        var manga = req.params.manga;
        var estado = req.body.estado;

        mangaModel.updateManga(estado, manga, (err, result)=>{
            if(err){
                res.status(400).json(err);
            }else{
                res.status(200).json(result);
            }
        })

    })

    router.delete('/delete/:manga', (req, res) =>{
        var manga = req.params.manga;

        mangaModel.deleteManga(manga, (err, result)=>{
            if(err){
                return res.status(500).json(err);
            }
            return res.status(200).json(result);
        })
    });

    return router;
}

module.exports = initMangaApi;