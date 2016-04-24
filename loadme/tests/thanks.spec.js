describe("loaded page test", function () {
	beforeEach(function () {
		browser.get("http://localhost:3000/#/loaded");
	});
	it("should switch to loaded", function () {
		var input = element(by.id("nameEdit"));
		input.sendKeys("Joe Smith");
		element(by.css("button.btn-primary")).click();

		expect(browser.getLocationAbsUrl()).toBe("/thanks");
	});
	it("should load values from loaded screen", function () {
		var input = element(by.id("nameEdit"));
		input.sendKeys("Joe Smith");
		element(by.css("button.btn-primary")).click();

		var display = element(by.id("name_RO"));
		expect(display.getAttribute('value')).toEqual("Joe Smith");
	});

	// TODO: Repeat for rest of fields
});

// <input type="email" class="form-control" id="emailaddr" placeholder="and your email address" ng-model="loaded.contact.email">
// <input type="checkbox" value="email" ng-model="loaded.contact.viaEmail">
// <input type="checkbox" value="text" ng-model="loaded.contact.viaText">
