import { Test, TestingModule } from '@nestjs/testing';
import { BattlePassController } from './battle-pass.controller';

describe('BattlePassController', () => {
  let controller: BattlePassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BattlePassController],
    }).compile();

    controller = module.get<BattlePassController>(BattlePassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
