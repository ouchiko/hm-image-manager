let Utility = require("../Utility");

test('Generates a random number between X..Y', () => {
    let result = Utility.getRand(30,50);
    expect((result>=30&&result<=50)).toBe(true);
});

test('Generates a random string of 10char', () => {
    let result = Utility.getRandomString(10);
    expect(result.length==10).toBe(true);
});

test('Fails check for a number value between X AND Y', () => {
    let result = Utility.isNumber("X",0,10);
    expect(result).toBe(false);
});

test('Passes check for a number value between X AND Y', () => {
    let result = Utility.isNumber(5,0,10);
    expect(result).toBe(true);
});
