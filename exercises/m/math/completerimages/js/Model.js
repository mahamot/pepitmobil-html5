m.math.completerimages.Model = function (s) {

// public methods
    this.check = function(value) {

        okResult = false;
        if(this.getResult() == value){
            okResult = true;
        }
        return okResult;
    };

    this.isOkResult = function() {
        return okResult;
    };

    this.next = function() {
        ++index;
        okResult = false;
    };

    this.reset = function() {
    };



    /*generation des nombres aleatoire */
    var getRandomNumber = function(){

        var numberAlea = Math.round(Math.random()*20);
        numimg1 = Math.round(Math.random()*numberAlea);
        numimg2 = numberAlea - numimg1;
    };




    var generateImgs = function () {



        var typesrc =[];


        for (var i = 0; i < imgNumbers.length; ++i) {
            imgs.push([]);
            src.push([]);
            total.push([]);

            getRandomNumber();

            /* terminer le cote score total */
            for (var j = 0; j < imgNumbers[i].length; ++j) {

                var number = numimg1;

                if(j==1){
                    number = numimg2;
                }

                imgNumbers[i][j].number = number;



                for (var k = 0; k < number; ++k) {
                    var img;

                    do {
                        img = generateImg(imgNumbers[i][j].type);
                    } while (!valid_img(img, imgs[i]));

                    imgs[i].push(img);



                    if(typesrc.length ==0 || typesrc[k-1] != img.src){
                        src[i].push(img.src);
                    }
                    typesrc[k]= img.src;

                }

            }

            total[i] =  numimg1+numimg2;

        }


    };


    this.getImgs = function () {
        return imgs[index];
    };

    this.getSrc = function(){
        return src[index];
    };

    this.getResult = function(){
        return total[index];
    }


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

    var numimg1 = 0;
    var numimg2 = 0;

    var total = [];

    var index;
    var imgs = [];
    var src = [];
    init();
};