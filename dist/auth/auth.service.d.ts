import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { UserToken } from './models/UserToken';
import { PrismaService } from '../database/prisma.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly prisma;
    constructor(jwtService: JwtService, prisma: PrismaService);
    login(user: User): Promise<UserToken>;
    validateUser(email: string, password: string): Promise<User>;
}
