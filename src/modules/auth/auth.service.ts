import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../user/models/user.interface';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto) {
        const { username, password } = authCredentialsDto;

        console.log('username: ', username);
        console.log('password: ', password);

        try{
            this.userService.createUser({
                username,
                first_name: 'Unknown',
                last_name: 'Unknown',
                password,
            })
        } catch(err){
            if(err.code === '23505'){
                throw new ConflictException('Username already exists')
            } else {
                throw new InternalServerErrorException()
            }
        }
    }

    async signIn(authCredentialsDto: AuthCredentialsDto, res: Response): Promise<{ user: IUser }> {
        const { username, password } = authCredentialsDto;
        const { user } = await this.userService.getUser({username});
        
        const correctPassword = await bcrypt.hash(password, user.salt) === user.password;

        if(!(user && correctPassword)){
            throw new UnauthorizedException('Invalid credentials')
        }

        const access_token = await this.jwtService.sign({id: user.id});
        res.cookie('jwt', access_token, {httpOnly: true})

        return { user }
    }
}
