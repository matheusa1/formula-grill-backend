import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { MesasModule } from './mesas/mesas.module';

@Module({
  imports: [UserModule, PrismaModule, MesasModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
