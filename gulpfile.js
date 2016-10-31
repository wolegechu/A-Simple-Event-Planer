/*eslint-env node*/
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var eslint = require('gulp-eslint');

gulp.task('default',['styles','lint','serve'],function(){
	
	gulp.watch('sass/**/*.scss',['styles']);
	gulp.watch('js/**/*.js',['lint']);
});

gulp.task('styles',function(){
	gulp.src('sass/**/*.scss')
		.pipe(sass().on('error',sass.logError))
		.pipe(autoprefixer({
			browsers:['last 2 versions']
		}))
		.pipe(gulp.dest('./css/'))
		.pipe(reload({stream:true}));
});

gulp.task('lint',function(){
	return gulp.src(['js/**/*.js'])
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failOnError());
});

gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
	gulp.watch('*.html').on('change',reload);
});