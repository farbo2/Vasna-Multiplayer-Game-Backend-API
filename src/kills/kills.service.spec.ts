import { Test, TestingModule } from '@nestjs/testing';
import { KillsService } from './kills.service';

describe('KillsService', () => {
  let service: KillsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KillsService],
    }).compile();

    service = module.get<KillsService>(KillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
