import { Injectable } from '@nestjs/common';
import { getSystemPrompt } from 'src/common/prompt/system.prompt';
import { AnthropicService } from 'src/modules/anthropic.service';


@Injectable()
export class ChatService {
  constructor(private readonly anthropicService: AnthropicService) {}

  async getCode(messages:any[]): Promise<any> {
    const response = await this.anthropicService.getCode(messages,getSystemPrompt());
    return {response:response}
  }
}
