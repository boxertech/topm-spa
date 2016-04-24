describe("loaded page test", function () {
	it("should switch to loaded", function () {
		browser.get("http://localhost:3000");

		browser.sleep(3500);

		expect(browser.getLocationAbsUrl()).toBe("/loaded");
	});
});