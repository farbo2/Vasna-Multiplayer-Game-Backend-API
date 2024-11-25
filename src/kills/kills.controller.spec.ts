import { Test, TestingModule } from '@nestjs/testing';
import { KillsController } from './kills.controller';

describe('KillsController', () => {
  let controller: KillsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KillsController],
    }).compile();

    controller = module.get<KillsController>(KillsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
