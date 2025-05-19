# Weavely MCP – Remote MCP Server for Form Generation

This project sets up a **Model Context Protocol (MCP)** server using the `@modelcontextprotocol/sdk`, hosted on **Cloudflare Workers**, to programmatically generate forms using the Weavely API.

---

## 🚀 Features

- Deploys an **auth-less MCP server** on Cloudflare Workers  
- Exposes a tool: `create-form` to generate forms via prompt  
- Uses `axios` for external API calls to [weavely.ai](https://weavely.ai)  
- Built using TypeScript and the official `@modelcontextprotocol/sdk`  

---

## 🛠️ Technologies Used

- 🧠 MCP SDK: `@modelcontextprotocol/sdk`  
- 🌩️ Cloudflare Workers + Wrangler  
- 🛡 Type-safe schema validation with `zod`  
- 🌐 HTTP requests via `axios`  
- 🧹 Formatting & linting with `biome`  

---

## 📦 Installation

```bash
git clone https://github.com/weavely/mcp.git
cd mcp
npm install
```

---

## 🧪 Development

Start a development server locally using Wrangler:

```bash
npm run dev
```

---

## 📤 Deployment

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

Or use the Cloudflare Deploy Button:

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/ai/tree/main/demos/remote-mcp-authless)

---

## 📺 Demo

Curious how it works? Watch a short demo here:

▶️ [https://youtu.be/C1jZBrGV6jE](https://youtu.be/C1jZBrGV6jE)

---

## 🔧 Tool: `create-form`

This MCP agent defines one tool:

- **Name:** `create-form`  
- **Description:** Create a new Weavely form.  
- **Input Schema:**
  ```ts
  {
    name?: string;
    prompt: string;
  }
  ```
- **Behavior:** Sends a POST request to `https://api.weavely.ai/v1/forms/generate` and returns the form content.

---

## 🧰 Scripts

| Script        | Description                       |
|---------------|-----------------------------------|
| `dev`         | Start development server          |
| `deploy`      | Deploy to Cloudflare              |
| `format`      | Format code using Biome           |
| `lint:fix`    | Fix linting issues via Biome      |
| `cf-typegen`  | Generate Cloudflare bindings      |

---

## 🗂 Folder Structure

```
weavely-mcp/
├── src/
│   └── index.ts           # Main MCP logic and tool registration
├── worker-configuration.d.ts
├── package.json
├── wrangler.jsonc         # Cloudflare deployment config
├── tsconfig.json
└── .vscode/
```