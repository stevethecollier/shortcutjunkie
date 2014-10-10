exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec/navigation.js',
        'spec/shortcuts.js',
        'spec/search.js'
    ]
}