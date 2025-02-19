import Anthropic from "@anthropic-ai/sdk";
import * as dotenv from "dotenv";

dotenv.config();

export class AnthropicService {
    private anthropic: Anthropic;

    constructor() {
        if (!process.env.ANTHROPIC_API_KEY) {
            throw new Error("ANTHROPIC_API_KEY is not set in the environment variables.");
        }
        this.anthropic = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY,
        });
    }
    

    private async createResponse(messages: any[], maxTokens: number, system: string): Promise<any> {
        try {
            const response = await this.anthropic.messages.create({
                messages: messages,
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: maxTokens,
                system: system,
            });
            return response;
        } catch (error) {
            console.error("Error in Anthropic API call:", error);
            throw error;
        }
    }

    async getApplicationType(prompt: string): Promise<string> {
        try {
            const response = await this.createResponse(
                [{ role: "user", content: prompt }],
                200,
                "Return either 'node' or 'react' based on what you think this project should be. Only return a single word: either 'node' or 'react'. Do not return anything extra."
            );
            const answer = response?.content[0]?.text
            return answer;
        } catch (error) {
            console.error("Error in getApplicationType:", error);
            throw error;
        }
    }

    async getCode(messages: any[], systemPrompt: string): Promise<string> {
        try {
            const response = await this.createResponse(
                messages,
                8000,
                systemPrompt
            );


            return response?.content[0]?.text;
        } catch (error) {
            console.error("Error in getCode:", error);
            throw error;
        }
    }
}
