var gulp = require('gulp');

var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps'); //https://github.com/floridoo/gulp-sourcemaps
var rename = require('gulp-rename');

var LessPluginCleanCSS = require('less-plugin-clean-css'),
	cleancss = new LessPluginCleanCSS({advanced: true});

const _MIN_CSS = '.min.css';
const PATH_LESS = './less';
const PATH_CSS = './css';
const PATH_CSS_RELEASE = PATH_CSS + '/release';

var lessFiles = [PATH_LESS + '/*.less', PATH_LESS + '/!_*.less'];

gulp.task(
	'less', function () {

		// Standard with less maps.
		gulp.src(lessFiles)
			.pipe(sourcemaps.init())
			.pipe(less())
			.pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../less'}))
			.pipe(gulp.dest(PATH_CSS))
		;

		// Minified with less maps.
		gulp.src(lessFiles)
			.pipe(sourcemaps.init())
			.pipe(less({plugins: [cleancss]}))
			.pipe(rename({extname: _MIN_CSS}))
			.pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../less'}))
			.pipe(gulp.dest(PATH_CSS))
		;


	});

gulp.task(
	'less.release', function () {

		// Standard with less maps.
		gulp.src(lessFiles)
			.pipe(less())
			.pipe(gulp.dest(PATH_CSS_RELEASE))
		;

		// Minified with less maps.
		gulp.src(lessFiles)
			.pipe(less({plugins: [cleancss]}))
			.pipe(rename({extname: _MIN_CSS}))
			.pipe(gulp.dest(PATH_CSS_RELEASE))
		;

	});


gulp.task('default', ['less', 'less.release']);
