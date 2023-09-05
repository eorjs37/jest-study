let history = [];
function eventTrigger(eventname, param = {}, callback) {
    add(eventname);
    callback(param);
}

function add(eventname) {
    history.push(eventname)
}


module.exports = eventTrigger;