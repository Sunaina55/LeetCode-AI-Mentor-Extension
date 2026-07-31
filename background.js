// Background service worker to perform cross-origin fetch with API key
const GROQ_API_KEY = "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";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getHint") {
    (async () => {
      try {
        const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + GROQ_API_KEY,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "user",
                content: message.prompt || "",
              },
            ],
          }),
        });

        const data = await resp.json();
        const hint = data?.choices?.[0]?.message?.content;
        sendResponse({ hint, data });
      } catch (err) {
        sendResponse({ error: err.message || String(err) });
      }
    })();
    return true; // keep sendResponse valid for async
  }
});
