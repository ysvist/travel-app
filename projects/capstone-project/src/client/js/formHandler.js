function handleSubmit(e) {
  e.preventDefault();
  const userInput = document.getElementById("website").value;
  function validateURL() {
    const regexURL = new RegExp(
      /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
    );
    return regexURL.test(userInput);
  }
  const isValidURL = validateURL();
  if (isValidURL) {
    analyzeText(userInput);
  } else {
    document.getElementById(
      "results"
    ).innerHTML = `<p class="warning">Invalid URL input. Please enter a valid URL.</p>`;
  }
}

function analyzeText(userInput) {
  fetch("http://localhost:8081/userData", {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input: userInput }),
  })
    .then((res) => res.json())
    .then(function (res) {
      const pageElement = document.getElementById("results");
      Client.updatePageContents(pageElement, res);
    });
}

export { handleSubmit };
export { analyzeText };
