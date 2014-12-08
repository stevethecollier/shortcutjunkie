'use strict';

describe('Shortcuts E2E Tests:', function() {
	describe('Test Shortcuts page', function() {
		it('Should not include new Shortcuts', function() {
			browser.get('http://localhost:3000/#!/shortcuts');
			expect(element.all(by.repeater('shortcut in shortcuts')).count()).toEqual(0);
		});
	});
});
