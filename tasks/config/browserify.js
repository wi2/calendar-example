/**
 * Compiles LESS files into CSS.
 *
 * ---------------------------------------------------------------
 *
 * Only the `assets/styles/importer.less` is compiled.
 * This allows you to control the ordering yourself, i.e. import your
 * dependencies, mixins, variables, resets, etc. before other stylesheets)
 *
 * For usage docs see:
 *    https://github.com/gruntjs/grunt-contrib-less
 */
module.exports = function(grunt) {

  grunt.config.set('browserify', {
    options: {
      external: ['react', 'react-dom', 'react-router', 'history', 'newforms', 'newforms-bootstrap', 'lodash', 'react-motion'],
      transform: [
        [require("babelify"), require('grunt-react').browserify]
      ],
      harmony: true
    },
    front: {
      src: ['./components/front/**/*.js','./components/front/*.js'],
      dest: './.tmp/public/js/front/bundle.js'
    },
    admin: {
      src: ['./components/admin/**/*.js','./components/admin/*.js'],
      dest: './.tmp/public/js/admin/bundle.js'
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
};



