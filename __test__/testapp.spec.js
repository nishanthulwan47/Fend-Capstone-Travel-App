// Import the js file to test
import { init } from "../src/client/js/app"
// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("Testing the initialization functionality", () => {
    test("Testing the init() function", () => {
           expect(init).toBeDefined();
})
});
