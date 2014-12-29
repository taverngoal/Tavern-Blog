module.exports = function (grunt) {
    grunt.initConfig({
        uglify: {
            controllers: {
                files: [
                    {
                        expand: true,
                        cwd: 'web/assets/controllers',
                        src: '*.js',
                        dest: 'web/assets/dist',
                        ext: '.min.js'
                    },
                    {
                        expand: true,
                        cwd: 'web/assets/services',
                        src: '*.js',
                        dest: 'web/assets/dist',
                        ext: '.min.js'
                    }]
            }
        },
        watch: {
            options: {cwd: 'web/assets'},
            controllers: {
                files: ['controllers/*.js', 'services/*.js'],
                tasks: ['uglify:controllers']
            }
        },
        concat: {
            options: {separator: ';'},
            controllers: {
                // 将要被合并的文件
                src: ['web/assets/controllers/pdfController.js', 'web/assets/controllers/postController.js'],
                // 合并后的JS文件的存放位置
                dest: 'web/assets/dist/controllers.js'
            }
        }
        // task configuration
    });


    // Load the plugin
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s)
    grunt.registerTask('default', ['uglify']);
}

;