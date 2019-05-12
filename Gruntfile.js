let node_modules = 'node_modules'

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        shell: {
            src: {
                command: `tsc -p src`
            }
        },
    })

    grunt.registerTask('default', ['shell']);
}