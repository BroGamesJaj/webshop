import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Create a new user
  async createUser(data: Prisma.userCreateInput) {
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
      },
    });
  }

  // Find a user by ID
  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // Find a user by username
  async getUserByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async updateUserByUser(uname: string, data: Prisma.userUpdateInput) {
    if(this.getUserByUsername(uname) == null) {
      return this.prisma.user.update({
        where: { username: uname },
        data,
      });
    }else{
      throw new ConflictException("Username already exists");
    }
  }


  // Update user details
  async updateUser(id: number, data: Prisma.userUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // Delete a user
  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  // Authenticate a user (by username and password)
  async authenticateUser(username: string, password: string) {
    const user = await this.getUserByUsername(username);
    if (!user) {
      return null;
    }

    // Check if passwords match
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}
