const queue = []

module.exports.pushToQueue = function(id, code, language, req, res){
    queue.push({
        id: id, code: code, language: language, req: req, res: res
    })
}

module.exports.getQueue = function(){
    return queue;
}

module.exports.shiftQueue = function(){
    return queue.shift();
}