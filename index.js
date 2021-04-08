'use strict';

/*
 * Dependencies
 */
const visit = require('unist-util-visit');
const select = require('hast-util-select');
const parseSelector = require('hast-util-parse-selector');

/*
 * Attacher
 */
module.exports = options => {
  options = options || {};
  const selector = options.selector || options.select || 'body';
  const wrapper = options.wrapper || options.wrap;
  const fallback = options.fallback !== undefined ? options.fallback : true;

  /*
   * Transformer
   */
  return tree => {
    if (typeof wrapper !== 'string') {
      throw new TypeError('Expected a `string` as wrapper');
    }

    if (typeof selector !== 'string') {
      throw new TypeError('Expected a `string` as selector');
    }

    if (typeof fallback !== 'boolean') {
      throw new TypeError('Expected a `boolean` as fallback');
    }

    const selected = select.select(selector, tree);
    const wrap = parseSelector(wrapper);

    if (selected) {
      visit(tree, selected, (node, i, parent) => {
        if (node.tagName === 'body') {
          wrap.children = node.children;
          node.children = [wrap];
        } else {
          wrap.children = [selected];
          parent.children[i] = wrap;
        }
      });
    } else if (fallback) {
      wrap.children = tree.children;
      tree.children = [wrap];
    }
  };
};
