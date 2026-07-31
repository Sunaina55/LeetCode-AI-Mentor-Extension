# 🧠 LeetCode AI Hint Extension

A Chrome Extension that injects a **"GET HINT"** button on LeetCode problem pages and provides structured, mentor-style hints using **Groq API (llama-3.3-70b-versatile)** — without ever giving away the solution.

---

## ✨ Features

- 💡 **Context-aware hints** — reads problem title, description & constraints directly from the DOM
- 🧩 **Structured approach hints** — Brute Force, Better, and Optimal (where applicable)
- 📌 **Topic identification** — detects patterns like Sliding Window, Two Pointers, DP, Graphs, etc.
- 🔒 **No direct answers** — hints guide you to think, not to copy
- ⚡ **Powered by Groq** — fast LLM inference using llama-3.3-70b-versatile
- 🎯 **Works on any LeetCode problem**

---

## 🛠️ Tech Stack

- JavaScript (Vanilla)
- HTML & CSS
- Chrome Extension APIs (Manifest V3)
- Groq API (`llama-3.3-70b-versatile`)
- DOM Manipulation
- Fetch API + async/await

---

## 📁 Project Structure

```
LeetCode-AI-Hint-Extension/
├── manifest.json          # Extension config (Manifest V3)
├── content.js             # Injected into LeetCode pages
├── content.css            # Styles for hint box & button
├── prompt.js              # Prompt engineering logic
├── config.js              # API key (NOT pushed to GitHub)
├── config.example.js      # API key template
├── popup.html             # Extension popup UI
├── popup.js               # Popup logic
├── popup.css              # Popup styles
└── README.md
```

---

## 🚀 Setup & Installation

### 1. Clone the repo
```bash
git clone https://github.com/Sunaina55/LeetCode-AI-Hint-Extension.git
cd LeetCode-AI-Hint-Extension
```

### 2. Get your Groq API Key
- Go to [console.groq.com](https://console.groq.com)
- Sign up and create a free API key

### 3. Create `config.js`
Create a file named `config.js` in the project folder:
```javascript
const GROQ_API_KEY = "your_groq_api_key_here"
```

> ⚠️ `config.js` is in `.gitignore` — it will NOT be pushed to GitHub. Keep your key safe!

### 4. Load Extension in Chrome
1. Open Chrome → go to `chrome://extensions`
2. Enable **Developer Mode** (top right toggle)
3. Click **Load unpacked**
4. Select the project folder

### 5. Use it!
- Go to any LeetCode problem page
- Click the **"GET HINT"** button (bottom right corner)
- Get structured hints — no spoilers! 🎯

---

## 💡 How Hints Work

For every problem, the extension:
1. Reads the full problem (title + description + constraints) from DOM
2. Sends it to Groq API with a custom mentor prompt
3. Gets back hints in this format:

```
Problem Type: Array, Hashing

Possible Topics: Hash Map, Two Pointers

Possible Approaches: Brute Force, Better, Optimal

Approach 1 (Brute Force):
• Use nested loops to check all pairs
• Time Complexity: O(n²)

Approach 2 (Optimal):
• Think about using a Hash Map
• Store complement of each element
• Time Complexity: O(n)
```

---

## ⚠️ Important Notes

- `config.js` is NOT included in this repo — you must create it yourself
- This extension is for **learning purposes only**
- Not affiliated with LeetCode
- Free Groq API has ~14,400 requests/day limit

---

## 📄 License

MIT License