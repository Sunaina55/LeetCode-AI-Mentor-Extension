# AI Mentor — LeetCode Chrome Extension

A Chrome Extension that injects an **"AI Mentor"** dropdown on LeetCode problem pages, providing structured AI-powered assistance using **Groq API (llama-3.3-70b-versatile)** — without ever giving away the solution.

---

## ✨ Features

### 💡 Get Hint
- Reads problem title, description & constraints from DOM
- Identifies Brute Force, Better, and Optimal approaches
- Suggests relevant topics (Sliding Window, DP, Graphs, etc.)
- Gives time & space complexity hints

### 🔍 Next Line
- Reads your current code from the editor
- Gives a hint for what the next line should do
- Includes a small code snippet hint (e.g. `mpp.find(rem)`)
- Never gives the full line — just nudges you forward

### 📊 Analyze Code
- Analyzes your submitted or in-progress code
- Identifies which approach you used (Brute/Better/Optimal)
- Points out specific inefficiencies with alternatives
- Works on partial/incomplete code too

### 📋 Copy with Main
- Reads your solution code from the editor
- Generates a complete C++ file with `#include <bits/stdc++.h>`, proper `int main()`, sample test cases & expected output
- Copies to clipboard — paste directly in VS Code

---

## 🛠️ Tech Stack

- JavaScript (Vanilla)
- HTML & CSS
- Chrome Extension APIs (Manifest V3)
- Groq API (`llama-3.3-70b-versatile`)
- DOM Manipulation
- Fetch API + async/await
- Prompt Engineering

---

## 📁 Project Structure

```
LeetCode-AI-Hint-Extension/
├── manifest.json          # Extension config (Manifest V3)
├── content.js             # Injected into LeetCode pages
├── content.css            # Dark theme styles
├── prompt.js              # Prompt engineering (4 prompts)
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
- Sign up and create a free API key (~14,400 requests/day free)

### 3. Create `config.js`
Create a file named `config.js` in the project folder:
```javascript
const GROQ_API_KEY = "your_groq_api_key_here"
```

> ⚠️ `config.js` is in `.gitignore` — it will NOT be pushed to GitHub.

### 4. Load Extension in Chrome
1. Open Chrome → go to `chrome://extensions`
2. Enable **Developer Mode** (top right toggle)
3. Click **Load unpacked**
4. Select the project folder

### 5. Use it!
- Go to any LeetCode problem page
- Click **🤖 AI Mentor** button (bottom right)
- Choose from 4 options!

---

## 💡 How It Works

```
User clicks AI Mentor
        ↓
Dropdown opens (4 options)
        ↓
Content script reads DOM
(title + description + editor code)
        ↓
Groq API called with custom prompt
        ↓
Response shown in hint box
```

---

## ⚠️ Important Notes

- `config.js` is NOT included — create it yourself with your Groq key
- Works on any LeetCode problem page
- Supports all languages (C++, Python, Java, etc.) for hints
- Copy with Main generates C++ only
- Not affiliated with LeetCode

---

