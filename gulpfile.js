const gulp = require('gulp');
const ts = require('gulp-typescript');
const cache = require('gulp-cached');

gulp.task('compile', function(){
	return gulp.src('./ts/**/*')
			.pipe(cache('tscache'))
			.pipe(ts({
				noImplicitAny: true,
				allowJs: true
			}))
			.pipe(gulp.dest('./js'))
});


gulp.task('watch', function(){
	gulp.watch('./ts/**/*.ts', ['compile'])
});