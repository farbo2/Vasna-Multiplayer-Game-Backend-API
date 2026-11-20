import { Test, TestingModule } from '@nestjs/testing';
import { PrivateMessagesController } from './private-messages.controller';
import { PrivateMessagesService } from './private-messages.service';

describe('PrivateMessagesController', () => {
  let controller: PrivateMessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivateMessagesController],
      providers: [{ provide: PrivateMessagesService, useValue: { getConversation: jest.fn(), getBySender: jest.fn(), getByReceiver: jest.fn(), create: jest.fn(), edit: jest.fn(), markSeen: jest.fn(), remove: jest.fn() } }],
    }).compile();
    controller = module.get<PrivateMessagesController>(PrivateMessagesController);
  });

  it('should be defined', () => expect(controller).toBeDefined());
});
