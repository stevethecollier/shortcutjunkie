var testShortcut = {
    application: 'testApplication',
    operatingSystem: 'testOperatingSystem',
    keyset: 'testKeyset',
    description: 'testDescription'
}

describe('search page', function() {
    var indexes = [];
    beforeEach(function() {
        addTestShortcut();
        browser.get('http://localhost:3000/#/partials/search');
        indexes = establishIndexes();
    });

    it('should find a shortcut by all fields', function() {
        for (var property in testShortcut) {
            element(by.id('searchCriteria')).clear().sendKeys(testShortcut[property]);
            selectDropdownByNum(element(by.id('searchType')), property, indexes);
            element(by.id('search')).click();
            var results = element.all(by.css('.shortcut')).count();
            expect(results).toBeGreaterThan(0);
        }
    });

    afterEach(function() {
        deleteLastShortcut();
    });
});

//helper functions
function establishIndexes() {
    var indexes = [];
    element(by.id('searchType')).all(by.tagName('option'))
        .then(function(options) {
            for (var element in options) {
                options[element].getText().then(function(value) {
                    indexes.push(value);
                });
            }
        });
    return indexes;
}

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

function selectDropdownByNum(element, searchType, indexes) {
    if (searchType) {
        element.all(by.tagName('option'))
            .then(function(options) {
                options[indexes.indexOf(searchType)].click();
            });
    }
};