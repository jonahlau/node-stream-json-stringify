var stream = require('stream');
var sink = require('stream-sink');
var expect = require('chai').expect

var stringify = require('..');

describe('stringify', function () {
  describe('given null', compares(null));
  describe('given a number', compares(8));
  describe('given a string', compares('Hello World'));
  describe('given true', compares(true));
  describe('given false', compares(false));

  describe('given an empty array', compares({}))
  describe('given an array', function () {
    describe('with numbers', compares([1, 2, 3]))
    describe('with strings', compares(['a', 'b', 'c']))
    describe('with mixed scalar values', compares([true, null, 'ABCD', 89]))
    describe('containing another array', compares([true, [], 2]))
    describe('containing another array as first item', compares([[true, 18], 2]));
    describe('containing an object', compares([{a: 'b'}]))
  });
  describe('given an empty object', compares({}))
  describe('given an object', function () {
    describe('containing one key', compares({a: 'a'}))
    describe('containing several keys', compares({a: 'AAA', b: 8, c: true}));
    describe('containing another object empty', compares({a: null, b: {}}));
    describe('nesting 3 levels of objects', compares({a: {b: {c: 8}, d: 'hello'}}));
    describe('containing an array', compares({array: [4,5]}))
    describe('containing arrays and objects', compares({
      a: [1, 2, {b: 8}],
      b: {
        hello: 'world',
        empty: []
      },
      good: 'bye'
    }))

    describe('containing a function', compares({myFunction: function () {}}))
  })
});


function compares (subject) {
  var json = JSON.stringify(subject);
  return function describe () {
    it('behaves the same as JSON.stringify', function (done) {
      stringify(subject).pipe(sink()).on('data', function(data) {
        expect(data).to.equal(json);
        done();
      });
    });
  }
}
