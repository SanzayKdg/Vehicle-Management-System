import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { LoginUserDTO, RegisterUserDTO } from './dto/auth.dto';
import { User } from './entity/user.entity';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/constant';
@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  // ---------- REGISTER ---------- //
  async registerUser(payload: RegisterUserDTO) {
    const { email, password, ...data } = payload;

    // check if the user exists
    const userExists = await this.dataSource
      .getRepository(User)
      .findOne({ where: { email } });

    if (userExists)
      throw new BadRequestException('User already exists. Enter new email');

    //   create new user
    const newUser = await this.dataSource.getRepository(User).save({
      email,
      password: await argon.hash(password),
      ...data,
    });

    return { message: 'User registered.', newUser };
  }

  // ---------- LOGIN USER ---------- //
  async login(payload: LoginUserDTO) {
    const { email, password } = payload;
    const user = await this.dataSource.getRepository(User).findOne({
      where: { email },
      select: ['id', 'password', 'user_role'],
    });

    if (!user) throw new BadRequestException('Invalid credentials');

    // validate password
    const isValidPassword = await argon.verify(user.password, password);
    if (!isValidPassword) throw new BadRequestException('Invalid credentials');

    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
      },
      {
        expiresIn: '15d',
        secret: JWT_SECRET,
      },
    );

    return { token, user_role: user.user_role };
  }
}
