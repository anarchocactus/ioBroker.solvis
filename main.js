/**
 *
 * solvis adapter
 *
 *
 *  file io-package.json comments:
 *
 *  {
 *      "common": {
 *          "name":         "solvis",                  // name has to be set and has to be equal to adapters folder name and main file name excluding extension
 *          "version":      "0.0.0",                    // use "Semantic Versioning"! see http://semver.org/
 *          "title":        "Node.js solvis Adapter",  // Adapter title shown in User Interfaces
 *          "authors":  [                               // Array of authord
 *              "name <mail@solvis.com>"
 *          ]
 *          "desc":         "solvis adapter",          // Adapter description shown in User Interfaces. Can be a language object {de:"...",ru:"..."} or a string
 *          "platform":     "Javascript/Node.js",       // possible values "javascript", "javascript/Node.js" - more coming
 *          "mode":         "daemon",                   // possible values "daemon", "schedule", "subscribe"
 *          "schedule":     "0 0 * * *"                 // cron-style schedule. Only needed if mode=schedule
 *          "loglevel":     "info"                      // Adapters Log Level
 *      },
 *      "native": {                                     // the native object is available via adapter.config in your adapters code - use it for configuration
 *          "test1": true,
 *          "test2": 42
 *      }
 *  }
 *
 */

/* jshint -W097 */// jshint strict:false
/*jslint node: true */
"use strict";

var utils = require(__dirname + '/lib/utils'); // Get common adapter utils
var req = require("request");
var adapter = utils.adapter('solvis');

// is called when adapter shuts down - callback has to be called under any circumstances!
adapter.on('unload', function (callback) {
    try {
        adapter.log.info('cleaned everything up...');
        callback();
    } catch (e) {
        callback();
    }
});

// is called if a subscribed object changes
adapter.on('objectChange', function (id, obj) {
    // Warning, obj can be null if it was deleted
    adapter.log.info('objectChange ' + id + ' ' + JSON.stringify(obj));
});

// Some message was sent to adapter instance over message box. Used by email, pushover, text2speech, ...
adapter.on('message', function (obj) {
    if (typeof obj == 'object' && obj.message) {
        if (obj.command == 'send') {
            // e.g. send email or pushover or whatever
            console.log('send command');

            // Send response in callback if required
            if (obj.callback) adapter.sendTo(obj.from, obj.command, 'Message received', obj.callback);
        }
    }
});


adapter.on('ready', function () {
    main();
});

function main() {

  adapter.setObject('S1',{type: 'state',common:{name: 'Temperatur Warmwasserpuffer',type: 'number',role: 'state'},native:{}});
  adapter.setObject('S2',{type: 'state',common:{name: 'Temperatur Warmwasser',type: 'number',role: 'state'},native:{}});
  adapter.setObject('S3',{type: 'state',common:{name: 'Temperatur Speicherreferenz',type: 'number',role: 'state'},native:{}});
  adapter.setObject('S4',{type: 'state',common:{name: 'Temperatur Heizungspuffer oben',type: 'number',role: 'state'},native:{}});
  adapter.setObject('S5',{type: 'state',common:{name: 'Temperatur Solarvorlauf',type: 'number',role: 'state'},native:{}});
  adapter.setObject('S6',{type: 'state',common:{name: 'Temperatur Solarrücklauf',type: 'number',role: 'state'},native:{}});
  adapter.setObject('S7',{type: 'state',common:{name: 'Solardruck',type: 'number',role: 'state'},native:{}});
  adapter.setObject('S8',{type: 'state',common:{name: 'Temperatur Solarkollektor',type: 'number',role: 'state'},native:{}});
  adapter.setObject('S9',{type: 'state',common:{name: 'Temperatur Heizungspuffer unten',type: 'number',role: 'state'},native:{}});
  adapter.setObject('S10',{type: 'state',common:{name: 'Temperatur aussen',type: 'number',role: 'state'},native:{}});
  adapter.setObject('S11',{type: 'state',common:{name: 'Temperatur Zirkulation',type: 'number',role: 'state'},native:{}});
  adapter.setObject('S12',{type: 'state',common:{name: 'Temperatur Vorlauf HK1',type: 'number',role: 'state'},native:{}});
  adapter.setObject('S13',{type: 'state',common:{name: 'Temperatur Vorlauf HK2',type: 'number',role: 'state'},native:{}});
  adapter.setObject('S14',{type: 'state',common:{name: 'unbelegt',type: 'number',role: 'state'},native:{}});
  adapter.setObject('S15',{type: 'state',common:{name: 'unbelegt',type: 'number',role: 'state'},native:{}});
  adapter.setObject('S16',{type: 'state',common:{name: 'unbelegt',type: 'number',role: 'state'},native:{}});
  adapter.setObject('S17',{type: 'state',common:{name: 'Durchfluss Zirkulation',type: 'number',role: 'state'},native:{}});
  adapter.setObject('S18',{type: 'state',common:{name: 'Durchfluss Solar',type: 'number',role: 'state'},native:{}});
  adapter.setObject('RF1',{type: 'state',common:{name: 'Temperatur Raumfühler 1',type: 'number',role: 'state'},native:{}});
  adapter.setObject('RF2',{type: 'state',common:{name: 'Temperatur Raumfühler 2',type: 'number',role: 'state'},native:{}});
  adapter.setObject('RF3',{type: 'state',common:{name: 'Temperatur Raumfühler 3',type: 'number',role: 'state'},native:{}});
  adapter.setObject('A1',{type: 'state',common:{name: 'Pumpe Solar',type: 'number',role: 'state'},native:{}});
  adapter.setObject('A2',{type: 'state',common:{name: 'Pumpe Warmwasser',type: 'number',role: 'state'},native:{}});
  adapter.setObject('A3',{type: 'state',common:{name: 'Pumpe HK1',type: 'number',role: 'state'},native:{}});
  adapter.setObject('A4',{type: 'state',common:{name: 'Pumpe HK2',type: 'number',role: 'state'},native:{}});
  adapter.setObject('A5',{type: 'state',common:{name: 'Pumpe Zirkulation',type: 'number',role: 'state'},native:{}});
  adapter.setObject('A6',{type: 'state',common:{name: 'Pumpe HK3',type: 'number',role: 'state'},native:{}});
  adapter.setObject('A7',{type: 'state',common:{name: 'unbelegt',type: 'number',role: 'state'},native:{}});
  adapter.setObject('A8',{type: 'state',common:{name: 'Mischer HK1 auf',type: 'number',role: 'state'},native:{}});
  adapter.setObject('A9',{type: 'state',common:{name: 'Mischer HK1 zu',type: 'number',role: 'state'},native:{}});
  adapter.setObject('A10',{type: 'state',common:{name: 'Mischer HK2 auf',type: 'number',role: 'state'},native:{}});
  adapter.setObject('A11',{type: 'state',common:{name: 'Mischer HK2 zu',type: 'number',role: 'state'},native:{}});
  adapter.setObject('A12',{type: 'state',common:{name: 'Brenner',type: 'number',role: 'state'},native:{}});
  adapter.setObject('A13',{type: 'state',common:{name: 'unbekannt',type: 'number',role: 'state'},native:{}});
  adapter.setObject('A14',{type: 'state',common:{name: 'unbekannt',type: 'number',role: 'state'},native:{}});
  adapter.setObject('SE',{type: 'state',common:{name: 'Solarertrag gesamt',type: 'number',role: 'state'},native:{}});
  adapter.setObject('SL',{type: 'state',common:{name: 'Solarleistung',type: 'number',role: 'state'},native:{}});

  adapter.subscribeStates('*');

  // inital call
  requestData();
  // polling in configured interval
  setInterval(requestData,adapter.config.polling*60000);

}


// Get data from Solvis Remote
function requestData() {
  req.get('http://'+adapter.config.hostname+'/sc2_val.xml',
    {'auth':
      {
		    'user':adapter.config.user,
		    'pass':adapter.config.password,
		    'sendImmediately': false
      }
    },function(error,response,data) {
		  if(!error && response.statusCode == 200) {
        //adapter.log.info("Successfully requested data from Solvis Remote");
        setDataPoints(data);
		  } else {
			 adapter.log.error("Cannot get data from Solvis Remote!\n");
		  }
    }
  );
}


// Parse Solvis data string and set datapoints
function setDataPoints(data) {
  var hex;
  var value;
  data = data.replace(/<(?:.|\n)*?>/gm, '');
	data = data.slice(26);

  for (var i=0;i<63;i++) {
		// Temperaturen
		if (i < 16) {
			hex = data.slice(0,4);
			value = solhex2dec(hex);
			data = data.slice(4);
			if (value > 32767) {
				value = value - 65536;
			}
			value = value / 10;
      //adapter.log.info("Setting datapoint: "+"S"+(i+1));
			adapter.setState('S'+(i+1),{val:value,ack:true});
    // Durchfluss Zirkulationspumpe
		} else if(i == 16){
			hex = data.slice(0,4);
			value = solhex2dec(hex);
			data = data.slice(4);
			//adapter.log.info("Setting datapoint: "+"S"+(i+1));
			adapter.setState('S'+(i+1),{val:value,ack:true});
			// Durchfluss
		} else if(i == 17){
			hex = data.slice(0,4);
			value = solhex2dec(hex);
			data = data.slice(4);
			//adapter.log.info("Setting datapoint: "+"S"+(i+1));
			adapter.setState('S'+(i+1),{val:value,ack:true});
			// AnalogIn (skip)
    }	else if(i >= 18 && i <=20) {
			hex = data.slice(0,4);
			value = solhex2dec(hex);
			data = data.slice(4);
			//adapter.log.info("Setting AnalogIn: "+"A"+(i+1)+" value: "+value);
			// AnalogOut (skip)
		} else if(i >= 21 && i <=24) {
			hex = data.slice(0,2);
			value = solhex2dec(hex);
			data = data.slice(2);
			//adapter.log.info("Setting AnalogOut: "+"A"+(i+1)+" value: "+value);
    } else if(i >= 25 && i <=27) {
			hex = data.slice(0,4);
			value = solhex2dec(hex);
			data = data.slice(4);
			if(value > 32767) {
				value = value - 65536;
			}
			value = value / 10;
			//adapter.log.info("Setting datapoint: "+"RF"+(i-24));
			adapter.setState('RF'+(i-24),{val:value,ack:true});
		} else if(i >= 28 && i <=41){
			hex = data.slice(0,2);
			value = solhex2dec(hex);
			data = data.slice(2);
			//adapter.log.info("Setting datapoint: "+"A"+(i-27));
			adapter.setState('A'+(i-27),{val:value,ack:true});
		}
  }
  data = data.slice(16);  // skip values
  hex = data.slice(0,4);
  value = solhex2dec(hex);
  data = data.slice(4);
  //adapter.log.info("Setting datapoint: "+"SE");
  adapter.setState('SE',{val:value,ack:true});
  data = data.slice(30); // skip values
  hex = data.slice(0,4);
  value = solhex2dec(hex)/10;
  data = data.slice(4);
  //adapter.log.info("Setting datapoint: "+"SL");
  adapter.setState('SL',{val:value,ack:true});
}

function solhex2dec(hex) {
	var n1 = hex.slice(0,2);
	var n2 = hex.slice(2,4);
	var u = n2+n1;
	return hexdec(u);
}

function hexdec(hex) {
	hex = (hex+'').replace(/[^a-f0-9]/gi,'');
	return parseInt(hex,16);
}
