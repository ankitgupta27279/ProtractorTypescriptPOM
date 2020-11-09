import * as faker from "faker";
import { user_signup } from "../models/signup.model";

export function mockSignUpUser(): user_signup{
    return {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };
};