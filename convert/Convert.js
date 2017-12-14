var im = require('imagemagick');
var fs = require('fs');
var md5 = require('md5');
var path = require('path')

class Convert
{
    constructor(filepath, upload_filename, options)
    {
        this.filepath = filepath;
        this.upload_filename = upload_filename;
        this.idx = md5(this.upload_filename);
        this.destination = "webapp/static/assets/processed/" + this.idx;
        this.options = options;
    }

    /**
     * Is this file valid and part of our correct system
     */
    isValidFile()
    {
        let extensions = {
            "EPS": true,
            "SVG": true,
            "JPG": true,
            "PDF": true
        };
        let extension = path.extname(this.filepath).replace(".", "");
        return (fs.existsSync(this.filepath) &&
                extensions[extension.toUpperCase()]) ? true : false;
    }

    resizeAndCrop(width, height, format)
    {
        return [
            '-colorspace','sRGB','-density','600',
            this.filepath,
            '-resize',
            width+'x'+height+'^',
            '-gravity',
            'center',
            '-crop',
            width+'x'+height+'+0+0',
            '+repage',
            '-flatten','-units', 'pixelsperinch','-density',
            '224.993',this.destination + "-compiled." + format
        ];
    }

    fileConversion(width, height, format)
    {
        return [
            '-colorspace','sRGB','-density','600', this.filepath, '-resize',
            width+"x"+height,'-flatten','-units', 'pixelsperinch','-density',
            '224.993',this.destination + "-compiled." + format
        ];
    }

    /**
     * Make conversion from acceptable format file to PNG
     * Employ a promise to to resolve on completion.  Ensures render is there
     * and tests work.
     */
    convertFileToPNG(width, height, format, type_of_conversion)
    {

        switch (type_of_conversion) {
            case "cropcentre":
                this.options = this.resizeAndCrop(width,height,format);
                break;
            case "bareconvert":
                this.options = this.fileConversion(width,height,format);
                break;
            default:
                this.options = this.resizeAndCrop(width,height,format);
                break;
        }
        return new Promise((resolve, reject) => {
            if (!width && !height) {
                reject({"error": "Invalid dimensions", "sendto": "dimensions_invalid"});
            }
            if (!this.isValidFile()) {
                reject({
                    error: "Invalid file",
                    sendto: "file_invalid"
                });
            }
            im.convert(
                this.options,
                (err, stdout) => {
                    if (err) {
                        reject({
                            error:"Error in process of conversion",
                            sendto:"process_error"
                        });
                    } else {
                        resolve({
                            idx:this.idx,
                            destination:this.destination,
                            filepath:this.filepath,
                            format: format,
                            options: this.options
                        });
                    }
                }
            );
        });
    }
}

module.exports = Convert;
