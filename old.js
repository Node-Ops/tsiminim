module.exports = function(args, opts) {

	// Default opts
	opts = opts || {};
	// @TODO: do something with these options
	//opts.string = opts.string || [];
	//opts.boolean = opts.boolean || [];
	//opts.alias = opts.alias || {};
	//opts.default = opts.default || {};
	opts['--'] = opts['--'] || false;

	// Sort all the stuff into these boxes
	var rest = [];
	var doubleDash = [];
	var shortBool = [];
	var longBool = [];
	var shortKevValPair = [];
	var longKevValPair = [];

	// Loop through the args
	for (var i in args) {

		// Set the rest
		if (i === '_') {
			rest = rest.concat(args[i]);
			continue;
		}

		// Set the rest
		if (i === '--') {
			doubleDash = doubleDash.concat(args[i]);
			continue;
		}

		// Add the option
		addOption(i, args[i]);
	}

	// ASSEMBLE!!!!!
	var argv = [];

	// Add all of the args
	argv.push('-' + shortBool.join(''));
	argv = argv.concat(longBool.map(function(val) {
		return '--' + val;
	}));
	argv = argv.concat(shortKevValPair.map(function(val) {
		return stringifyKeyVal('-', val);
	}));
	argv = argv.concat(longKevValPair.map(function(val) {
		return stringifyKeyVal('--', val);
	}));

	// Put the rest back together
	if (!opts['--']) {
		rest = rest.filter(function(i) {return doubleDash.indexOf(i) === -1;});
	}
	argv = argv.concat(rest);
	argv.push('--');
	argv = argv.concat(doubleDash);

	// Return the array
	return argv;

	function stringifyKeyVal(flag, val) {
		var v;
		switch(typeof val.value) {
			case 'number':
				v = val.value;
				break;
			case 'object':
				v = JSON.stringify(JSON.stringify(val.value));
				break;
			case 'string':
				v = '"' + val.value + '"';
				break;
		}
		return flag + val.key + '=' + v;
	};

	function addOption(key, value) {
		// Only add options that are defined and truthy
		if (typeof args[i] === 'undefined' || !args[i]) {
			return;
		}

		// Add differently depending on the type
		switch(typeof value) {
			case 'boolean':
				addBoolean(key);
				break;
			case 'string':
			case 'number':
			case 'object':
				addKeyValPair(key, value);
				break;
			case 'function':
				addOption(key, value());
				break;
		}
	}

	function addBoolean(key) {
		if (isShort(key)) {
			shortBool.push(key);
		} else {
			longBool.push(key);
		}
	}

	function addKeyValPair(key, value) {
		var v = {
			key: key,
			value: value
		};
		if (isShort(key)) {
			shortKevValPair.push(v);
		} else {
			longKevValPair.push(v);
		}
	}

	function isShort(key) {
		if (key.length === 1) return true;
		return false;
	}

};
