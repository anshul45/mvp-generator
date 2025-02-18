import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemplateModule } from './template/template.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [TemplateModule,ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
