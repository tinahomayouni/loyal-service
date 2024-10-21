import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/user-roles.decorator';
import { CreateCompanyDto } from './dto/create-company.dto';


@Controller('company')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Post('create')
    @Roles('super-admin')
    async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
        return this.companyService.createCompany(createCompanyDto);
    }

    @Get()
    @Roles('super-admin')
    async getAllCompanies() {
        return this.companyService.findAllCompanies();
    }
}
