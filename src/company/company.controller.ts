import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/user-roles.decorator';
import { CreateCompanyDto } from './dto/create-company.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('company')
@Controller('company')
@ApiBearerAuth() // Adds the bearer token to Swagger
@UseGuards(JwtAuthGuard, RolesGuard)
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Post('create')
    @Roles('super-admin') // Guarded by role
    @ApiOperation({ summary: 'Create a new company' })
    @ApiResponse({
        status: 201,
        description: 'Company created successfully',
        schema: {
            example: {
                message: 'Company created successfully',
                company: {
                    id: 1,
                    name: 'Tech Solutions Inc.',
                    address: '1234 Main St, Tech City',
                    contactEmail: 'contact@techsolutions.com',
                },
            },
        },
    })
    async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
        return this.companyService.createCompany(createCompanyDto);
    }

    @Get('all-companies')
    @Roles('super-admin') // Guarded by role
    @ApiOperation({ summary: 'Get all companies' })
    @ApiResponse({
        status: 200,
        description: 'List of companies retrieved successfully',
        schema: {
            example: {
                companies: [
                    {
                        id: 1,
                        name: 'Tech Solutions Inc.',
                        address: '1234 Main St, Tech City',
                        contactEmail: 'contact@techsolutions.com',
                    },
                    {
                        id: 2,
                        name: 'Innovative Designs LLC',
                        address: '4567 Elm St, Innovation Town',
                        contactEmail: 'info@innodesigns.com',
                    },
                ],
            },
        },
    })
    async getAllCompanies() {
        return this.companyService.findAllCompanies();
    }
}
