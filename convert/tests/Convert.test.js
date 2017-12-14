let Convert = require("../Convert.js");
let fs = require("fs");

test('Provides no dimensions', () => {
    let testConvert = new Convert(
        "convert/tests/test.eps",
        "test.eps"
    );
    expect.assertions(1);
    return expect(testConvert.convertFileToPNG()).rejects.toEqual({
        error: "Invalid dimensions",
        sendto: "dimensions_invalid"
    });
});

test('Converts EPS file to PNG with return ID', () => {
    let testConvert = new Convert(
        "convert/tests/test.eps",
        "test.eps"
    );
    expect.assertions(1);
    return testConvert.convertFileToPNG(500,30,"png","cropcentre")
    .then(
        data=>expect(data.idx).
        toBe("8c18ecc500de49027f0ed1df1bec10b8")
    );

});

test('Invalid file sent', () => {
    let testConvert = new Convert(
        "foo",
        "test.eps"
    );

    expect.assertions(1);
    return expect(testConvert.convertFileToPNG(1000,1000,"png", "cropcentre")).rejects.toEqual({
        error: "Invalid file",
        sendto: "file_invalid"
    });
});

test('Is the file extension valid', () => {
    let testConvert = new Convert(
        "convert/tests/test.eps",
        "test.eps"
    );
    let result = testConvert.isValidFile();
    expect(result).toBe(true);
});

test('Do the generated files exist', () => {
    let file_sync = 0;
    let status = false;
    let root_path = 'webapp/static/assets/processed/8c18ecc500de49027f0ed1df1bec10b8-';
    let files = [root_path+'compiled.png'];
    let interval = setInterval(()=> {
        if (status||file_sync==5) {
            clearInterval(interval);
            expect(status).toBe(true);
        }

        status = fs.existsSync(files[0]);
    },3000);
});
