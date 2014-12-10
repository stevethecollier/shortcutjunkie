'use strict';

(function() {
	// Shortcuts Controller Spec
	describe('Shortcuts Controller Tests', function() {
		// Initialize global variables
		var ShortcutsController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Shortcuts controller.
			ShortcutsController = $controller('ShortcutsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Shortcut object fetched from XHR', inject(function(Shortcuts) {
			// Create sample Shortcut using the Shortcuts service
			var sampleShortcut = new Shortcuts({
				keyCombination: 'test key combination',
				application: 'test application',
				description: 'test description',
				operatingSystem: 'test operating system'
			});

			// Create a sample Shortcuts array that includes the new Shortcut
			var sampleShortcuts = [sampleShortcut];

			// Set GET response
			$httpBackend.expectGET('api/shortcuts').respond(sampleShortcuts);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.shortcuts).toEqualData(sampleShortcuts);
		}));

		it('$scope.findApplications() should create an array with at at least one application name', inject(function(Shortcuts) {
			var sampleShortcuts = [new Shortcuts({
				keyCombination: 'firstTest',
				application: 'firstTest',
				description: 'firstTest',
				operatingSystem: 'firstTest'
			}), new Shortcuts({
				keyCombination: 'secondTest',
				application: 'secondTest',
				description: 'secondTest',
				operatingSystem: 'secondTest'
			}), new Shortcuts({
				keyCombination: 'thirdTest',
				application: 'firstTest',
				description: 'thirdTest',
				operatingSystem: 'thirdTest'
			})];

			// Set GET response
			$httpBackend.expectGET('api/shortcuts').respond(sampleShortcuts);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			expect(scope.applications).toEqual(['firstTest', 'secondTest']);
		}));

		describe('the shortcuts filter', function() {
			var sampleShortcuts = [{
				keyCombination: 'firstTest',
				application: 'firstTest',
				description: 'firstTest',
				operatingSystem: 'firstTest'
			}, {
				keyCombination: 'secondTest',
				application: 'secondTest',
				description: 'secondTest',
				operatingSystem: 'secondTest'
			}, {
				keyCombination: 'thirdTest',
				application: 'firstTest',
				description: 'thirdTest',
				operatingSystem: 'thirdTest'
			}];

			it('should restrict by application', inject(function(_$filter_) {
				var $filter = _$filter_;
				var result = $filter('applicationFilter')(sampleShortcuts, 'secondTest');
				expect(result).toEqual([sampleShortcuts[1]]);
				result = $filter('applicationFilter')(sampleShortcuts, '');
				expect(result).toEqual(sampleShortcuts);
			}));
		});

		it('$scope.findOne() should create an array with one Shortcut object fetched from XHR using a shortcutId URL parameter', inject(function(Shortcuts) {
			// Define a sample Shortcut object
			var sampleShortcut = new Shortcuts({
				keyCombination: 'test key combination',
				application: 'test application',
				description: 'test description',
				operatingSystem: 'test operating system'
			});

			// Set the URL parameter
			$stateParams.shortcutId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/shortcuts\/([0-9a-fA-F]{24})$/).respond(sampleShortcut);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.shortcut).toEqualData(sampleShortcut);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Shortcuts) {
			// Create a sample Shortcut object
			var sampleShortcutPostData = new Shortcuts({
				keyCombination: 'test key combination',
				application: 'test application',
				description: 'test description',
				operatingSystem: 'test operating system'
			});

			// Create a sample Shortcut response
			var sampleShortcutResponse = new Shortcuts({
				_id: '525cf20451979dea2c000001',
				keyCombination: 'test key combination',
				application: 'test application',
				description: 'test description',
				operatingSystem: 'test operating system'
			});

			// Fixture mock form input values
			scope.keyCombination = 'test key combination';
			scope.application = 'test application';
			scope.description = 'test description';
			scope.operatingSystem = 'test operating system';


			// Set POST response
			$httpBackend.expectPOST('api/shortcuts', sampleShortcutPostData).respond(sampleShortcutResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Shortcut was created
			expect($location.path()).toBe('/shortcuts/' + sampleShortcutResponse._id);
		}));

		it('$scope.update() should update a valid Shortcut', inject(function(Shortcuts) {
			// Define a sample Shortcut put data
			var sampleShortcutPutData = new Shortcuts({
				_id: '525cf20451979dea2c000001',
				name: 'New Shortcut'
			});

			// Mock Shortcut in scope
			scope.shortcut = sampleShortcutPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/shortcuts\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/shortcuts/' + sampleShortcutPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid shortcutId and remove the Shortcut from the scope', inject(function(Shortcuts) {
			// Create new Shortcut object
			var sampleShortcut = new Shortcuts({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Shortcuts array and include the Shortcut
			scope.shortcuts = [sampleShortcut];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/shortcuts\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleShortcut);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.shortcuts.length).toBe(0);
		}));
	});
}());