import { updatePageContents } from "../src/client/js/updatePageContents";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe("Testing the updatePageContents functionality", () => {
  test("updatePageContents correctly updates page with API call results", () => {
    const testDOM = new JSDOM(`<div id="results"></div>`);
    const content = {
      confidence: "69",
      score_tag: "Positive",
      subjectivity: "SUBJECTIVE",
      irony: "IRONIC",
    };
    const placeholderElement =
      testDOM.window.document.getElementById("results");

    updatePageContents(placeholderElement, content);
    expect(placeholderElement.innerHTML)
      .toBe(`<ul class="results-list"><li class="results-list__result"><strong>Confidence:</strong> 69</li>
  <li class="results-list__result"><strong>Score tag:</strong> undefined</li>
  <li class="results-list__result"><strong>Subjectivity:</strong> SUBJECTIVE</li>
  <li class="results-list__result"><strong>Irony:</strong> IRONIC</li></ul>`);
  });
});
