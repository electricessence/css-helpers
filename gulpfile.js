var gulp     = require('gulp'),
    less     = require('gulp-less'),
    rename   = require('gulp-rename'),

    CleanCSS = require('less-plugin-clean-css'),
    cleancss = new CleanCSS({advanced: true});


gulp.task('default', ['css', 'css.release']);


const
	_MIN_CSS = '.min.css',
	PATH_LESS    = './less',
	PATH_CSS     = './css',
	PATH_CSS_REL = PATH_CSS + '/release';

var lessFiles = [
	PATH_LESS + '/*.less',
	PATH_LESS + '/!_*.less'
];


gulp.task(
	'css',

	/* This builds standard and minified CSS helpers
	   with sourcemaps to the original LESS. */

	function() {

		// https://github.com/floridoo/gulp-sourcemaps
		var sourcemaps = require('gulp-sourcemaps');

		/* Using these setting allows for the maps
		*  to point the original source in a different folder. */
		var sourceMapOptions = {
			includeContent: false,
			sourceRoot: '../less'
		};

		// Standard.
		gulp.src(lessFiles)
			.pipe(sourcemaps.init())
			.pipe(less())
			.pipe(sourcemaps.write('.', sourceMapOptions))
			.pipe(gulp.dest(PATH_CSS))
		;

		// Minified.
		gulp.src(lessFiles)
			.pipe(sourcemaps.init())
			.pipe(less({plugins: [cleancss]}))
			.pipe(rename({extname: _MIN_CSS}))
			.pipe(sourcemaps.write('.', sourceMapOptions))
			.pipe(gulp.dest(PATH_CSS))
		;


	}
);


gulp.task(
	'css.release',

	/* This builds standard and minified CSS helpers without sourcemaps. */

	function() {

		// Standard.
		gulp.src(lessFiles)
			.pipe(less())
			.pipe(gulp.dest(PATH_CSS_REL))
		;

		// Minified.
		gulp.src(lessFiles)
			.pipe(less({plugins: [cleancss]}))
			.pipe(rename({extname: _MIN_CSS}))
			.pipe(gulp.dest(PATH_CSS_REL))
		;

	}
);


gulp.task(
	'sass',

	/*  This provides SASS versions of the original LESS files.
		Helpful for use with mixins, etc.
		Currently not included in the repository
		because not all conversions translate to usable SASS. */

	function() {

		var lessToScss = require('gulp-less-to-scss');
		const PATH_SASS = './sass';

		gulp.src(PATH_LESS + '/partials/*.less')
			.pipe(lessToScss())
			.pipe(gulp.dest(PATH_SASS + '/partials'))
		;

		gulp.src(PATH_LESS + '/*.less')
			.pipe(lessToScss())
			.pipe(gulp.dest(PATH_SASS))
		;
	}
);


