import { handleSubmit } from "../src/client/js/formHandler";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe("Testing the handleSubmit functionality", () => {
  test("Testing the handleSubmit() function", () => {
    const testDOM = new JSDOM(`<div id="city"></div>`);
    expect(handleSubmit).toBeDefined();
  });
});
