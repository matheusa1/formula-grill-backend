import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
