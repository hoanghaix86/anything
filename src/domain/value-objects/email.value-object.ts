export class EmailValueObject {
    private readonly _value: string

    private constructor(email: string) {
        this._value = email
    }

    public static fromRaw(email: string): EmailValueObject {
        EmailValueObject.validate(email)
        return new EmailValueObject(email)
    }

    private static validate(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const isPass = emailRegex.test(email)

        if (!isPass) throw new Error('Invalid email format')
    }

    getValue(): string {
        return this._value
    }

    static restore(value: string): EmailValueObject {
        return new EmailValueObject(value)
    }
}
