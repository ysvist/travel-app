function handleSubmit(e) {
  e.preventDefault();
  const userInput = document.getElementById("website").value;
  analyzeText(userInput);
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
