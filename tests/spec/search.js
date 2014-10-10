var testShortcut = {
    application: 'testApplication',
    operatingSystem: 'testOperatingSystem',
    keyset: 'testKeyset',
    description: 'testDescription'
}

var indexes = [];

describe('search page', function() {
    it('should find a shortcut by all fields', function() {
        addTestShortcut();
        browser.get('http://localhost:3000/#/partials/search');
        //esablish indexes

        element(by.id('searchType')).all(by.tagName('option'))
            .then(function(options) {
                for (var element in options) {
                    options[element].getText().then(function(value) {
                        indexes.push(value);
                    });
                }
            });

        for (var property in testShortcut) {
            element(by.id('searchCriteria')).clear().sendKeys(testShortcut[property]);
            selectDropdownByNum(element(by.id('searchType')), property);
            element(by.id('search')).click();
            var results = element.all(by.css('.shortcut')).count();
            expect(results).toBeGreaterThan(0);
        }

        deleteLastShortcut();
    });
});

function addTestShortcut() {
    browser.get('http://localhost:3000/#/partials/shortcuts');
    element.all(by.css('.shortcut')).then(function(elements) {
        for (var property in testShortcut) {
            element(by.id(property + 'Field')).sendKeys(testShortcut[property]);
        }
        element(by.id('submitNew')).click();
    });
};

function deleteLastShortcut() {
    browser.get('http://localhost:3000/#/partials/shortcuts');
    element.all(by.css('.deleteLink')).last().click();
}

function selectDropdownByNum(element, searchType) {
    if (searchType) {
        element.all(by.tagName('option'))
            .then(function(options) {
                options[indexes.indexOf(searchType)].click();
            });
    }
};