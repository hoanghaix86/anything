import { v7 } from 'uuid'
import { EmailValueObject } from '../value-objects/email.value-object'
import { PasswordValueObject } from '../value-objects/password.value-object'

export interface AccountProps {
    id: string
    email: EmailValueObject
    password: PasswordValueObject
}

export interface AccountRestoreProps {
    id: string
    email: string
    password: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AccountCreateProps extends Omit<AccountProps, 'id'> {}

export class Account {
    private readonly _id: string
    private readonly _email: EmailValueObject
    protected _password: PasswordValueObject

    private constructor(props: AccountProps) {
        this._id = props.id
        this._email = props.email
        this._password = props.password
    }

    get id(): string {
        return this._id
    }

    get email(): EmailValueObject {
        return this._email
    }

    get password(): PasswordValueObject {
        return this._password
    }

    static create(props: AccountCreateProps) {
        const id = v7()
        return new Account({ ...props, id })
    }

    changePassword(newPassword: PasswordValueObject): void {
        this._password = newPassword
    }

    static restore(props: AccountRestoreProps): Account {
        const emailVO = EmailValueObject.restore(props.email)
        const passwordVO = PasswordValueObject.restore(props.password)
        return new Account({ ...props, email: emailVO, password: passwordVO })
    }
}
