import { Injectable } from '@nestjs/common';
import { BASE_PROMPT } from 'src/common/prompt/system.prompt';
import { AnthropicService } from 'src/modules/anthropic.service';
import { basePrompt as nodeBasePrompt } from '../common/prompt/node.prompt';
import { basePrompt as reactBasePrompt } from '../common/prompt/react.prompt';


@Injectable()
export class TemplateService {
  constructor(private readonly anthropicService: AnthropicService) {}

  async getTemplate(prompt: string): Promise<{ prompts: any[]; uiPrompts: any }> {
    const response = await this.anthropicService.getApplicationType(prompt);

    if (response === 'react') {
      return {
          prompts: [
            BASE_PROMPT,
            `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
          ],
          uiPrompts: [reactBasePrompt],
      };
    }

    if (response === 'node') {
      return {
          prompts: [
            `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
          ],
          uiPrompts: [nodeBasePrompt],
      };
    }

    throw new Error("Unsupported application type: ${response}");
  }
}
