import { TestBed } from '@angular/core/testing';

import { UserCommunicationServiceService } from './user-communication-service.service';

describe('UserCommunicationServiceService', () => {
  let service: UserCommunicationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCommunicationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
