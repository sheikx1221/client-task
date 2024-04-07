import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CardModule } from './card/card.module';
import { ConversationModule } from './conversation/conversation.module';

@Module({
  imports: [AuthModule, CardModule, ConversationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
