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