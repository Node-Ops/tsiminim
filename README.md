# Reverse Parser For `argv`

```
$ npm install tsiminim
```

The opposite of [minimist](https://github.com/substack/minimist).  This module is meant to be able to construct arguments for running other cli programs from inside your node app.

```javascript
var minimist = require('minimist');
var tsiminim = require('tsiminim');

minimist('-a --foo="bar"') === tsiminim({a:true, foo='bar'});
minimist('-abc --bar=1 baz') === tsiminim(minimist('-abc --bar=1 baz'));

```

```javascript
var tsiminim = require('tsiminim'); 
var argv = tsiminim({
	_: ['rest'],
	'--': ['foo'],
	a: 1,
	b: 'b',
	c: true,
	d: true,
	e: false,
	f: null,
	g: undefined,
	h: [1,2,3],
	i: function() {return 'fnc'},
	j: {1:'1', 2:'two'},
	bar: 'baz'
}, {
	'--': true
});

// -cd -a=1 -b="b" -h="[1,2,3]" -i="fnc" -j="{\"1\":\"1\",\"2\":\"two\"}" --bar="baz" rest -- foo
console.log(argv.join(' '));
```
