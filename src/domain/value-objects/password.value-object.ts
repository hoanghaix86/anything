import { IPasswordHasherPort } from '../port/password-hasher.port'

export class PasswordValueObject {
    private readonly _value: string

    private constructor(password: string) {
        this._value = password
    }

    private static validate(password: string): void {
        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters long')
        }
        if (!/[A-Z]/.test(password)) {
            throw new Error('Password must contain at least one uppercase letter')
        }
        if (!/[0-9]/.test(password)) {
            throw new Error('Password must contain at least one digit')
        }
        if (!/[!@#$%^&*]/.test(password)) {
            throw new Error('Password must contain at least one special character')
        }
    }

    static async createFromRaw(rawPassword: string, passwordHasher: IPasswordHasherPort): Promise<PasswordValueObject> {
        PasswordValueObject.validate(rawPassword)
        const hashedPassword = await passwordHasher.hash(rawPassword)
        return new PasswordValueObject(hashedPassword)
    }

    static restore(value: string): PasswordValueObject {
        return new PasswordValueObject(value)
    }

    getValue(): string {
        return this._value
    }
}
