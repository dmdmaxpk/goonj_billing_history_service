const SyncCollectionRepository = require('../repos/SyncCollectionRepository');
const syncRepo = new SyncCollectionRepository();


exports.syncCollection = async(req, res) => {
    let {collection, method, data} = req.body;
    
    console.log("warning", req.body);
    if(method == 'create'){
        syncRepo.create(collection, data);
    }
    else if(method == 'update'){
        syncRepo.update(collection, data);
    }
    else if(method == 'remove'){
        syncRepo.remove(collection, data);
    }

    res.send(result);
}