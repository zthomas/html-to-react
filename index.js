'use strict';

var parser = require('./lib/parser');
var processingInstructions = require('./lib/processing-instructions');
var isValidNodeDefinitions = require('./lib/is-valid-node-definitions');
var processNodeDefinitions = require('./lib/process-node-definitions');

function createReactComponentsFactory(React) {
    return function createReactComponents(tree) {
        if (!tree || typeof tree === 'string')

            if (tree instanceof Array) {
                return tree.map(child => createReactComponents(child))
            }

        if (typeof tree === 'object') {
            if (!tree.type)
                throw 'react structure objects must have a type'
            var children = tree.children

            if (children && children.tagName) {
                children = createReactComponents(tree.children)
            } else if (children instanceof Array) {
                children = children.map(child => createReactComponents(child))
            }

            return React.createElement(tree.type, tree.props, children)
        }

        return tree
    }
}


module.exports = {
    Parser: parser,
    createReactComponents: createReactComponentsFactory,
    ProcessingInstructions: processingInstructions,
    IsValidNodeDefinitions: isValidNodeDefinitions,
    ProcessNodeDefinitions: processNodeDefinitions
};

