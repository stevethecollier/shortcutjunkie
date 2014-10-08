describe('shortcuts', function() {
    it('should have a home', function() {
        browser.get('http://localhost:3000/#/partials/shortcuts');
        expect(browser.getTitle()).toEqual('Shortcuts Home');
    });

    it('should add a shortcut', function() {
        element.all(by.css('.shortcut')).then(function(elements) {
            var originalCount = elements.length;

            element(by.id('applicationField')).sendKeys('testApplication');
            element(by.id('operatingSystemField')).sendKeys('testOperatingSystem');
            element(by.id('keysetField')).sendKeys('testKeyset');
            element(by.id('descriptionField')).sendKeys('testDescription');
            element(by.id('submitNew')).click();

            var newCount = element.all(by.css('.shortcut')).count();
            expect(newCount).toEqual(originalCount + 1);
        });
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

    it('should delete a shortcut', function() {
        browser.get('http://localhost:3000/#/partials/shortcuts');
        element.all(by.css('.shortcut')).then(function(elements) {
            var originalCount = elements.length;

            element.all(by.css('.deleteLink')).last().click();

            var newCount = element.all(by.css('.shortcut')).count();
            expect(newCount).toEqual(originalCount - 1);
        });
    });
});