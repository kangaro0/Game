"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Route;
(function (Route) {
    class Index {
        index(req, res, next) {
            res.render('index');
        }
    }
    Route.Index = Index;
})(Route || (Route = {}));
exports.Route = Route;
