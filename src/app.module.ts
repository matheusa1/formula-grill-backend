import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MesasModule } from './mesas/mesas.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ChefsModule } from './chefs/chefs.module';
import { ReservasModule } from './reservas/reservas.module';

@Module({
  imports: [UserModule, AuthModule, MesasModule, ReservasModule, ChefsModule],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
