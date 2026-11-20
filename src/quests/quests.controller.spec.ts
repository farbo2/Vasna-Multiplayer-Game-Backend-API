import { Test, TestingModule } from '@nestjs/testing';
import { QuestsController } from './quests.controller';
import { QuestsService } from './quests.service';

describe('QuestsController', () => {
  let controller: QuestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestsController],
      providers: [{ provide: QuestsService, useValue: { findAll: jest.fn(), findActive: jest.fn(), createQuest: jest.fn(), updateQuest: jest.fn(), createUserQuest: jest.fn(), updateUserQuest: jest.fn(), getUserQuest: jest.fn(), getActiveUserQuests: jest.fn() } }],
    }).compile();
    controller = module.get<QuestsController>(QuestsController);
  });

  it('should be defined', () => expect(controller).toBeDefined());
});
