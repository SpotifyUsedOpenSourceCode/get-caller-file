'use strict';

// Call this function in a another function to find out the file from
// which that function was called from. (Inspects the v8 stack trace)
//
// Inspired by http://stackoverflow.com/questions/13227489

module.exports = function getCallerFile(_position) {
  var position = _position ? _position : 2;

  if (position >= Error.stackTraceLimit) {
    throw new TypeError('getCallerFile(position) requires position be less then Error.stackTraceLimit but position was: `' + position + '` and Error.stackTraceLimit was: `' + Error.stackTraceLimit + '`');
  }

  var oldPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = function(err, stack) { return stack; };
  var stack = new Error().stack;
  Error.prepareStackTrace = oldPrepareStackTrace;


  // stack[0] holds this file
  // stack[1] holds where this function was called
  // stack[2] holds the file we're interested in
  return stack[position] ? stack[position].getFileName() : undefined;
};
