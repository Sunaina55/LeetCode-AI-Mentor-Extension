console.log("Content script loaded!");

setTimeout(function () {
  const title = document.querySelector(".text-title-large"); // select problem title element

  if (title) {
    console.log(title);
    console.log(title.innerText);

    const btn = document.createElement("button");
    btn.innerText = "GET HINT";
    btn.className = "hint-btn";
    document.body.appendChild(btn); // adding button to the page

    btn.addEventListener("click", function () {
      console.log("Button clicked!");

      async function getHint() {
        const currentTitle = document.querySelector(".text-title-large");
        const description = document.querySelector(
          '[data-track-load="description_content"]',
        );
        console.log(description.innerText);

        const response = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer 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",
            },
            body: JSON.stringify({
              model: "llama-3.3-70b-versatile",
              messages: [
                {
                  role: "user",
                  content: buildPrompt(
                    currentTitle.innerText,
                    description.innerText,
                  ),
                },
              ],
            }),
          },
        );

        const data = await response.json();
        console.log(data);
        const hint = data.choices[0].message.content;
        let hintBox = document.getElementById("hint-box");

        if (!hintBox) {
          hintBox = document.createElement("div");
          hintBox.id = "hint-box";
          document.body.appendChild(hintBox);

          const closeBtn = document.createElement("button");
          closeBtn.innerText = "✕";
          closeBtn.id = "hint-close-btn";
          hintBox.appendChild(closeBtn);

          closeBtn.addEventListener("click", function () {
            hintBox.style.display = "none";
          });

          const hintText = document.createElement("p");
          hintText.id = "hint-text";
          hintBox.appendChild(hintText);
        }

        document.getElementById("hint-text").innerText = hint;
        hintBox.style.display = "block";
      }
      getHint();
    });
  }
}, 2000); // time 2000 ms means 2 secbaad run kro ( Leetcode React app hai elements late load hote hai)
