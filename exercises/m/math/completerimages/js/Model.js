m.math.completerimages.Model = function (s) {

// public methods
    this.check = function() {
        okResult = true;
        return true;
    };

    this.isOkResult = function() {
        return okResult;
    };

    this.next = function() {
        index =0;
        okResult = false;
    };

    this.reset = function() {
    };

    var generateImgs = function () {

        /*
        * voir pour regler les img et imgs pour l affichage des images
        */

        for (var i = 0; i < imgNumbers.length; ++i) {
            imgs.push([]);
            for (var j = 0; j < imgNumbers[i].length; ++j) {
                for (var k = 0; k < imgNumbers[i][j].number; ++k) {
                    var img;
                    //console.log(imgNumbers);
                    do {
                        img = generateImg(imgNumbers[i][j].type);
                    } while (!valid_img(img, imgs[i]));
                    src[i]=imgNumbers[i][j].type;
                    imgs[i].push(img);
                }
            }
        }

    };


    this.getImgs = function () {
        return imgs[index];
    };

    this.getSrc = function(){
        return src;
    };


    var generateImg = function (type) {
        var x = Math.random();
        var y = Math.random();

        if (type === 'fish') {

            var randomsize = Math.random();

            var width = randomsize * 160;
            var height = randomsize *151;

            return {
                type: type,
                x: x,
                y: y,
                width: width,
                height: height,
               // number: number,
                src: 'exercises/m/math/completerimages/img/fish-1.png',
                center_x: x + width / 2,
                center_y: y + height / 2,
                radius: (width / 2 ) * Math.sqrt(2)
            };
        }
        if (type === 'house') {

            var randomsize = Math.random();

            var width = randomsize * 140;
            var height = randomsize * 144 ;

            return {
                type: type,
                x: x,
                y: y,
                width: width,
                height: height,
               // number: number,
                src: 'exercises/m/math/completerimages/img/house-1.png',
                center_x: x + width / 2,
                center_y: y + height / 2,
                radius: (width / 2 ) * Math.sqrt(2)
            };
        }
        if (type === 'humpty') {

            var randomsize = Math.random();

            var width = randomsize * 115 ;
            var height = randomsize *156;

            return {
                type: type,
                x: x,
                y: y,
                width: width,
                height: height,
                //number: number,
                src: 'exercises/m/math/completerimages/img/humpty-1.png',
                center_x: x + width / 2,
                center_y: y + height / 2,
                radius: (width / 2 ) * Math.sqrt(2)
            };
        }
        if (type === 'mum') {

            var randomsize = Math.random();

            var width = randomsize * 115 ;
            var height = randomsize * 156;

            return {
                type: type,
                x: x,
                y: y,
                width: width,
                height: height,
                //number: number,
                src: 'exercises/m/math/completerimages/img/mum-1.png',
                center_x: x + width / 2,
                center_y: y + height / 2,
                radius: (width / 2 ) * Math.sqrt(2)
            };
        }

    };


    var valid_img = function (img, list) {
        if (img.center_x - img.radius < 0.01) {
            return false;
        }
        if (img.center_x + img.radius > 0.99) {
            return false;
        }
        if (img.center_y - img.radius < 0.01) {
            return false;
        }
        if (img.center_y + img.radius > 0.99) {
            return false;
        }

        var ok = true;
        var i = 0;

        while (ok && i < list.length) {
            var dx = Math.abs(list[i].center_x - img.center_x);
            var dy = Math.abs(list[i].center_y - img.center_y);
            var radius = list[i].radius + img.radius;

            if (Math.sqrt(dx * dx + dy * dy) < radius) {
                ok = false;
            } else {
                ++i;
            }
        }
        return ok;
    };


// private methods
    var init = function() {
        index = 0;
        generateImgs();
    };

// private attributes
    var imgNumbers = s;
    var okResult;

    var index;
    var imgs = [];
    var src = [];
    init();
};