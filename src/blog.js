
var dflow = require('dflow')

var graph = require('./flow/blog.json')
var funcs = require('./flow/funcs')

var func = dflow.fun(graph, funcs)

  console.log(func)
  console.log(graph)

func()

