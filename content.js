console.log("Content script loaded!");

setTimeout(function () {
  const title = document.querySelector(".text-title-large");

  if (title) {
    console.log(title);
    console.log(title.innerText);

    // Main AI Mentor button
    const btn = document.createElement("button");
    btn.innerText = "AI Mentor";
    btn.className = "hint-btn";
    document.body.appendChild(btn);

    // Dropdown
    const dropdown = document.createElement("div");

    dropdown.id = "mentor-dropdown";

    dropdown.innerHTML = `
      <button id="btn-hint">💡 Get Hint</button>
      <button id="btn-nextline">🔍 Next Line</button>
      <button id="btn-analyze">📊 Analyze Code</button>
      <button id="btn-vscode">📋 Copy with Main</button>
    `;

    document.body.appendChild(dropdown);

    // Main button -> toggle dropdown
    btn.addEventListener("click", function () {
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    });

    // GET HINT FUNCTION
    async function getHint() {
      const currentTitle = document.querySelector(".text-title-large");

      const description = document.querySelector(
        '[data-track-load="description_content"]',
      );

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
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

      showHintBox(hint);
    }

    function showHintBox(hint) {
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

      const hintTextEl = document.getElementById("hint-text");
      if (hintTextEl) {
        hintTextEl.innerText = hint;
      }
      hintBox.style.display = "block";
    }

    // ANALYZE CODE FUNCTION
    async function analyzeCode() {
      const currentTitle = document.querySelector(".text-title-large");
      const userCode = document.querySelector(".view-lines").innerText;

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
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
                content: buildAnalyzePrompt(currentTitle.innerText, userCode),
              },
            ],
          }),
        },
      );

      const data = await response.json();
      const analysis = data.choices[0].message.content;
      showHintBox(analysis);
    }

    // NEXT LINE FUNCTION
    async function getNextLine() {
      const currentTitle = document.querySelector(".text-title-large");
      const userCode = document.querySelector(".view-lines").innerText;

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
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
                content: buildNextLinePrompt(currentTitle.innerText, userCode),
              },
            ],
          }),
        },
      );

      const data = await response.json();
      const hint = data.choices[0].message.content;
      showHintBox(hint);
    }

    // COPY WITH MAIN FUNCTION
    async function copyWithMain() {
      const userCode = document.querySelector(".view-lines").innerText;
      const currentTitle =
        document.querySelector(".text-title-large").innerText;
      const description = document.querySelector(
        '[data-track-load="description_content"]',
      ).innerText;

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
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
                content: buildMainPrompt(currentTitle, description, userCode),
              },
            ],
          }),
        },
      );

      const data = await response.json();
      const fullCode = data.choices[0].message.content;

      navigator.clipboard.writeText(fullCode);
      alert("Code copied!");
    }

    // GET HINT BUTTON
    document.getElementById("btn-hint").addEventListener("click", function () {
      console.log("Get Hint clicked!");

      getHint();
    });

    // NEXT LINE

    document
      .getElementById("btn-nextline")
      .addEventListener("click", function () {
        console.log("Next Line clicked!");
        getNextLine();
      });

    // ANALYZE CODE

    document
      .getElementById("btn-analyze")
      .addEventListener("click", function () {
        console.log("Analyze Code clicked!");
        analyzeCode();
      });

    // OPEN VS CODE

    document
      .getElementById("btn-vscode")
      .addEventListener("click", function () {
        console.log("Open in VS Code clicked!");
        copyWithMain();
      });
  }
}, 2000);
// time 2000 ms means 2 secbaad run kro ( Leetcode React app hai elements late load hote hai)
