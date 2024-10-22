import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { Permissions } from 'src/common/decorator/permissions.decorator';
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
    @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
    //@Permissions('view-companies')
    @ApiOperation({ summary: 'Get all companies' })
    @ApiResponse({
        status: 200,
        description: 'List of companies retrieved successfully, including roles and permissions',
        schema: {
            example: {
                companies: [
                    {
                        id: 1,
                        name: 'Tech Solutions Inc.',
                        address: '1234 Main St, Tech City',
                        contactEmail: 'contact@techsolutions.com',
                        users: [
                            {
                                id: 1,
                                email: 'admin@techsolutions.com',
                                roles: [
                                    {
                                        id: 1,
                                        name: 'admin',
                                        permissions: [
                                            {
                                                id: 1,
                                                name: 'create-company',
                                                description: 'Allows the creation of companies',
                                            },
                                            {
                                                id: 2,
                                                name: 'view-companies',
                                                description: 'Allows viewing companies',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        },
    })
    async getAllCompanies() {
        return this.companyService.findAllCompanies();
    }
}
