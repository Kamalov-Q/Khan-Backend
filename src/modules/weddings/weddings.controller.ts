import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { WeddingsService } from "./weddings.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/enums/user-role.enum";
import { CreateWeddingDto } from "./dto/create-wedding.dto";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { User } from "../users/entities/user.entity";
import { createPaginatedResponse, createResponse } from "src/common/utils/response.util";
import { UpdateWeddingDto } from "./dto/update-wedding.dto";

@ApiTags('Weddings')
@Controller('weddings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class WeddingsController {
    constructor(private readonly weddingsService: WeddingsService) { }

    @Post()
    @Roles(UserRole.ADMIN)
    async createWedding(
        @Body() dto: CreateWeddingDto,
        @CurrentUser() user: User
    ) {
        const wedding = await this.weddingsService.createWedding(dto, user.id);

        return createResponse(wedding, 'Wedding created successfully!');
    }

    @Get()
    @Roles(UserRole.ADMIN)
    async getAllWeddings(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ) {
        const [weddings, total] = await this.weddingsService.getAllWeddings(page, limit);

        return createPaginatedResponse(weddings, total, page, limit);
    }

    @Get('upcoming')
    @Roles(UserRole.ADMIN)
    async getUpcomingWeddings(@Query('days') days: number = 30) {
        const weddings = await this.weddingsService.getUpcomingWeddings(days);
        return createResponse(weddings);
    }

    @Get('today')
    @Roles(UserRole.ADMIN)
    async getTodayMeetings() {
        const wedding = await this.weddingsService.getTodayWeddings();
        return createResponse(wedding);
    }

    @Get(':id')
    @Roles(UserRole.ADMIN)
    async getWedding(@Param('id') id: string) {
        const wedding = await this.weddingsService.findWeddingById(id);
        return createResponse(wedding);
    }

    @Patch(':id')
    @Roles(UserRole.ADMIN)
    async updateWedding(
        @Param('id') id: string,
        @Body() dto: UpdateWeddingDto
    ) {
        const wedding = await this.weddingsService.updateWedding(id, dto);
        return createResponse(wedding, 'Wedding updated successfully!');
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    async deleteWedding(@Param('id') id: string) {
        await this.weddingsService.deleteWedding(id);
        return createResponse({ id }, 'Wedding cancelled successfully!')
    }

}