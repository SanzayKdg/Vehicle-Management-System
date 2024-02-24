import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDTO, RegisterUserDTO } from './dto/auth.dto';
import { JwtAuthGuard } from 'src/@guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ---------- REGISTER ---------- //
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a user' })
  registerUser(@Body() payload: RegisterUserDTO) {
    return this.authService.registerUser(payload);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  login(@Body() payload: LoginUserDTO) {
    return this.authService.login(payload);
  }
}
