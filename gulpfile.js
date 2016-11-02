/*eslint-env node*/
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
//var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('default',['styles','serve','minScripts','concatScripts'],function(){
	
	gulp.watch('src/sass/**/*.scss',['styles']);
	gulp.watch('src/js/**/*.js',['minScripts']);


});

gulp.task('styles',function(){
	return gulp.src('src/sass/**/*.scss')
		.pipe(sass().on('error',sass.logError))
		.pipe(autoprefixer({
			browsers:['last 2 versions']
		}))
		.pipe(sass({outputStyle: 'compressed'}).on('error',sass.logError))
		.pipe(gulp.dest('./dist/css'))
		.pipe(reload({stream:true}));
});

// gulp.task('lint',function(){
// 	return gulp.src(['src/js/**/*.js','!node_modules/**'])
// 	.pipe(eslint())
// 	.pipe(eslint.format())
// 	.pipe(eslint.failOnError());
// });

gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
	gulp.watch('*.html').on('change',reload);
});

gulp.task('minScripts',function(){
	return gulp.src('src/js/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/min'))
		.pipe(reload({stream:true}));
});

gulp.task('concatScripts',function(){
	return gulp.src('dist/js/min/**/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist/js'));
});