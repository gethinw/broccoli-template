/**
 * An adjustment of joliss/broccoli-template to add support for precompiling templates
 */

var jsStringEscape = require('js-string-escape');
var Filter = require('broccoli-filter');

module.exports = TemplateFilter;
TemplateFilter.prototype = Object.create(Filter.prototype);
TemplateFilter.prototype.constructor = TemplateFilter;

function TemplateFilter (inputTree, options) {
    if (!(this instanceof TemplateFilter)) return new TemplateFilter(inputTree, options);
    this.inputTree = inputTree;
    this.options = options;
    this.extensions = options.extensions;
    this.compileFunction = options.compileFunction || '';
}

TemplateFilter.prototype.targetExtension = 'js';

TemplateFilter.prototype.processString = function (string) {
    var retVal = 'export default ';
    if (this.options.precompile) {
        retVal += this.options.precompile(string);
    } else {
        retVal += this.compileFunction;
        retVal += '("' + jsStringEscape(string) + '");';
    }
    return retVal + '\n';
};
