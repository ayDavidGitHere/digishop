"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error404 = function (_req, res, _next) {
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });
};
exports.default = module.exports = {
    error404: error404,
};
