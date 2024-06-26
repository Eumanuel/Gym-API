import { Gym, Prisma } from '@prisma/client';
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository';
import { randomUUID } from 'crypto';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async searchManyNearby(params: FindManyNearbyParams) {
    const gyms = this.items.filter(
      (item) =>
        getDistanceBetweenCoordinates(
          { latitude: params.latitude, longitude: params.longitude },
          {
            latitude: item.latitude.toNumber(),
            longitude: item.longitude.toNumber(),
          },
        ) < 3,
    );

    return gyms;
  }
  async searchMany(query: string, page: number) {
    const gyms = this.items
      .filter((item) => item.title.includes(query))
      .slice(20 * (page - 1), 20 * page);

    return gyms;
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }
}
