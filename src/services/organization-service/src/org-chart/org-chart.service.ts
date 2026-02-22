import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrgChartService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrgChart(employeeId: string, maxDepth: number = 5) {
    const node = await this.prisma.orgNode.findUnique({
      where: { employee_id: employeeId },
    });

    if (!node) {
      throw new NotFoundException('Employee not found in org chart');
    }

    const children = await this.buildChildren(employeeId, 0, maxDepth);

    return {
      ...node,
      children,
    };
  }

  private async buildChildren(employeeId: string, depth: number, maxDepth: number): Promise<any[]> {
    if (depth >= maxDepth) return [];

    const reportingLines = await this.prisma.reportingLine.findMany({
      where: { to_employee_id: employeeId, type: 'solid' },
    });

    if (reportingLines.length === 0) return [];

    const childIds = reportingLines.map((rl) => rl.from_employee_id);
    const childNodes = await this.prisma.orgNode.findMany({
      where: { employee_id: { in: childIds } },
    });

    const results = [];
    for (const child of childNodes) {
      const grandchildren = await this.buildChildren(child.employee_id, depth + 1, maxDepth);
      results.push({ ...child, children: grandchildren });
    }

    return results;
  }

  async getManager(employeeId: string) {
    const reportingLines = await this.prisma.reportingLine.findMany({
      where: { from_employee_id: employeeId, type: 'solid' },
    });

    if (reportingLines.length === 0) return null;

    const managerLine = reportingLines[0];
    return this.prisma.orgNode.findUnique({
      where: { employee_id: managerLine.to_employee_id },
    });
  }

  async getDirectReports(employeeId: string) {
    const reportingLines = await this.prisma.reportingLine.findMany({
      where: { to_employee_id: employeeId, type: 'solid' },
    });

    if (reportingLines.length === 0) return [];

    const childIds = reportingLines.map((rl) => rl.from_employee_id);
    return this.prisma.orgNode.findMany({
      where: { employee_id: { in: childIds } },
    });
  }
}
