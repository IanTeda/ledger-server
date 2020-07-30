// Speed up calls to hasOwnProperty
var hasOwnProperty = Object.prototype.hasOwnProperty;

export function isNotEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return false;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return true;
    if (obj.length === 0)  return false;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return false;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return true;
    }

    return false;
}