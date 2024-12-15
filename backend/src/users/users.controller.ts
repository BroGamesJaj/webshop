import { Controller, Post, Get, Param, Body, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create a new user
  @Post()
  async createUser(@Body() createUserDto: { username: string; password: string }) {
    return this.usersService.createUser(createUserDto);
  }

  // Get user by ID
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  // Update user details by ID
  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: { username?: string; password?: string }
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  // Delete user by ID
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }

  // Authenticate user
  @Post('/login')
  async authenticateUser(
    @Body() loginDto: { username: string; password: string }
  ) {
    const user = await this.usersService.authenticateUser(
      loginDto.username,
      loginDto.password
    );
    if (!user) {
      throw new Error('Invalid username or password');
    }
    console.log("hi")
    return user; // Typically you'd return a JWT or session token
  }
}
