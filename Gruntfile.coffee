
livereloadPort = 35729

module.exports = (grunt) ->
  grunt.initConfig
    watch:
      index:
        files: ['index.html']
        tasks: []
        options:
          livereload: 35729
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

  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-open'

  grunt.registerTask 'default', ['connect', 'open', 'watch']


