const test = require('tape')
const PondGraph = require('.')

test('should build an in-memory graph', t => {
  const obj = { kek () { return 'bob' }, v1: 2 }
  const pgraph = new PondGraph()
  const proxy = pgraph.trace('n1', obj)
  proxy.kek('aparam')
  proxy.v1++

  const dot = pgraph.toDot()
  t.ok(dot)
  require('fs').writeFileSync('/tmp/test.dot', dot)
  t.end()
})
