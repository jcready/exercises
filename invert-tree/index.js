module.exports = function invertTree(tree) {
  if (!(tree && tree.hasOwnProperty('value'))) return tree;
  var inverse = { value: tree.value };
  if (tree.left) inverse.right = invertTree(tree.left);
  if (tree.right) inverse.left = invertTree(tree.right);
  return inverse;
}
