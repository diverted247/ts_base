var gulp    = require( 'gulp' );
var ts      = require( 'gulp-tsc' );
var connect = require( 'gulp-connect' );
var shell   = require( 'gulp-shell' );
var uglify  = require( 'gulp-uglify' );
var del     = require( 'del' );

gulp.task( 'clean' , function( cb ){
  del([ './dist' ], cb );
});

gulp.task( 'build' , [ 'clean' ] , function(){
    return gulp.src( [ './src/build.d.ts' ] )
        .pipe( ts( {
            target: 'ES5',
            outDir: './dist',
            //module: 'amd',
            emitError: true,
            declaration: false,
            removeComments: true
        } ) )
        .pipe( gulp.dest( './dist' ) );
});


gulp.task( 'minify' , [ 'build' ] , function(){
   gulp.src( './dist/**' )
      .pipe( uglify() ) 
      .pipe( gulp.dest( './dist/' ) )
});


gulp.task( 'server' , [ 'minify' ] , function () {
  connect.server({
    port: 8081
  })
});


gulp.task( 'watch' , function (){
    gulp.watch( 'src/**/*.ts' , [ 'minify' ] )
});


gulp.task( 'browser' , [ 'server' ] , shell.task( [
    /^win/.test( require( 'os' ).platform() ) ? 'start http://localhost:8081/' : 'open http://localhost:8081/'
] ) );


gulp.task( 'default' , [ 'browser' ] );

gulp.task( 'dev' , [ 'build' ] );

gulp.task( 'prod' , [ 'minify' ] );

