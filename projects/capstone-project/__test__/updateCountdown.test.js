import { updateCountdown } from "../src/client/js/updatePageContents";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe("Testing the updateCountdown functionality", () => {
  test("updateCountdown correctly updates page with a countdown", () => {
    const testDOM = new JSDOM(`<div id="results__countdown"></div>`);
    const daysToArrival = 5;
    const placeholderElement =
      testDOM.window.document.getElementById("results__countdown");

    updateCountdown({ daysToArrival, pageElement: placeholderElement });
    expect(placeholderElement.innerHTML).toBe(
      `<strong>5</strong> days until the trip!`
    );
  });
});
