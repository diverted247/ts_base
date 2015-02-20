var gulp    = require( 'gulp' );
var ts      = require( 'gulp-tsc' );
var connect = require( 'gulp-connect' );
var shell   = require( 'gulp-shell' );
var uglify  = require( 'gulp-uglify' );
var rename  = require( 'gulp-rename' );


gulp.task( 'compile' , function(){
    return gulp.src( [ './src/build.d.ts' ] )
        .pipe( ts( {
            target: 'ES5',
            out: 'app.js',
            outDir: './dist',
            emitError: true,
            declaration: true,
            removeComments: true
        } ) )
        .pipe( gulp.dest( './dist' ) );
});


gulp.task( 'build' , [ 'compile' ] , function(){
   gulp.src( ['./dist/app.js' ] )
      .pipe( uglify() )
      .pipe( rename({ suffix: '.min' } ) )
      .pipe( gulp.dest( './dist/' ) )
});


gulp.task( 'server' , [ 'build' ] , function () {
  connect.server({
    port: 8081
  })
});


gulp.task( 'watch' , function (){
    gulp.watch( 'src/**/*.ts' , [ 'build' ] )
});


gulp.task( 'browser' , [ 'server' ] , shell.task( [
    /^win/.test( require( 'os' ).platform() ) ? 'start http://localhost:8081/' : 'open http://localhost:8081/'
] ) );


gulp.task( 'default' , [ 'browser' ] );

