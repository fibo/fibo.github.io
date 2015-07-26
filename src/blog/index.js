
var dflow = require('dflow')

var graph = require('./graph.json')
var funcs = require('./funcs')

var func = dflow.fun(graph, funcs)

  console.log(func)
  console.log(graph)

func()
