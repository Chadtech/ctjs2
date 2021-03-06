gulp        = require 'gulp'
# stylus      = require 'gulp-stylus'
jade        = require 'gulp-jade'
coffee      = require 'gulp-coffee'
autowatch   = require 'gulp-autowatch'
coffeeify   = require 'coffeeify'
browserify  = require 'browserify'
source      = require 'vinyl-source-stream'
buffer      = require 'vinyl-buffer'


paths =
  resources: './resources'
  coffee:    './source/js/*.coffee'
  jade:      './source/html/*.jade'
  # stylus:    './source/css/*.styl'

# resources = './resources'

gulp.task 'coffee', ->
  bCache = {}
  browserified = browserify './source/js/index.coffee',
    debug:            true
    insertGlobals:    true
    cache:            bCache
    extensions:       ['.coffee']
  browserified.transform coffeeify
  browserified.bundle()
    .pipe source 'index.js'
    .pipe buffer()
    .pipe gulp.dest './public'
  # gulp.src paths.coffee
  # .pipe coffee()
  # .pipe gulp.dest './public'

gulp.task 'jade', ->
  gulp.src paths.jade
  .pipe jade()
  .pipe gulp.dest './public'

# gulp.task 'stylus', ->
#   gulp.src paths.stylus
#   .pipe stylus()
#   .pipe gulp.dest resources

gulp.task 'watch', ->
  autowatch gulp, paths

gulp.task 'server', (cb) ->
  require './server'

gulp.task 'default', 
  ['coffee', 'jade', 'server', 'watch']