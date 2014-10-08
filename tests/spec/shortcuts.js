function trimEqualsSign(text) {
    return text.substr(text.indexOf('=') + 2);
}
describe('shortcuts', function() {
    browser.get('http://localhost:3000/#/partials/shortcuts');

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
                var id = trimEqualsSign(text);
                browser.get('http://localhost:3000/#/partials/edit/' + id);
                expect(browser.getTitle()).toEqual('Edit Shortcut');
                //edit the shortcut
                element(by.id('applicationField')).clear().sendKeys('editApplication');
                element(by.id('operatingSystemField')).clear().sendKeys('editOperatingSystem');
                element(by.id('keysetField')).clear().sendKeys('editKeyset');
                element(by.id('descriptionField')).clear().sendKeys('editDescription');
                element(by.id('submitEdit')).click();
                //test edits
                browser.get('http://localhost:3000/#/partials/shortcuts');
                shortcut = element.all(by.css('.shortcut')).last();
                shortcut.element(by.css('.applicationInfo')).getText().then(function(applicationField) {
                    expect(trimEqualsSign(applicationField)).toEqual('editApplication');
                });
                shortcut.element(by.css('.operatingSystemInfo')).getText().then(function(operatingSystemField) {
                    expect(trimEqualsSign(operatingSystemField)).toEqual('editOperatingSystem');
                });
                shortcut.element(by.css('.keysetInfo')).getText().then(function(keysetField) {
                    expect(trimEqualsSign(keysetField)).toEqual('editKeyset');
                });
                shortcut.element(by.css('.descriptionInfo')).getText().then(function(descriptionField) {
                    expect(trimEqualsSign(descriptionField)).toEqual('editDescription');
                });
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