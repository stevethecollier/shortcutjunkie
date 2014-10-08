describe('shortcut page', function() {
	it('should have a title', function() {
		browser.get('http://localhost:3000/#/partials/shortcuts');
		expect(browser.getTitle()).toEqual('Shortcuts Home');
	});

	it('should add a shortcut', function() {
		element.all(by.css('.shortcut')).then(function(elems) {
			var originalCount = elems.length;

			element(by.id('applicationField')).sendKeys('testApplication');
			element(by.id('operatingSystemField')).sendKeys('testOperatingSystem');
			element(by.id('keysetField')).sendKeys('testKeyset');
			element(by.id('descriptionField')).sendKeys('testDescription');
			element(by.id('submitNew')).click();

			var newCount = element.all(by.css('.shortcut')).count();
			expect(newCount).toEqual(originalCount + 1);
		});
	});

	it('should delete a shortcut', function() {
		element.all(by.css('.shortcut')).then(function(elems) {
			var originalCount = elems.length;

			element.all(by.css('.deleteLink')).last().click();

			var newCount = element.all(by.css('.shortcut')).count();
			expect(newCount).toEqual(originalCount - 1);
		});
	});
});