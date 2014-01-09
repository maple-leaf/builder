
describe('Underscore loading test', function(){
  var u = require('underscore');

  describe('underscore', function(){
    it('Should not be undfined', function(){
      expect(u).toEqual(_);
    })
  })
});
