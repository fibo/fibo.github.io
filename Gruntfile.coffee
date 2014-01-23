
livereloadPort = 35729

module.exports = (grunt) ->
  grunt.initConfig
    watch:
      Gruntfile:
        files: ['Gruntfile.coffee']
        tasks: 'watch'

      index:
        files: ['index.html']
        tasks: []
        options:
          livereload: livereloadPort
      js:
        files: ['js/*.js']
        tasks: []
        options:
          livereload: livereloadPort
    connect:
      server:
        options:
          port: 3000
          livereload: livereloadPort
    open:
      index:
        path: 'http://localhost:3000'
        app: 'chrome'

  # autoload grunt npmTasks
  grunt.loadNpmTasks npmTask for npmTask in require('matchdep').filterDev('grunt-*')

  grunt.registerTask 'default', ['connect', 'open', 'watch']

