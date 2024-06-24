import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from './create-gym';

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it('it should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'test gym',
      description: null,
      phone: null,
      latitude: -22.1132744,
      longitude: -51.3791837,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
