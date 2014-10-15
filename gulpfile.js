// Include gulp
var gulp = require('gulp'); 

var inject = require("gulp-inject");

var jshint = require('gulp-jshint');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    return gulp.src([
    	'app/admin/statics/js/modules.js',
    	'app/admin/statics/js/app.js',
    	'app/admin/statics/js/directives/*.js',
    	'app/admin/statics/js/services/*.js',
    	'app/admin/statics/js/controllers/*.js',
	])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('min_scripts', function() {
	
    var dest = 'app/admin/statics/js/min/';
	
    return gulp.src([
    	'app/admin/statics/js/modules.js',
    	'app/admin/statics/js/app.js',
    	'app/admin/statics/js/directives/*.js',
    	'app/admin/statics/js/services/*.js',
    	'app/admin/statics/js/controllers/*.js',
    ])
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest(dest))
	.pipe(rename('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest(dest));
});

gulp.task('scripts', function() {
	
	var target = gulp.src('app/admin/templates/index.html');
	
    var source = gulp.src([
    	'app/admin/statics/js/modules.js',
    	'app/admin/statics/js/app.js',
    	'app/admin/statics/js/directives/*.js',
    	'app/admin/statics/js/services/*.js',
    	'app/admin/statics/js/controllers/*.js',
    ],{
        read:false
    });
    
    return target.pipe(inject(source,{
	    ignorePath: 'app/admin/statics',
        addRootSlash: true,
        starttag: '<!-- inject:app_js -->',
    }))
    .pipe(gulp.dest('app/admin/templates/'));
});


gulp.task('prod_index',function(){

	var target = gulp.src('app/admin/templates/index.html');

	var source = gulp.src([
		'app/admin/statics/js/min/scripts.min.js',
	],{
        read:false
    });
    
    return target.pipe(inject(source,{
	    ignorePath: 'app/admin/statics',
        addRootSlash: true,
        starttag: '<!-- inject:app_js -->',
    }))
    .pipe(gulp.dest('app/admin/templates/'));
	
});

gulp.task('default',['scripts'])

gulp.task('prod',['min_scripts','prod_index']);
