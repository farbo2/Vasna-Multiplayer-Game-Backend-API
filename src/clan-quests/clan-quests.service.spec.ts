import { Test, TestingModule } from '@nestjs/testing';
import { ClanQuestsService } from './clan-quests.service';

describe('ClanQuestsService', () => {
  let service: ClanQuestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClanQuestsService],
    }).compile();

    service = module.get<ClanQuestsService>(ClanQuestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
