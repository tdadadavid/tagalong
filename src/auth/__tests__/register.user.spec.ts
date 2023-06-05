import { ControllerArgs } from "../../core"
import { User } from "../../users/entities"
import { RegisterUser } from "../services/register"

describe('Register User Service', () => {

    const mockData = {
        name: "King David",
        email: "kingoloruntofunmi@gmail.com",
        phoneNumber: "08182389658",
        password: "3j90z239ffxiimfoi"
    }

    const MockUser: any = {
        findOne: () => jest.fn().mockResolvedValue(mockData).mockResolvedValue(null),
        create: () => jest.fn().mockResolvedValue(mockData)
    };


    it('it creates and returns the newly created user', () => {
        const registerUser = new RegisterUser(MockUser);
        const register = jest.spyOn(registerUser, 'register');

        registerUser.register({input: mockData}).then((data: any) => {
            expect(register).toHaveBeenCalledTimes(1);
            expect(data).toHaveProperty('message')
        })
    })


})