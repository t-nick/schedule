
    var gulp       = require('gulp'),
        browserSync  = require('browser-sync'), 
        uglify       = require('gulp-uglifyjs'), 
        cssnano      = require('gulp-cssnano'), 
        rename       = require('gulp-rename'), 
        del          = require('del'), 
        imagemin     = require('gulp-imagemin'), 
        pngquant     = require('imagemin-pngquant'), 
        cache        = require('gulp-cache'), 
        postcss = require('gulp-postcss'),
        cssnext = require('postcss-cssnext'),
        nested = require('postcss-nested');

        gulp.task('css', function(){
            var processors = [
            cssnext,
            nested,
            ];
            return gulp.src('./app/postcss/stylesIn.css')
                .pipe(postcss(processors))
                .pipe(rename('stylesOut.css'))
                .pipe(gulp.dest('./app/postcss'))
                .pipe(cssnano())
                .pipe(rename({suffix: '.min'}))
                .pipe(gulp.dest('./app/css'));
        });

    gulp.task('browser-sync', function() { 
        browserSync({ 
            server: { 
                baseDir: 'app' 
            },
            notify: false 
        });
    });

    gulp.task('css-libs', ['css'], function() {
        return gulp.src(['app/libs/normalize-css/normalize.css']) 
            .pipe(cssnano())
            .pipe(rename({suffix: '.min'})) 
            .pipe(gulp.dest('app/css'));
    });


    gulp.task('watch', ['browser-sync', 'css-libs'], function() {
        gulp.watch('app/css/**/*.css', ['css']);
        gulp.watch('app/*.html', browserSync.reload); 
        gulp.watch('app/js/**/*.js', browserSync.reload); 
    });

    gulp.task('clean', function() {
        return del.sync('dist'); 
    });

    gulp.task('img', function() {
        return gulp.src('app/img/**/*')
            .pipe(cache(imagemin({  
                interlaced: true,
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            })))
            .pipe(gulp.dest('dist/img')); 
    });

    gulp.task('build', ['clean', 'img', 'css'], function() {

        var buildCss = gulp.src('app/css/**/*')
        .pipe(gulp.dest('dist/css'))

        var buildJs = gulp.src('app/js/**/*') 
        .pipe(gulp.dest('dist/js'))

        var buildHtml = gulp.src('app/*.html') 
        .pipe(gulp.dest('dist'));

    });

    gulp.task('clear', function () {
        return cache.clearAll();
    })

    gulp.task('default', ['watch']);
