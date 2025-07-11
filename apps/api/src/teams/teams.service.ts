import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '@fastiship/database';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { GetTeamsQueryDto } from './dto/get-teams-query.dto';

@Injectable()
export class TeamsService {
  async create(userId: string, createTeamDto: CreateTeamDto) {
    const { name, description, pokemon } = createTeamDto;

    // Validate unique positions
    const positions = pokemon.map((p) => p.position);
    const uniquePositions = new Set(positions);
    if (positions.length !== uniquePositions.size) {
      throw new Error('Duplicate position values are not allowed');
    }

    return db.$transaction(async (tx) => {
      const team = await tx.teams.create({
        data: {
          name,
          description,
          user_id: userId,
        },
      });

      if (pokemon.length > 0) {
        await tx.team_pokemon.createMany({
          data: pokemon.map((p) => ({
            team_id: team.id,
            pokemon_id: p.pokemon_id,
            pokemon_name: p.pokemon_name,
            nickname: p.nickname,
            position: p.position,
          })),
        });
      }

      return this.findOne(team.id, userId);
    });
  }

  async findAll(userId: string, query: GetTeamsQueryDto) {
    const { limit, offset, includePokemons } = query;

    const [teams, total] = await Promise.all([
      db.teams.findMany({
        where: { user_id: userId },
        include: {
          team_pokemon: includePokemons
            ? {
                orderBy: { position: 'asc' },
              }
            : false,
        },
        orderBy: { created_at: 'desc' },
        take: limit,
        skip: offset,
      }),
      db.teams.count({
        where: { user_id: userId },
      }),
    ]);

    return {
      teams,
      total,
      limit,
      offset,
    };
  }

  async findOne(id: string, userId: string) {
    const team = await db.teams.findFirst({
      where: { id, user_id: userId },
      include: {
        team_pokemon: {
          orderBy: { position: 'asc' },
        },
      },
    });

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    return team;
  }

  async update(id: string, userId: string, updateTeamDto: UpdateTeamDto) {
    // Verify team exists and user owns it
    await this.findOne(id, userId);

    const { name, description, pokemon } = updateTeamDto;

    // If pokemon array is provided, validate unique positions
    if (pokemon) {
      const positions = pokemon.map((p) => p.position);
      const uniquePositions = new Set(positions);
      if (positions.length !== uniquePositions.size) {
        throw new Error('Duplicate position values are not allowed');
      }
    }

    return db.$transaction(async (tx) => {
      // Update team basic info
      await tx.teams.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(description !== undefined && { description }),
          updated_at: new Date(),
        },
      });

      // If pokemon array is provided, replace all pokemon
      if (pokemon) {
        // Delete existing pokemon
        await tx.team_pokemon.deleteMany({
          where: { team_id: id },
        });

        // Create new pokemon if any
        if (pokemon.length > 0) {
          await tx.team_pokemon.createMany({
            data: pokemon.map((p) => ({
              team_id: id,
              pokemon_id: p.pokemon_id,
              pokemon_name: p.pokemon_name,
              nickname: p.nickname,
              position: p.position,
            })),
          });
        }
      }

      return this.findOne(id, userId);
    });
  }

  async remove(id: string, userId: string) {
    // Verify team exists and user owns it
    await this.findOne(id, userId);

    await db.teams.delete({
      where: { id },
    });
  }
}
