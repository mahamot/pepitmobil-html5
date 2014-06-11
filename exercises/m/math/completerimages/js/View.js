m.math.completerimages.View = function (mdl, div, i, s) {

// public methods
    this.init = function (mdl, view, i, s) {
        module = mdl;

        model = new m.math.completerimages.Model(s);
        init_div(view);
        controller = new m.math.completerimages.Controller(model, this);
    };

    this.next = function () {
        model.next();

        this.update();
    };

    this.error = function () {
        module.error();
    };

    this.update = function () {
        draw_images($('#canvas_element_md_lg'));
        draw_images($('#canvas_element_xs_sm'));
        if (model.isOkResult()) {
            module.next();
        }
    };

    //private methods
    var build_operation = function (view,style) {

        if (style === "md_lg") {
            var canvas_div = $('<div />', {
                style: 'background-color: #fffed4; width: 75%; align: center',
                id: 'canvas_id_md_lg'
            });

            var canvas = $('<canvas/>', {
                class: 'visible-md visible-lg',
                style: 'background-color: #fffed4;  padding-left: 0; padding-right: 0; margin-left: auto; margin-right: auto;display: block',
                id: 'canvas_element_md_lg'
            });

            build_spacing().appendTo(canvas_div);
            canvas.appendTo(canvas_div);
            canvas_div.appendTo(view);

            var js_canvas_div = document.getElementById("canvas_id_md_lg");
            var js_canvas = document.getElementById("canvas_element_md_lg");

            js_canvas.width = js_canvas_div.clientWidth;
            js_canvas.height = js_canvas_div.clientWidth;

            draw_images(canvas);

        }

// xs and sm devices
        if (style === "xs_sm") {
            var canvas_div = $('<div />', {
                style: 'background-color: #fffed4; align: center',
                id: 'canvas_id_xs_sm'
            });

            var canvas = $('<canvas/>', {
                class: 'visible-xs visible-sm',
                style: 'background-color: #fffed4; padding-left: 0; padding-right: 0; margin-left: auto; margin-right: auto;display: block',
                id: 'canvas_element_xs_sm'
            });

            //build_spacing().appendTo(canvas_div);
            canvas.appendTo(canvas_div);
            canvas_div.appendTo(view);

            var js_canvas_div = document.getElementById("canvas_id_xs_sm");
            var js_canvas = document.getElementById("canvas_element_xs_sm");

            js_canvas.width = js_canvas_div.clientWidth;
            js_canvas.height = js_canvas_div.clientWidth;

            draw_images(canvas);

        }


    };


    var load_images = function(src,images,context,width,height){

        var img = new Image();
        img.src = src;

        img.onload = function(){

            context.beginPath();

            for(var i =0;i<images.length;i++){
                var image = images[i];
                if (image.src === src) {

                    var imgwidth = image.width;
                    var imgheight = image.height;
                    if(imgwidth<0.1){
                         imgwidth=imgwidth+0.1;
                    }
                    if(imgheight<0.1){
                         imgheight=imgheight+0.1;
                    }

                    context.drawImage(img,image.x*width , image.y*height , imgwidth * width,imgheight * height);
                }


                context.stroke();
                context.fill();
                context.closePath();
            }

        }
    }
    


    var draw_images = function (canvas) {
        var width = canvas.width();
        var height = canvas.height();
        var context = canvas[0].getContext("2d");

        /* dessin d un cadre fond blanc pour les images */
        context.lineWidth = 1.;
        context.strokeStyle = "#000000";
        context.fillStyle = "#ffffff";
        context.rect(0, 0, width, height);
        context.fill();
        context.stroke();

        var images = model.getImgs();

        var srcimg = model.getSrc();

        if(images.length >0){

            for(var k = 0;k< srcimg.length;k++){

               load_images(srcimg[k],images,context,width,height);

            }

        }
    };





    var get_image = function(dx,dy,dw,dh){
        return {x:dx,
            y:dy,
            w:dw,
            h:dh,
            center_x: dx + dw / 2,
            center_y: dy + dh / 2,
            radius: (dw / 2 ) * Math.sqrt(2)};
    }

    /* fonction permettant la construction de la serie de bouton (verticalement ou horizontalement)*/
    var build_number = function(div,vertical,style){

        //probleme d affichage xs_sm et md_lg
        var button;
        var i =21;
        var class_size ='md';
        var class_style ='lg';
        var buttonvalid = $('<a/>', {
            href: '#',
            class: 'btn btn-lg btn-warning',
            id: 'valid',
            role: 'button',
            style: 'margin:auto;',
            html: 'valider'
        });
        var num; // = 7-i/3
        var button;

        if(style== 'xs_sm'){
            class_size ='xs';
            class_style ='sm';
        }
        var row_number;
        for(i;i>0;i--){

            if (vertical){

                if(i%3 == 0){

                    num = 7-i/3;

                    row_number =  $('<div/>', {
                        class: 'row-'+class_size+'-'+num+' visible-'+class_size+' visible-'+class_style,
                        id: 'row_id_'+style
                    });

                    row_number.appendTo(div);

                }
            }else{
                if(i == 21){

                    row_number =  $('<div/>', {
                        class: 'row-'+class_size+'-'+'0 visible-'+class_size+' visible-'+class_style,
                        id: 'row_id_'+style
                    });
                    row_number.appendTo(div);
                }
                if(i == 11){
                   // num = 1;

                    row_number =  $('<div/>', {
                        class: 'row-'+class_size+'-'+'1 visible-'+class_size+' visible-'+class_style,
                        id: 'row_id_'+style
                    });
                    row_number.appendTo(div);
                }
                if(i == 1){
                    // num = 1;

                    row_number =  $('<div/>', {
                        class: 'row-'+class_size+'-'+'2 visible-'+class_size+' visible-'+class_style,
                        id: 'row_id_'+style
                    });
                    row_number.appendTo(div);
                }


            }
            button = i-1;
            button = $('<a/>', {
                href: '#',
                class: 'btn btn-lg btn-primary',
                id: 'button_'+button+'_'+style,
                style: 'height:50px;width:60px;',
                role: 'button',
                html: button
            });


            button.appendTo(row_number);

        }

        /* rajout d'une ligne supplémentaire pour le bouton valid*/
        if(vertical){
            row_number =  $('<div/>', {
                class: 'row-'+class_size+'-7 visible-'+class_size+' visible-'+class_style,
                id: 'row_id_'+style
            });
            row_number.appendTo(div);

            buttonvalid.appendTo(row_number);

            col_number = $('<div/>', {
                class: 'col-'+class_size+'-3 visible-'+class_size+' visible-'+class_style,
                id: 'col_id_'+style
            });

            col_number.appendTo(row_number);
        }else{
            row_number =  $('<div/>', {
                class: 'row-'+class_size+'-3 visible-'+class_size+' visible-'+class_style,
                id: 'row_id_'+style
            });

            buttonvalid.appendTo(row_number);
            row_number.appendTo(div);
        }

    }

    var build_spacing = function () {
        return $('<div/>', {
            style: 'padding: 10px;'
        });
    };

    var init_div = function (view) {

        view.css({
            'background-color': '#9D9900',
            'padding': '10px'
        });
        view.addClass('row');

        // md and lg devices
        var canvas_div_md_lg = $('<div/>', {
            class: 'col-md-9 visible-md visible-lg',
            style: 'background-color: #fffed4;'
        });
        var number_div_md_lg = $('<div/>', {
            class: 'col-md-3 visible-md visible-lg',
            id : 'number_md_lg'
        });

        canvas_div_md_lg.appendTo(view);
        number_div_md_lg.appendTo(view);
        build_operation(canvas_div_md_lg, "md_lg");
        build_number(number_div_md_lg, true, "md_lg");


// xs and sm devices
        var global_div = $('<div/>', {
            class: 'col-xs-12 visible-xs visible-sm',
            id : 'global_div_xs_sm'
        });
        var canvas_div_xs_sm = $('<div/>', {
            style: 'background-color: #fffed4;'
        });
        var number_div_xs_sm = $('<div/>', {
            id : 'number_xs_sm'
        });

        canvas_div_xs_sm.appendTo(global_div);
        build_spacing().appendTo(global_div);
        number_div_xs_sm.appendTo(global_div);
        global_div.appendTo(view);
        build_operation(canvas_div_xs_sm, "xs_sm");
        build_number(number_div_xs_sm, false, "xs_sm");

    };

// private attributes
    var image;
    var list = [];

    var module;
    var model;
    var controller;

    this.init(mdl, div, i, s);
};