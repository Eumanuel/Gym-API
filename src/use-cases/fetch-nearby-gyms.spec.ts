import { beforeEach, describe, expect, it } from 'vitest';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: '500m gym',
      latitude: -22.1145974,
      longitude: -51.3761359,
    });
    await gymsRepository.create({
      title: '1km gym',
      latitude: -22.1157173,
      longitude: -51.3944256,
    });
    await gymsRepository.create({
      title: '1.5km gym',
      latitude: -22.1165919,
      longitude: -51.4009917,
    });
    await gymsRepository.create({
      title: '2km gym',
      latitude: -22.1171883,
      longitude: -51.407901,
    });
    await gymsRepository.create({
      title: '3km gym',
      latitude: -22.1130535,
      longitude: -51.3985455,
    });
    await gymsRepository.create({
      title: '4km gym',
      latitude: -22.113133,
      longitude: -51.4174712,
    });
    await gymsRepository.create({
      title: '5km gym',
      latitude: -22.1129342,
      longitude: -51.4336932,
    });
    const { gyms } = await sut.execute({
      userLatitude: -22.1134066,
      userLongitude: -51.3795772,
    });

    expect(gyms).toHaveLength(5);
    expect(gyms).toEqual([
      expect.objectContaining({ title: '500m gym' }),
      expect.objectContaining({ title: '1km gym' }),
      expect.objectContaining({ title: '1.5km gym' }),
      expect.objectContaining({ title: '2km gym' }),
      expect.objectContaining({ title: '3km gym' }),
    ]);
  });
});
