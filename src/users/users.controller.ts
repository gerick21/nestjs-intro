import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Headers,
  Ip,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Handles GET requests with mandatory and optional parameters.
   * @param params - Parameters from the route.
   * @param query - Query parameters from the URL.
   */
  /*
  @Get('/:id/:optional?')
  getHelloWithId(@Param() params: any, @Query() query: any): string {
    console.log(params);
    console.log(query);
    return this.usersService.helloWorld();
  }
    */

  /**
   * Handles POST requests to create users.
   * @param request - Body of the request.
   */
  @Post()
  createUsers(@Body() request: any) {
    console.log(request);
    return 'You sent a POST request to users endpoint';
  }

  /**
   * Handles POST requests to create users using Express request object.
   * @param request - Express request object.
   */
  /*
  @Post()
  createUsers(@Req() request: Request) {
    console.log(request);
    return 'You sent a POST request to users endpoint';
  }
  */

  /**
   * Handles GET requests with specific parameter and query.
   * @param id - Specific parameter from the route.
   * @param limit - Specific query parameter from the URL.
   */

  /*
  @Get('/:id/:optional?')
  getHelloWithIdSpecific(
    @Param('id') id: any,
    @Query('limit') limit: any,
  ): string {
    console.log({ id });
    console.log({ limit });
    return this.usersService.helloWorld();
  }
    */

  /**
   * Handles POST requests to create users with specific body parameter.
   * @param email - Specific body parameter.
   */
  @Post()
  createUsersWithEmail(@Body('email') email: any) {
    console.log({ email });
    return 'You sent a POST request to users endpoint';
  }

  /**
   * Handles POST requests to create users and logs request headers.
   * @param request - Body of the request.
   * @param headers - HTTP headers of the request.
   */
  @Post()
  createUsersWithHeaders(@Body() request: any, @Headers() headers: any) {
    console.log(request);
    console.log({ headers });
    return 'You sent a POST request to users endpoint';
  }

  /**
   * Handles POST requests to create users and logs the IP address.
   * @param request - Body of the request.
   * @param ip - IP address of the request.
   */
  @Post()
  createUsersWithIp(@Body() request: any, @Ip() ip: any) {
    console.log({ request });
    console.log({ ip });
    return 'You sent a POST request to users endpoint';
  }

  /*Validation and pipes */

  /*VALIDATE Params */

  /*Parse Int Pipe */

  /**Remember the ? makes the parameter optional
   *
   * Not optional:  @Get('/:id')
   * Optional: @Get('/:id?')
   */

  @Get('/:id')
  getHelloWithIdOptional(
    @Param('id', ParseIntPipe) id: number | undefined,
    @Query('limit') limit: any,
  ): string {
    console.log(typeof id);
    console.log({ limit });
    return 'Validation pipe';
  }
}
