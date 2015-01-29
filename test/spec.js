var assert = require('assert')
var minimist = require('minimist')
var tsiminim = require('../index.js')

it('can create cli options from an object', function() {
    //console.log(minimist('-a --foo="bar"'.split(' ')))
    //console.log(tsiminim(minimist(['a','foo=bar'])))
    //console.log(tsiminim({'_' : [], a:true, foo:'bar'}))
    assert.deepEqual(tsiminim({'_' : ['cmd'], a:true, foo:'bar'}), ['cmd','-a','--foo=bar'])
})

it('is actually the reverse of minimist', function() {
    var argv = ['cmd','-a','--foo=bar'] 
    assert.deepEqual(tsiminim(minimist(argv)), argv) 
})

it('supports multiple arrays for multiple values', function() {
    var argv = ['cmd','-a','--foo=bar','--foo=baz']
    assert.deepEqual(tsiminim({'_':['cmd'],a:true,foo:['bar','baz']}), argv)
    //console.log(minimist(argv))
    //assert.deepEqual(tsiminim(minimist(argv)), argv) 
})
