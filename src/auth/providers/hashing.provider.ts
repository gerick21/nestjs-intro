import { Injectable } from '@nestjs/common';

/**
 We use this hashing provider because now we are using bcrypt, but in the future, if
 we want to change the hashing algorythim we can do it easily cause this is an asbtract class.
 */

@Injectable()
export abstract class HashingProvider {
  abstract hashPassword(data: string | Buffer): Promise<string>;

  abstract comparePassword(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean>;
}
