
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
    concat:
      templates:
        'templates/classes.jst': [
          'templates/_includes/header.jst',
          'templates/_partials/classes.jst',
          'templates/_includes/footer.jst'
        ]

  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-open'

  grunt.registerTask 'default', ['concat', 'connect', 'open', 'watch']


