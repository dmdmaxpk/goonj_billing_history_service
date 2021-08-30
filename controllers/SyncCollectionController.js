const SyncCollectionRepository = require('../repos/SyncCollectionRepository');
const syncRepo = new SyncCollectionRepository();


exports.syncCollection = async(req, res) => {
    let {collection, method, data} = req.body;
    let result = undefined;

    console.log("warning", req.body);
    if(method == 'create'){
        result = await syncRepo.create(collection, data);
    }
    else if(method == 'update'){
        result = await syncRepo.update(collection, data);
    }
    else if(method == 'remove'){
        result = await syncRepo.remove(collection, data);
    }

    console.log("warning", method, result);

    res.send(result);
}