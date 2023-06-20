import {
  Controller,
  Post,
  Get,
  Body,
  ParseIntPipe,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //create users
  @Post()
  createUsers(@Body() userDetails: CreateUserDto): Promise<User> {
    return this.userService.createUser(userDetails);
  }

  //get all users
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
  //get user by particular id
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  //update user by ID
  @Put(':id')
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDetails: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUserById(id, userDetails);
  }

  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.deleteUserById(id);
  }
}
