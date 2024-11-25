import { Test, TestingModule } from '@nestjs/testing';
import { BattlePassService } from './battle-pass.service';

describe('BattlePassService', () => {
  let service: BattlePassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BattlePassService],
    }).compile();

    service = module.get<BattlePassService>(BattlePassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
