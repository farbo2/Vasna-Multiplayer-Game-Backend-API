import { Test, TestingModule } from '@nestjs/testing';
import { ClanQuestsController } from './clan-quests.controller';

describe('ClanQuestsController', () => {
  let controller: ClanQuestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClanQuestsController],
    }).compile();

    controller = module.get<ClanQuestsController>(ClanQuestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
