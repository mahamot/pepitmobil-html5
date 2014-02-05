p1.divers.trajet.Direction = { };
p1.divers.trajet.Direction.NORTH = 0;
p1.divers.trajet.Direction.EAST = 1;
p1.divers.trajet.Direction.SOUTH = 2;
p1.divers.trajet.Direction.WEST = 3;
p1.divers.trajet.Direction.UNDEFINED = 4;

p1.divers.trajet.Segment = function (pt, dir) {

    this.getDirection = function () {
        return direction;
    };

    this.getDestination = function () {
        return destination(origin, direction);
    };

    this.getOrigin = function () {
        return origin;
    };

// private methods
    var destination = function (pt, dir) {
        var dest_x = -1;
        var dest_y = -1;

        if (dir == p1.divers.trajet.Direction.SOUTH) {
            dest_x = pt.x;
            dest_y = pt.y + 1;
        } else if (dir == p1.divers.trajet.Direction.NORTH) {
            dest_x = pt.x;
            dest_y = pt.y - 1;
        } else if (dir == p1.divers.trajet.Direction.EAST) {
            dest_x = pt.x + 1;
            dest_y = pt.y;
        } else { // WEST
            dest_x = pt.x - 1;
            dest_y = pt.y;
        }
        return { x: dest_x, y: dest_y };
    };

    var init = function (pt, dir) {
        origin = pt;
        direction = dir;
    };

// private attributes
    var origin;
    var direction;

    init(pt, dir);
};

p1.divers.trajet.Model = function (n, m, min, max) {

    this.check = function (list) {
        var i = 0;

        while (i < path.length || i < list.length) {
            if (path[i].getDirection() != list[i])
                return false;
            i++;
        }
        return true;
    };

    this.end = function () {
        return end;
    };

    this.get = function (i) {
        return path[i];
    };

    this.size = function () {
        return path.length;
    };

    this.start = function () {
        return start;
    };

// private attributes
    var belongPath = function (pt) {
        var i = 0;
        var found = false;

        while (i < path.length && !found) {
            found = path[i].getOrigin().x == pt.x && path[i].getOrigin().y == pt.y;
            ++i;
        }
        return found;
    };

    var build = function () {
        path = [ ];
        do {
            var i = 0;

            buildEnd(buildStart());
            do {
                var ok = true;

                path = [ ];
                buildFirst();
                while (ok && !isCompletePath()) {
                    ok = increasePath();
                }
                i++;
            } while (!isCompletePath() && i < 10);
        } while (!isCompletePath()
            || !(path.length >= minSize && path.length <= maxSize));
    };

    var buildFirst = function () {
        if (start.x == 0) { // WEST
            path.push(new p1.divers.trajet.Segment({x: start.x, y: start.y},
                p1.divers.trajet.Direction.EAST));
        } else if (start.x == ncolumn - 1) { // EAST
            path.push(new p1.divers.trajet.Segment({x: start.x, y: start.y},
                p1.divers.trajet.Direction.WEST));
        } else if (start.y == 0) { // NORTH
            path.push(new p1.divers.trajet.Segment({x: start.x, y: start.y},
                p1.divers.trajet.Direction.SOUTH));
        } else { // SOUTH
            path.push(new p1.divers.trajet.Segment({x: start.x, y: start.y},
                p1.divers.trajet.Direction.NORTH));
        }
    };

    var buildEnd = function (c_start) {
        var c_end = (c_start + Math.floor(Math.random() * 3) + 1) % 4;
        var x_end = -1;
        var y_end = -1;

        if (c_end == 0) { // NORTH
            x_end = Math.floor(Math.random() * (ncolumn - 2)) + 1;
            y_end = 0;
        } else if (c_end == 1) { // EAST
            x_end = ncolumn - 1;
            y_end = Math.floor(Math.random() * (nline - 2)) + 1;
        } else if (c_end == 2) { // SOUTH
            x_end = Math.floor(Math.random() * (ncolumn - 2)) + 1;
            y_end = nline - 1;
        } else if (c_end == 3) { // WEST
            x_end = 0;
            y_end = Math.floor(Math.random() * (nline - 2)) + 1;
        }
        end = { x: x_end, y: y_end };
    };

    var buildStart = function () {
        var c_start = Math.floor(Math.random() * 4);
        var x_start = -1;
        var y_start = -1;

        if (c_start == 0) { // NORTH
            x_start = Math.floor(Math.random() * (ncolumn - 2)) + 1;
            y_start = 0;
        } else if (c_start == 1) { // EAST
            x_start = ncolumn - 1;
            y_start = Math.floor(Math.random() * (nline - 2)) + 1;
        } else if (c_start == 2) { // SOUTH
            x_start = Math.floor(Math.random() * (ncolumn - 2)) + 1;
            y_start = nline - 1;
        } else if (c_start == 3) { // WEST
            x_start = 0;
            y_start = Math.floor(Math.random() * (nline - 2)) + 1;
        }
        start = { x: x_start, y: y_start };
        return c_start;
    };

    var destination = function (pt, dir) {
        var dest_x = -1;
        var dest_y = -1;

        if (dir == p1.divers.trajet.Direction.SOUTH) {
            dest_x = pt.x;
            dest_y = pt.y + 1;
        } else if (dir == p1.divers.trajet.Direction.NORTH) {
            dest_x = pt.x;
            dest_y = pt.y - 1;
        } else if (dir == p1.divers.trajet.Direction.EAST) {
            dest_x = pt.x + 1;
            dest_y = pt.y;
        } else { // WEST
            dest_x = pt.x - 1;
            dest_y = pt.y;
        }
        return { x: dest_x, y: dest_y };
    };

    var increasePath = function () {
        var a = path[path.length - 1];
        var begin = a.getDestination();
        var directions = [ ];
        var i = 0;

        if (a.getDirection() !=  p1.divers.trajet.Direction.EAST
            && (begin.x > 1 || (begin.x == 1 && end.x == 0 && end.y == begin.y))) {
            if (!belongPath(destination(begin, p1.divers.trajet.Direction.WEST))) {
                directions[i] = p1.divers.trajet.Direction.WEST;
                i++;
            }
        }
        if (a.getDirection() != p1.divers.trajet.Direction.WEST
            && (begin.x < ncolumn - 2 || (begin.x == ncolumn - 2
            && end.x == ncolumn - 1 && end.y == begin.y))) {
            if (!belongPath(destination(begin, p1.divers.trajet.Direction.EAST))) {
                directions[i] = p1.divers.trajet.Direction.EAST;
                i++;
            }
        }
        if (a.getDirection() != p1.divers.trajet.Direction.SOUTH
            && (begin.y > 1 || (begin.x == 1 && end.y == 0 && end.x == begin.x))) { // NORTH
            if (!belongPath(destination(begin, p1.divers.trajet.Direction.NORTH))) {
                directions[i] = p1.divers.trajet.Direction.NORTH;
                i++;
            }
        }
        if (a.getDirection() != p1.divers.trajet.Direction.NORTH
            && (begin.y < nline - 2 || (begin.y == nline - 2
            && end.y == nline - 1 && end.x == begin.x))) { // SOUTH
            if (!belongPath(destination(begin, p1.divers.trajet.Direction.SOUTH))) {
                directions[i] = p1.divers.trajet.Direction.SOUTH;
                i++;
            }
        }
        if (i > 0) {
            var new_dir = directions[Math.floor(Math.random() * i)];
            var b = new p1.divers.trajet.Segment(a.getDestination(), new_dir);

            path.push(b);
            return true;
        } else {
            return false;
        }
    };

    var init = function (n, m, min, max) {
        ncolumn = n;
        nline = m;
        minSize = min;
        maxSize = max;
        build();

        for(var i = 0; i < path.length; ++i) {
            console.log('(' + path[i].getOrigin().x + ',' + path[i].getOrigin().y + ') -> ' +
                path[i].getDirection());
        }

    };

    var isCompletePath = function () {
        return path.length > 0 &&
            path[path.length - 1].getDestination().x == end.x &&
            path[path.length - 1].getDestination().y == end.y;
    };

    var ncolumn;
    var nline;
    var minSize;
    var maxSize;

    var path;
    var start;
    var end;

    init(n, m, min, max);
};