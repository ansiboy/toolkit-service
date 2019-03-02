let node_modules = 'node_modules'

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        browserify: {
            dist: {
                files: {
                    'dist/index.js': ['out/index.js']
                }
            },
            options: {
                browserifyOptions: {
                    standalone: 'toolkit-service',
                },
                external: ['maishu-node-mvc']
            }
        },
        copy: {
            dist: {
                files: [
                    // includes files within path
                    { expand: true, cwd: 'out', src: ['**/*.d.ts'], dest: 'dist/', filter: 'isFile' },
                ]
            }
        },
        shell: {
            src: {
                command: `tsc -p src`
            }
        },
    })

    grunt.registerTask('default', ['shell', 'browserify', 'copy']);
}