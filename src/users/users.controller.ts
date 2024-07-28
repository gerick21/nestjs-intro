import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * When sending parameters, mandatory and optional at the same time,
   * we must ensure to put the mandatory parameters first, followed by the optional ones.
   */

  @Get('/:id/:optional?') // This way we receive params in the method.
  // If you want the id to be optional, use @Get("/:id?")
  getHelloWithId(@Param() params: any, @Query() query: any): string {
    console.log(params);
    console.log(query);
    return this.usersService.helloWorld();
  }

  @Post()
  createUsers(@Body() request: any) {
    console.log(request);
    return 'You sent a POST request to users endpoint';
  }

  /**
   * If we want, we can use the Express JS request in the following way:
   * It is not recommended as it goes outside the framework, but
   * in case we want to alter the request object, it might be useful.
   */
  /*
  @Post()
  createUsers(@Req() request: Request) {
    console.log(request);
    return 'You sent a POST request to users endpoint';
  }
  */
}
