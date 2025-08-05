import {
  Body,
  Controller,
  Patch,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
} from '@nestjs/common';
import { ReportsService } from '../services/reports.service';
import { Serialize } from '../../../common/interceptors/serialize.interceptors';
import { CreateReportDto } from '../../reports/dtos/create-report.dto';
import { ReportDto } from '../../reports/dtos/report.dto';
import { ReportRespDto } from '../../reports/dtos/common-report-resp.dto';
import { GetAllReqReportsDto } from '../dtos/getAll-req-reports.dto';
import { GetAllReportsDto } from '../dtos/getAll-reports.dto';
import { UpdateReportDto } from '../dtos/update-report.dto';
import { DeleteReportDto } from '../dtos/delete-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Serialize(ReportRespDto)
  @Post('/create')
  createUser(@Body() body: CreateReportDto) {
    return this.reportService.create(body.name, body.price);
  }

  @Serialize(GetAllReportsDto)
  @Post('/getAll')
  @HttpCode(200)
  async getAll(@Body() body: GetAllReqReportsDto) {
    return this.reportService.getAll(body.page, body.size);
  }

  @Serialize(ReportDto)
  @Get('/:id')
  findReport(@Param('id') id: string) {
    return this.reportService.findOne(id);
  }

  @Serialize(ReportDto)
  @Patch('/:id')
  updateReport(@Param('id') id: string, @Body() body: UpdateReportDto) {
    return this.reportService.update(id, body);
  }

  @Serialize(DeleteReportDto)
  @Delete('/:id')
  async removeReport(@Param('id') id: string) {
    return await this.reportService.remove(id);
  }
}
