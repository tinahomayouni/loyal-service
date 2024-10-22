import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { CreateCompanyDto } from './dto/create-company.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('company')
@Controller('company')
@ApiBearerAuth()
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Post('create')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new company' })
    @ApiResponse({
        status: 201,
        description: 'Company created successfully',
    })
    async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
        return this.companyService.createCompany(createCompanyDto);
    }

    @Get('all-companies')
    //@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
    @ApiOperation({ summary: 'Get all companies' })
    @ApiResponse({
        status: 200,
        description: 'List of companies retrieved successfully, including roles and permissions',
    })
    async getAllCompanies() {
        return this.companyService.findAllCompanies();
    }
}
