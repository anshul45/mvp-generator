import { Body, Controller,  Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async getCode(@Body() body: { messages: any[] }): Promise<any> {
    const { messages } = body; 
    const response = await this.chatService.getCode(messages)
    return response
  }
}
