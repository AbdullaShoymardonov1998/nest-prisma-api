import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(userDetails: CreateUserDto): Promise<User> {
    console.log(userDetails);
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: userDetails.email,
      },
    });

    if (existingUser) {
      throw new HttpException('User does exist', HttpStatus.BAD_REQUEST);
    }
    return this.prisma.user.create({
      data: {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
      },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        Posts: true,
      },
    });
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateUserById(id: number, userDetails: UpdateUserDto): Promise<User> {
    await this.getUserById(id);
    const updateUser = await this.prisma.user.update({
      where: { id },
      data: {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
      },
    });

    return updateUser;
  }

  async deleteUserById(id: number): Promise<User> {
    await this.getUserById(id);
    const deleteUser = await this.prisma.user.delete({
      where: { id },
    });

    return deleteUser;
  }
}
