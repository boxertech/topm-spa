describe("loaded page test", function () {
	beforeEach(function () {
		browser.get("http://localhost:3000/#/loaded");
	});
	it("should have a form", function () {

		var form = element(by.css("form"));
		expect(form.isDisplayed()).toBe(true);
	});
	it("should have a name input field", function () {
		var input = element(by.id("nameEdit"));
		input.sendKeys("Joe Smith");
		expect(input.getAttribute('value')).toEqual("Joe Smith");
	});
	it("should have a label for input field", function () {
		var label = element(by.css("label[for='nameEdit']"));
		expect(label.getText()).toEqual("Name");
	});
	it("should echo input value in display field", function () {
		var input = element(by.id("nameEdit"));
		input.sendKeys("Joe Smith");
		var display = element(by.id("name_RO"));
		expect(display.getAttribute('value')).toEqual("Joe Smith");
	});

// TODO: repeat above for each field in form

	
});