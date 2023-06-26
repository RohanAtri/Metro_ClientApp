import { AmountFormaterPipe } from './amount-formater.pipe';

describe('AmountFormaterPipe', () => {
  it('create an instance', () => {
    const pipe = new AmountFormaterPipe();
    expect(pipe).toBeTruthy();
  });
});
