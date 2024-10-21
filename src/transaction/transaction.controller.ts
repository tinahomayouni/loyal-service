import { Controller, Get, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/user-roles.decorator';


@Controller('transaction')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Get()
    @Roles('super-admin')
    async getAllTransactions() {
        return this.transactionService.getAllTransactions();
    }
}
