describe('shortcuts', function() {
    it('should have a home', function() {
        browser.get('http://localhost:3000/#/partials/shortcuts');
        expect(browser.getTitle()).toEqual('Shortcuts Home');
    });

    it('should edit a shortcut', function() {
        element.all(by.css('.shortcut')).then(function(elements) {
            var shortcut = elements[elements.length - 1];
            shortcut.element(by.css('.idInfo')).getText().then(function(text) {
                //go to edit page
                var idIndex = text.indexOf('=') + 2;
                browser.get('http://localhost:3000/#/partials/edit/' + text.substr(idIndex));
                expect(browser.getTitle()).toEqual('Edit Shortcut');
                //edit 
            });
        });
    });
});