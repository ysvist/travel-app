function updatePageContents(pageElement, content) {
  if (content.confidence !== undefined) {
    // manually converting these into human readable words because a score of "P" means nothing. Definitions obtained from https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/doc/response
    let convertedScoreTag;
    switch (content.score_tag) {
      case "P+":
        convertedScoreTag = "Strong Positive";
        break;
      case "P":
        convertedScoreTag = "Positive";
        break;
      case "NEU":
        convertedScoreTag = "Neutral";
        break;
      case "N":
        convertedScoreTag = "Neutral";
        break;
      case "N+":
        convertedScoreTag = "Strong Negative";
        break;
      case "NONE":
        convertedScoreTag = "Without Polarity";
        break;
    }
    pageElement.innerHTML = `<ul class="results-list"><li class="results-list__result"><strong>Confidence:</strong> ${content.confidence}</li>
  <li class="results-list__result"><strong>Score tag:</strong> ${convertedScoreTag}</li>
  <li class="results-list__result"><strong>Subjectivity:</strong> ${content.subjectivity}</li>
  <li class="results-list__result"><strong>Irony:</strong> ${content.irony}</li></ul>`;
  } else {
    pageElement.innerHTML = `Sorry, I couldn't analyze this page.<br><strong>Error ${content.status.code}:</strong> "${content.status.msg}"`;
  }
}

export { updatePageContents };
