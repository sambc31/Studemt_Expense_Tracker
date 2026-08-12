# 🎓 SpendWise — Student Expense Tracker

**SpendWise** is a modern, responsive personal finance web application tailored for college and university students to track daily purchases, manage monthly budgets, analyze category spending, and interact with an AI financial assistant.

---

## 🚀 How to Run SpendWise on Any PC

You can run SpendWise on **Windows, macOS, or Linux** in just a few simple steps.

### 📋 Prerequisites
Before running the application, make sure the target PC has:
1. **Node.js** (Version 18.0 or higher recommended)
   - Download and install Node.js from [nodejs.org](https://nodejs.org/).
   - Installing Node.js includes `npm` automatically.

---

### 💻 Step-by-Step Setup Instructions

#### Step 1: Copy or Clone the Project Folder
Copy the `Studemt_Expense_Tracker` project folder to any location on the target PC (e.g., Desktop or Downloads).

#### Step 2: Open Terminal / Command Prompt
Open your terminal application:
- **Windows**: Open `Command Prompt` or `PowerShell`
- **Mac / Linux**: Open `Terminal`

Navigate into the project directory:
```bash
cd path/to/Studemt_Expense_Tracker
```

#### Step 3: Install Dependencies
Run the following command to download all required packages:
```bash
npm install
```

#### Step 4: Start the Local Development Server
To launch the application in development mode with hot-reloading:
```bash
npm run dev
```

You will see output similar to this:
```
  VITE v5.4.1  ready in 350 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

#### Step 5: Open in Your Web Browser
Open your browser (Chrome, Edge, Firefox, Safari, Brave) and navigate to:
```
http://localhost:5173
```

---

## 🌐 Running on Mobile / Other Devices in the Same Wi-Fi Network

Because `host: true` is enabled in `vite.config.ts`, you can test SpendWise on your mobile phone or tablet connected to the same Wi-Fi network:

1. Look at the `Network:` address shown in your terminal when running `npm run dev` (e.g. `http://192.168.1.15:5173`).
2. Type that address into your mobile browser.

---

## 📦 Building for Production / Presentation Deployment

If you want to package the app into standalone production static files or host it online:

### Option A: Local Production Preview
```bash
# 1. Build the production files into the /dist folder
npm run build

# 2. Preview the built app locally
npm run preview
```

### Option B: Deploy Free Online (Vercel / Netlify)
You can host SpendWise live on the web for free so anyone can open it via a URL:

1. **Vercel** (Recommended):
   - Install Vercel CLI: `npm install -g vercel`
   - Run `vercel` inside the project folder and follow the prompts.
   - Or connect your GitHub repository to [vercel.com](https://vercel.com).

2. **Netlify**:
   - Run `npm run build` to generate the `dist` folder.
   - Drag & drop the `dist` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).

---

## ⚡ Optional: Setting Up Gemini AI Key

SpendWise includes an intelligent local fallback AI assistant out of the box. If you want to connect to Google's live **Gemini API**:

1. Create a file named `.env` in the root folder.
2. Add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```
3. Restart the dev server (`npm run dev`).

---

## 🛠️ Project Tech Stack
- **Framework**: React 18 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS + Lucide React Icons
- **Charts**: Recharts
- **Persistence**: Browser LocalStorage
- **Developer**: Developed by Sam Branham Christopher I
