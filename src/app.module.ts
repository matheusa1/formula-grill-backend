import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MesasModule } from './mesas/mesas.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ChefsModule } from './chefs/chefs.module';
import { ReservasModule } from './reservas/reservas.module';
import { CategoriasModule } from './categorias/categorias.module';
import { PratoModule } from './prato/prato.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MesasModule,
    ReservasModule,
    ChefsModule,
    CategoriasModule,
    PratoModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
