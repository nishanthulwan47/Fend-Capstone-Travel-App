// Import the js file to test
import { listening } from "../src/server/server"
// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("Testing the server functionality", () => {
    test("Testing the port listening() function", () => {
           expect(listening).toBeUndefined();
})
});
