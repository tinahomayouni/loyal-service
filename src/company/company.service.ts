import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/entity/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
    ) {}

    async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
        const { name } = createCompanyDto;

        const existingCompany = await this.companyRepository.findOne({ where: { name } });
        if (existingCompany) {
            throw new BadRequestException('Company already exists');
        }

        const company = this.companyRepository.create(createCompanyDto);
        return this.companyRepository.save(company);
    }

    async findAllCompanies() {
        return this.companyRepository.find({
          relations: ['roles', 'roles.permissions'],
        });
      }
}
