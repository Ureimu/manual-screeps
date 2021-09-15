const Game = {
    creeps: [],
    rooms: [],
    spawns: {},
    time: 12345,
    gcl: 100000,
    gpl: 100000,
    cpu: {},
    flags: {},
    map: {},
    market: {}
};
const RawMemory = {
    setActiveSegments(idList){
        if(!this.cache[Game.time]) this.cache[Game.time]=[]
        idList.forEach(id=>this.cache[Game.time].push(id))
    },
    segments:Array(100).fill(""),
    cache: {}
}
const Memory = {}

//inject mocha globally to allow custom interface refer without direct import - bypass bundle issue
global._ = require('lodash');
global.mocha = require('mocha');
global.chai = require('chai');
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));
global.Game = Game;
global.RawMemory = RawMemory;
global.Memory = Memory;
// Override ts-node compiler options
process.env.TS_NODE_PROJECT = 'tsconfig.test.json'
