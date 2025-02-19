import { Body, Controller, Post } from '@nestjs/common';
import { TemplateService } from './template.service';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  async getTemplate(@Body() body: { prompt: string }): Promise<{ prompts: any[]; uiPrompts: any }> {
    const { prompt } = body; 
    const response = await this.templateService.getTemplate(prompt);
    return response
}
}
