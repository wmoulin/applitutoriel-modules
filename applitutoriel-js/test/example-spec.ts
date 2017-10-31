import { TestUtils } from "hornet-js-test/src/test-utils";
var expect = TestUtils.chai.expect;


import { Hello } from "./example";

describe("Test JS", () => {
    it("doit passer", () => {
        expect(Hello.sayHello("world")).to.be.equal("Hello, world");
    });
});