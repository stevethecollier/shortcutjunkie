describe('homepage', function(){
	it('should have a title', function(){
		browser.get('http://localhost:3000/#/');
		expect(browser.getTitle()).toEqual('Shortcut Junkie');
	});

	it('should go to shortcuts', function(){
		element(by.id('shortcutsLink')).click();
		expect(browser.getTitle()).toEqual('Shortcuts Home');
	});

	it('should go to edit', function(){
		element.all(by.css('.editLink')).first().click();
		expect(browser.getTitle()).toEqual('Edit Shortcut');
	});

	it('should return to home', function(){
		element(by.id('homeLink')).click();
		expect(browser.getTitle()).toEqual('Shortcut Junkie');
	});

	it('should go to search', function(){
		element(by.id('searchLink')).click();
		expect(browser.getTitle()).toEqual('Search Shortcuts');
	});

	it('should return to home', function(){
		element(by.id('homeLink')).click();
		expect(browser.getTitle()).toEqual('Shortcut Junkie');
	});
});