import { add, concat, divide } from './units';

import { expect, should } from 'chai';
import 'mocha';

describe('add function', () => {

  it('should add two and two', () => {
    const result = add(2,2);
    expect(result).to.equal(4);
  });

  it('should add -2 and two', () => {
    const result = add(-2,2);
    expect(result).to.equal(0);
  });

});

describe('divide', () => {

  it('should divide 6 by 3', () => {
    const result = divide(6,3);
    expect(result).to.equal(2);
  });

  it('should divide 5 and 2', () => {
    const result = divide(5,2);
    expect(result).to.equal(2.5);
  });

  it('should throw an error if div by zero', () => {
    expect(()=>{ divide(5,0) }).to.throw('div by 0')
  });

});

describe('concat', () => {
  it('should concatenate ama and kofi', () => {
    const result = concat('ama','kofi');
    expect(result).to.equal('amakofi')
  })
  it('should concatenate david and elias', () => {
    const result = concat('david','elias');
    expect(result).to.equal('davidelias')
  })
  it('should throw error if one of the string is empty', () => {
    expect(() => concat('','kofi')).to.throw('a or b should not be empty')
  })
  it('should throw error if one of the string is empty', () => {
    expect(() => concat('ama','')).to.throw('a or b should not be empty')
  })
})

// @TODO try creating a new describe block for the "concat" method
// it should contain an it block for each it statement in the units.ts @TODO.
// don't forget to import the method ;

