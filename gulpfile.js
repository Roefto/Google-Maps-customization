var gulp            = require('gulp'),
    pug             = require('gulp-pug'),
    sass            = require('gulp-sass'),
    concat          = require('gulp-concat'),
    autoprefixer    = require('gulp-autoprefixer'),
    browserSync     = require('browser-sync').create();

var path = {
    build: {
        dist     : 'dist',
        js       : 'dist/js/',
        css      : 'dist/css/',
        fonts    : 'dist/fonts/',
        img      : 'dist/images/',
        mapStyle : 'dist/json/map-style/',
        lib      : 'dist/js/lib/'
    },

    src: {
        pug      : 'src/*.pug',
        js       : 'src/js/**/*.js',
        style    : 'src/css/*.scss',
        fonts    : 'src/fonts/*.*',
        mapStyle : 'src/json/map-style/*.json',
        img      : 'src/images/**/*.*'
    }
};

gulp.task('pug', function() {
    return gulp.src(path.src.pug)
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(path.build.dist));
});

gulp.task('fonts', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('styles', function () {
    gulp.src(path.src.style)
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(autoprefixer())
        .pipe(gulp.dest(path.build.css))
});

gulp.task('map-style', function () {
    gulp.src(path.src.mapStyle)
        .pipe(gulp.dest(path.build.mapStyle))
});


gulp.task('scripts', function () {
    gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js))
});

gulp.task('images', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
});

gulp.task('default', ['pug', 'styles', 'map-style', 'scripts', 'fonts', 'images'], function() {
    browserSync.init({
        server: path.build.dist
    });
    gulp.watch(path.src.style,    ['styles']);
    gulp.watch(path.src.html,     ['html']);
    gulp.watch(path.src.js,       ['scripts']);
    gulp.watch(path.src.pug,      ['pug']);
    gulp.watch(path.src.fonts,    ['fonts']);
    gulp.watch(path.src.img,      ['images']);
    gulp.watch(path.src.img,      ['media']);
    gulp.watch(path.src.mapStyle, ['map-style']);
});

browserSync.stream();