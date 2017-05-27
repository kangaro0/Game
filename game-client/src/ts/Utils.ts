
function extend( target, argument ) {
    var i, name, f, value;
    for(i = 1; i < arguments.length; i++) {
        argument = arguments[i];
        if(typeof argument == 'function'){
            argument = argument.prototype;
        }
        for(name in argument) {
            value = argument[name];
            if(value === undefined) continue;
            if(typeof value == 'function'){
                value.name = name;
            }
            target[name] = value;
        }
    }
    return target;
}

module.exports = {
    extend: this.extend
}