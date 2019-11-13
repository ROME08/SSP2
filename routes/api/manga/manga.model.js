var ObjectId = require('mongodb').ObjectId;

var IndexVerified = false;

function mangasModel(db){
  let mangaModel = {};
  var mangaCollection = db.collection("manga");

  if (!IndexVerified) {
    mangaCollection.indexExists("manga_1", (err, rslt) => {
      if (!rslt) {
        mangaCollection.createIndex(
          { "manga": 1 },
          { unique: true, name: "manga_1" },
          (err, rslt) => {
            console.log(err);
            console.log(rslt);
          });
      }
    }); 
  }

  mangaModel.addManga = (newManga, handler) =>{
      mangaCollection.insertOne(newManga, (err, result)=>{
        if(err){
            console.log(err);
            return handler(err, null);
        }
        return handler(null, result);
      });
  }

  mangaModel.getAllManga = (handler) =>{
      mangaCollection.find({}).toArray(
          (err, result) => {
              if(err){
                  return handler(err, null);
              }
              return handler(null, result);
          }
      )
  }

  mangaModel.updateManga = (estado, manga, handler) =>{
    let mangaFilter = {"_id": new ObjectId(manga)};
    let updateObject = {
        "$set" :{
            "Estado": {"Estado":estado}
        }
    };
  

  mangaCollection.updateOne(
      mangaFilter,
      updateObject,
      (err, result)=>{
          if(err){
              return handler(err, null);
          }
          return handler(null, result);
      }
  )
    }
  return mangaModel;
}


module.exports = mangasModel;
