var gulp = require('gulp');

(function(){
	var less = require('gulp-less');
	var sourcemaps = require('gulp-sourcemaps');

	var LessPluginCleanCSS = require("less-plugin-clean-css"),
		cleancss = new LessPluginCleanCSS({advanced: true});

	var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
		autoprefix = new LessPluginAutoPrefix({browsers: ["last 2 versions"]});

	// The following tasks approximately mirror what the WebStorm File Watchers do.

	var lessFiles = ['*.less', '!_*.less'];

	gulp.task(
		'less', function() {

			gulp.src(lessFiles)
				.pipe(sourcemaps.init())
				.pipe(less())
				.pipe(sourcemaps.write('./'))
				.pipe(gulp.dest('./'))
			;

		});

	gulp.task(
		'less.release', function() {

			gulp.src(lessFiles)
				.pipe(less())
				.pipe(gulp.dest('./release'))
			;

		});

	gulp.task(
		'less.min', function() {

			gulp.src(lessFiles)
				.pipe(sourcemaps.init())
				.pipe(
				less(
					{
						plugins: [cleancss]
					}))
				.pipe(sourcemaps.write('./'))
				.pipe(gulp.dest('./min'))
			;

		});

	gulp.task(
		'less.release.min', function() {

			gulp.src(lessFiles)
				.pipe(
				less(
					{
						plugins: [cleancss]
					}))
				.pipe(gulp.dest('./release/min'))
			;

		});
})();

gulp.task(
	'default',
	['less','less.release','less.min','less.release.min'],
	function() {});
