var testShortcut = {
    application: 'testApplication',
    operatingSystem: 'testOperatingSystem',
    keyset: 'testKeyset',
    description: 'testDescription'
}

describe('search page', function() {
    var indexes = [];
    browser.get('http://localhost:3000/#/partials/search');
    indexes = establishIndexes();

    beforeEach(function() {
        addTestShortcut();
        browser.get('http://localhost:3000/#/partials/search');
    });

    it('should find a shortcut by all fields', function() {
        for (var property in testShortcut) {
            selectDropdownByNum(element(by.id('searchType')), property, indexes);
            element(by.id('searchCriteria')).clear().sendKeys(testShortcut[property]);
            element(by.id('search')).click();
            var results = element.all(by.css('.shortcut')).count();
            expect(results).toBeGreaterThan(0);
        }
    });

    it('has proper validation', function() {
        //no search type selected
        element(by.id('search')).getWebElement().getAttribute('disabled').then(function(value) {
            expect(value).toBeTruthy();
        });
        element(by.id('search')).click();
        expect(element(by.id('resultsTitle')).isPresent()).toBeFalsy();

        //no search value provided
        selectDropdownByNum(element(by.id('searchType')), 'application', indexes);
        element(by.id('search')).click();
        element(by.id('searchCriteria')).getWebElement().getAttribute('class').then(function(classes) {
            expect(classes.indexOf('error') > -1).toBeTruthy();
        });
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