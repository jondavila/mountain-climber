let testPlayer = new Player(15,15,30,30);
let testPlatform = new Platform(15,30);


describe('class Player', function() {
    let testPlayer = new Player(15,15,30,30);
    
    it('should return a number for x', function() {
        expect(typeof(testPlayer.x)).toBe('number');
    });

    it('should return a number for y', function() {
        expect(typeof(testPlayer.y)).toBe('number');
    });

    it('should return a number for width', function() {
        expect(typeof(testPlayer.width)).toBe('number');
    });

    it('should return a number for height', function() {
        expect(typeof(testPlayer.height)).toBe('number');
    });

    it('should return a boolean for alive', function() {
        expect(typeof(testPlayer.alive)).toBe('boolean');
    });

});

describe('class platform', function() {
    it('should return a number for x', function() {
        expect(typeof(testPlatform.x)).toBe('number');
    });

    it('should return a number for y', function() {
        expect(typeof(testPlatform.y)).toBe('number');
    });
});

describe('createPlatfroms()', function() {
    it('should add a platfrom to platforms array', function () {
      let platLength1 = platforms.length;
      createPlatforms(10);
      let platLength2 = platforms.length;
      let result  = platLength2 - platLength1
      expect(result).toBe(1);
    });
});
