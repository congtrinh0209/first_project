//Khởi chạy các plugin
const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const gulp_glob = require('gulp-sass-globbing');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer')

//Set task compile Scss
gulp.task('sass', function () {
    return gulp.src(['app/sass/**/*.scss', '!app/sass/**/_*'])
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
                stream: true
            }
        ))
});
// Set task compile from ES6 to ES5
gulp.task('babel',function() {
    return gulp.src(['app/js_es6/**/*.js'])
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({
                stream: true
            }
        ))
})
//Set task auto reload browser
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app',
            index: "home.html"
        }
    })
});

//all in one task
//Note: Task 'browserSync' and 'Sass', 'babel' always run before 'watch'.
gulp.task('watch',['browserSync','sass','babel'], function () {
    gulp.watch('app/sass/**/*.scss',['sass']);   //auto compile when file change and reload browser
    gulp.watch('app/js_es6/**/*.js',['babel']);
    gulp.watch('app/*html',browserSync.reload); //auto reload when file change
})


