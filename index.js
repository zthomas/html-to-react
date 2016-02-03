'use strict';

var parser = require('./lib/parser');
var processingInstructions = require('./lib/processing-instructions');
var isValidNodeDefinitions = require('./lib/is-valid-node-definitions');
var processNodeDefinitions = require('./lib/process-node-definitions');

function createReactComponentsFactory(React) {
    return function createReactComponents(tree) {
        if (tree instanceof Array)
            return tree.map(child => createReactComponents(child))

        if (!tree || typeof tree === 'string')
            return tree

        if (typeof tree === 'object' && tree.type) {
            var children = tree.children

            if (children && children.tagName) {
                children = createReactComponents(tree.children)
            } else if (children instanceof Array) {
                children = children.map(child => createReactComponents(child))
            }

            return React.createElement(tree.type, tree.props, children)
        }

        throw 'react structure objects must have a type', tree
    }
}


module.exports = {
    Parser: parser,
    createReactComponents: createReactComponentsFactory,
    ProcessingInstructions: processingInstructions,
    IsValidNodeDefinitions: isValidNodeDefinitions,
    ProcessNodeDefinitions: processNodeDefinitions
};

