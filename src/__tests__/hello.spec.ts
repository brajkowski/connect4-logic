import { helloWorld } from '../hello';

describe('hello', () => {
  it('Should return the hello world string', () => {
    expect(helloWorld()).toBe('Hello world!');
  });
});
