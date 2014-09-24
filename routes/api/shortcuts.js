/* GET users listing. */
exports.page = function(req, res) {
    var shortcuts = [{
        application: 'OS X',
        operatingSystem: 'OS X',
        keyset: 'ctrl + c',
        description: 'copy text'
    }, {
        application: 'Sublime',
        operatingSystem: 'Windows',
        keyset: 'ctrl + /',
        description: 'Toggle comment'
    }];

    res.send({
        title: 'shortcut page',
        shortcuts: shortcuts
    });
};