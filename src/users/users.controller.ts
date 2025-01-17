import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Patch,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-may-users.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
// import { Request } from 'express';

@Controller('users')
@ApiTags('Users')
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
  //@SetMetadata('authType', 'none')
  @Auth(AuthType.None, AuthType.Bearer)
  createUsers(@Body() createUsersDto: CreateUserDto) {
    return this.usersService.createUser(createUsersDto);
  }

  @Post('create-many')
  createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) {
    return this.usersService.createMany(createManyUsersDto);
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
  /*
  @Post()
  createUsersWithEmail(@Body('email') email: any) {
    console.log({ email });
    return 'You sent a POST request to users endpoint';
  }
    */

  /**
   * Handles POST requests to create users and logs request headers.
   * @param request - Body of the request.
   * @param headers - HTTP headers of the request.
   */
  /*
  @Post()
  createUsersWithHeaders(@Body() request: any, @Headers() headers: any) {
    console.log(request);
    console.log({ headers });
    return 'You sent a POST request to users endpoint';
  }
    */

  /**
   * Handles POST requests to create users and logs the IP address.
   * @param request - Body of the request.
   * @param ip - IP address of the request.
   */

  /*
  @Post()
  createUsersWithIp(@Body() request: any, @Ip() ip: any) {
    console.log({ request });
    console.log({ ip });
    return 'You sent a POST request to users endpoint';
  }
    */

  /*Validation and pipes */

  /*VALIDATE Params */

  /*Parse Int Pipe */

  /**Remember the ? makes the parameter optional
   *
   * Not optional:  @Get('/:id')
   * Optional: @Get('/:id?')
   */

  @Get('/:id')
  @ApiOperation({
    summary: 'Fetches a list of users on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetch succesfully based on the query.',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entries returned per query ',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description:
      'The position of the page number that you want the API to return ',
    example: 1,
  })
  getHelloWithIdOptional(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    /*Returns all the users. */
    return this.usersService.findAll(getUsersParamDto, limit, page);
  }

  @Patch()
  patchUser(@Body() patchUserDto: PatchUserDto) {
    return 'Everything is fine';
  }
}
