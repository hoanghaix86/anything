// import { Body, Controller, Get, Post } from '@nestjs/common'
// import { AccountService } from 'src/services/account.service'
// import { CreateAccountDto } from '../dtos/account.dto'

// @Controller('accounts')
// export class AccountController {
//     constructor(private readonly accountService: AccountService) {}

//     @Post()
//     async createAccount(@Body() dto: CreateAccountDto) {
//         return await this.accountService.createAccount(dto)
//     }

//     @Get()
//     async query() {
//         return await this.accountService.getAccounts()
//     }
// }
