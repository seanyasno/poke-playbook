import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import {
  CreateTeamDto,
  UpdateTeamDto,
  GetTeamsQueryDto,
  TeamResponseDto,
  TeamsListResponseDto,
  TeamResponseSchema,
  TeamsListResponseSchema,
} from './dto';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/auth.decorator';

@ApiTags('Teams')
@ApiBearerAuth()
@Controller('teams')
@UseGuards(AuthGuard)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new Pokemon team' })
  @ApiBody({ type: CreateTeamDto })
  @ApiResponse({
    status: 201,
    description: 'Team created successfully',
    type: TeamResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation errors or duplicate positions',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @CurrentUser() userId: string,
    @Body() createTeamDto: CreateTeamDto,
  ): Promise<TeamResponseDto> {
    try {
      const team = await this.teamsService.create(userId, createTeamDto);
      return TeamResponseSchema.parse(team);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('Duplicate position')
      ) {
        throw new BadRequestException(
          'Duplicate position values are not allowed',
        );
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: "Get user's Pokemon teams" })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of teams to return (default: 20, max: 100)',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Pagination offset (default: 0)',
  })
  @ApiQuery({
    name: 'includePokemons',
    required: false,
    type: Boolean,
    description: 'Include team Pokemon in response (default: true)',
  })
  @ApiResponse({
    status: 200,
    description: 'Teams retrieved successfully',
    type: TeamsListResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(
    @CurrentUser() userId: string,
    @Query() query: GetTeamsQueryDto,
  ): Promise<TeamsListResponseDto> {
    const result = await this.teamsService.findAll(userId, query);
    return TeamsListResponseSchema.parse(result);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Pokemon team' })
  @ApiParam({ name: 'id', description: 'Team ID', type: String })
  @ApiBody({ type: UpdateTeamDto })
  @ApiResponse({
    status: 200,
    description: 'Team updated successfully',
    type: TeamResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation errors or duplicate positions',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 403,
    description: "Forbidden - user doesn't own the team",
  })
  @ApiResponse({ status: 404, description: 'Team not found' })
  async update(
    @CurrentUser() userId: string,
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<TeamResponseDto> {
    try {
      const team = await this.teamsService.update(id, userId, updateTeamDto);
      return TeamResponseSchema.parse(team);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('Duplicate position')
      ) {
        throw new BadRequestException(
          'Duplicate position values are not allowed',
        );
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a Pokemon team' })
  @ApiParam({ name: 'id', description: 'Team ID', type: String })
  @ApiResponse({ status: 204, description: 'Team deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 403,
    description: "Forbidden - user doesn't own the team",
  })
  @ApiResponse({ status: 404, description: 'Team not found' })
  async remove(
    @CurrentUser() userId: string,
    @Param('id') id: string,
  ): Promise<void> {
    await this.teamsService.remove(id, userId);
  }
}
