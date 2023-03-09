import { RegisterRequest } from './../application/dto/request/user.register.request';
import express from 'express';
import { UserService } from './../application/user.service';

const userService: UserService = new UserService();

export const checkCreatable = (from: string) => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const registerRequest: RegisterRequest = req[from] as RegisterRequest;
    
    // 이미 존재하는 이메일인지 검증한다
    const isAlreadyExistEmail: boolean = await userService.isAlreadyExistEmail()
};