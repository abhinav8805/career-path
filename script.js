function openYouTube(query) {
  const url = "https://www.youtube.com/results?search_query=" + encodeURIComponent(query);
  window.open(url, '_blank');
}

function askHelper() {
  const input = document.getElementById("user-input").value.trim();
  const responseBox = document.getElementById("chat-response");

  if (!input) {
    responseBox.innerText = "Please ask something first.";
    return;
  }

  responseBox.innerText = "Thinking...";

  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_OPENAI_API_KEY" // Replace with your key
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }]
    })
  })
    .then(res => res.json())
    .then(data => {
      const reply = data.choices?.[0]?.message?.content || "No response.";
      responseBox.innerText = reply;
    })
    .catch(() => {
      responseBox.innerText = "Failed to connect to GPT.";
    });
}
