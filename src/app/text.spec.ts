import { TestBed } from '@angular/core/testing';

import { Text } from './text';

describe('Text', () => {
  let service: Text;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Text);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
