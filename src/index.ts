import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import axios from "axios";

interface Env {
	MY_RATE_LIMITER: any;
}

// Define our MCP agent with tools
export class MyMCP extends McpAgent {
	server = new McpServer({
		name: "Weavely Forms creator",
		version: "1.0.0",
	});

	async init() {
		// Simple addition tool
		this.server.tool(
			"create-form",
			'Create a new Weavely form.',
			{ name: z.string().optional(), prompt: z.string() },
			async (args) => {
				const { data } = await axios.post(`https://api.weavely.ai/v1/forms/generate`, args)
					.catch((error) => {
						throw new Error(error.message);
					});

				return {
					content: [
						{
							type: "text",
							text: JSON.stringify(data, null, 2)
						}
					]
				};
			},
		);
	}
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const url = new URL(request.url);

		const ipAddress = request.headers.get("cf-connecting-ip") || "";
		const { success } = await env.MY_RATE_LIMITER.limit({ key: ipAddress });


		if (!success) {
			return new Response(`429 Failure - rate limit exceeded for ${ipAddress}`, { status: 429 });
		}

		if (url.pathname === "/sse" || url.pathname === "/sse/message") {
			// @ts-ignore
			return MyMCP.serveSSE("/sse").fetch(request, env, ctx);
		}

		if (url.pathname === "/mcp") {
			// @ts-ignore
			return MyMCP.serve("/mcp").fetch(request, env, ctx);
		}

		return new Response("Not found", { status: 404 });
	},
};
