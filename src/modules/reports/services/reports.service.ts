import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../../../entities/report.entity';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { ExceptionHandler } from '../../../common/exceptions/exception-handler';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(name: string, price: number) {
    const report = this.repo.create({ name, price });
    return this.repo.save(report);
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  async getAll(page: number, size: number) {
    try {
      const [records, totalCount] = await this.repo.findAndCount({
        take: size, // Limit results to any number like 10, 50, 100
        skip: (page - 1) * size, // Skip number of results as pages
      });
      return { reports: records, totalReports: totalCount };
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  async update(id: string, attrs: Partial<Report>) {
    try {
      const report = await this.repo.findOneBy({ id });
      if (!report) {
        throw new Error('Report Not Found');
      }
      Object.assign(report, attrs);
      const updatedReport = await this.repo.save(report);
      return updatedReport;
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }

  async remove(id: string) {
    try {
      const report = await this.repo.findOneBy({ id });
      if (!report) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      await this.repo.remove(report);
      return {
        id,
        message: 'Report deleted successfully',
      };
    } catch (error) {
      throw new ExceptionHandler(error);
    }
  }
}
