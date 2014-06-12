m.math.completerimages.Controller = function (m, v) {

// private methods
    var init = function () {

        $('#valid').on('click', function (e) {
            var e = e || window.event;
            var target = e.target || e.srcElement;

            if(buttonpressed){
                if (model.check(buttonvalue)) {
                    view.update();
                } else {
                    view.error();
                }
            }
        });

        init_blue_button('md_lg');
        init_blue_button('xs_sm');
    };

// private methods

    var init_blue_button = function(style){

        for(var i =0; i < 21; i++){

            $('#button_' + i +'_' + style).on('click', function(e){
                blue_button_click(e,style);
            });
        }
    };

    var blue_button_click = function(e,style){

        var e = e || window.event;
        var target = e.target || e.srcElement;

        var id = target.id;

        e.success;

        if(buttonpressed ==false){

            buttonvalue = target.innerHTML;
            target.className='btn btn-lg btn-success';
            buttonpressed = true;
        }
        else{
            if(buttonvalue == target.innerHTML){
                buttonpressed = false;
                target.className = 'btn btn-lg btn-primary';
            }else{

                $('#button_' + buttonvalue +'_' + style).attr('class', 'btn btn-lg btn-primary');

                target.className='btn btn-lg btn-success';
                buttonvalue = target.innerHTML;
            }
        }

    }

// private attributes
    var model = m;
    var view = v;

    var buttonpressed = false;
    var buttonvalue = 21;
    init();
};