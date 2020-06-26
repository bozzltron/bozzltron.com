module.exports = function(grunt){
 
  let githash = require('child_process').execSync('git rev-parse HEAD');
  githash = githash.toString().trim();
  console.log("version", githash.toString());
  
  grunt.initConfig({
    'string-replace': {
      serviceWorker: {
        files: [{
          expand: true,
          cwd: 'source/',
          src: 'service-worker.js',
          dest: 'source/'
        }],
        options: {
          replacements: [{
            pattern: 'GIT_HASH',
            replacement: githash.toString()
          }]
        }
      }
    },
    copy: {
      serviceWorker: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'source',
          dest: 'source/',
          src: [
            'service-worker-template.js'
          ],
          rename: function(dest, src) {
            return dest + src.replace('service-worker-template.js','service-worker.js');
          }
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['copy','string-replace']);

  
};