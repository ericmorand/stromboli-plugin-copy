const Plugin = require('..');
const RenderResult = require('../node_modules/stromboli/lib/render-result.js');
const test = require('tap').test;
const path = require('path');
const fs = require('fs');

test('render', function (t) {
    var plugin = new Plugin();

    t.plan(4);

    var renderResult = new RenderResult();

    return plugin.render(path.resolve('test/render/valid/dummy.txt'), renderResult).then(
        function (renderResult) {
            t.equal(renderResult.getDependencies().size, 1);
            t.equal(renderResult.getBinaries().length, 1);
            t.equal(renderResult.getBinaries()[0].name, 'dummy.txt');
            t.equal(renderResult.getBinaries()[0].data, 'Dummy');
        },
        function (err) {
            t.fail(err);
        }
    );
});

test('render with error', function (t) {
    var plugin = new Plugin();

    t.plan(1);

    var renderResult = new RenderResult();

    return plugin.render(path.resolve('test/render/missing/dummy.txt'), renderResult).then(
        function (renderResult) {
            t.fail();
        },
        function (err) {
            t.pass(err);
        }
    );
});