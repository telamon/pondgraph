const PondGraph = require('.')
const { EventEmitter } = require('events')
const pgraph = new PondGraph()

// The object we want to trace
const myObj = {
  a: 'hello',
  b: 3,
  greet (name) {
    console.log('hey', name)
  }
}

// Wrap your object in a tracing proxy
const proxy = pgraph.trace('My Object', myObj)
// From this point on pass the proxy-reference instead
// of the genuine object.

//Any interaction with the proxy object
// will be logged and can later be rendered as a graph.
proxy.what = 4
proxy.undefinedProp
proxy.bye = console.log.bind(null, 'bye')

// Simulate an event emitter
const emitter = new EventEmitter()
emitter.on('connect', proxy.greet)
emitter.emit('connect', 'Alex')

process.nextTick(() => {
  proxy.bye()
  console.log('Mermaid graph: ',pgraph.mermaidUrl())
})
