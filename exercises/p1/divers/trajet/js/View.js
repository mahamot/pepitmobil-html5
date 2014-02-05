p1.divers.trajet.View = function (mdl, div, n, m, min, max) {

// public methods
    this.init = function (mdl, view, n, m, min, max) {
        ncolumn = n;
        nline = m;
        minSize = min;
        maxSize = max;
        module = mdl;
        model = new p1.divers.trajet.Model(ncolumn, nline, minSize, maxSize);
        init_div(view);
        controller = new p1.divers.trajet.Controller(model, this);
    };

// private attributes
    var build_canvas = function (div) {
        var canvas_div = $('<div />', {
            style: 'background-color: #252538; width: 95%; padding-left: 0; padding-right: 0;' +
                'margin-left: auto; margin-right: auto;display: block',
            id: 'canvas_id'
        });

        var canvas = $('<canvas/>', {
            style: 'padding-left: 0; padding-right: 0; margin-left: auto; margin-right: auto;' +
                'display: block',
            id: 'canvas_element'
        });
        canvas.appendTo(canvas_div);
        canvas_div.appendTo(div);

        var js_canvas_div = document.getElementById("canvas_id");
        var js_canvas = document.getElementById("canvas_element");

        js_canvas.width = js_canvas_div.clientWidth * 0.9;
        js_canvas.height = window.innerHeight * 0.65;
        draw_grid(canvas);
    };

    var build_grid = function (view) {
        var canvas_div = $('<div />', {
            class: 'row'
        });

        canvas_div.appendTo(view);
        build_canvas(canvas_div);
    };

    var build_path = function (view) {

    };

    var build_spacing = function () {
        return $('<div/>', {
            style: 'padding: 10px;'
        });
    };

    var compute_dimensions = function(canvas_width, canvas_height) {
        pts_x = [ ];
        pts_y = [ ];
        margin_x = 10;
        margin_y = 10;
        width = canvas_width - (margin_x * 2);
        height = canvas_height - (margin_y * 2);
        space_x = width / (ncolumn - 1);
        space_y = height / (nline - 1);
        width = space_x * (ncolumn - 1);
        height = space_y * (nline - 1);

        for (var i = 0; i < ncolumn; i++) {
            if (i == 0)
                pts_x[i] = 0 + margin_x;
            else
                pts_x[i] = 0 + margin_x + (space_x * i);
        }
        for (var i = 0; i < nline; i++) {
            if (i == 0)
                pts_y[i] = 0 + margin_y;
            else
                pts_y[i] = 0 + margin_y + (space_y * i);
        }
    };

    var draw_grid_and_path = function(context) {
        for (var i = 0; i < model.size(); ++i) {
            var s = model.get(i);
/*            Arrow a = new Arrow(s, pts_x, pts_y);

            if (a.getDirection() == Direction.NORTH
                || a.getDirection() == Direction.SOUTH)
                a.draw(canvas, space_y);
            else
                a.draw(canvas, space_x); */
        }

        context.lineWidth = 2;

        context.beginPath();
        context.strokeStyle = "#FF0000";
        context.arc(pts_x[model.start().x], pts_y[model.start().y], 7, 0.0, 2 * Math.PI, false);
        context.stroke();
        context.closePath();

        context.beginPath();
        context.strokeStyle = "#00FF00";
        context.arc(pts_x[model.end().x], pts_y[model.end().y], 7, 0.0, 2 * Math.PI, false);
        context.stroke();
        context.closePath();
    };

    var draw_grid = function (canvas) {
        var context = canvas[0].getContext("2d");
        var canvas_width = canvas[0].width;
        var canvas_height = canvas[0].height;

        context.lineWidth = 1.;
        context.strokeStyle = "#000000";
        context.fillStyle = "#ffffff";
        context.rect(0, 0, canvas_width, canvas_height);
        context.fill();
        context.stroke();
        compute_dimensions(canvas_width, canvas_height);

        context.strokeStyle = "#C0C0C0";
	    context.lineWidth = 1;

	    for (var i = 0; i < pts_x.length; ++i) {
            context.moveTo(pts_x[i], margin_y);
            context.lineTo(pts_x[i], height + margin_y);
	    }
	    for (var i = 0; i < pts_y.length; ++i) {
            context.moveTo(margin_x, pts_y[i]);
            context.lineTo(width + margin_x, pts_y[i]);
        }
        context.stroke();

        draw_grid_and_path(context);
    };

    var init_div = function (view) {
        build_path(view);
        build_spacing().appendTo(view);
        build_grid(view);
    };

// private attributes
    var module;
    var model;
    var controller;

    var ncolumn;
    var nline;
    var minSize;
    var maxSize;

    var pts_x;
    var pts_y;
    var margin_x;
    var margin_y;
    var width;
    var height;
    var space_x;
    var space_y;

    this.init(mdl, div, n, m, min, max);
};