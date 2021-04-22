
/**
 * 非递归深度优先遍历
 * @param {树节点} node 
 */
export function TreeNonRecursiveDepthFirstTraversal(node) {
  if(!node) {
    throw "invalid node";
  }
	if (!node.children || node.children.length == 0) { 
    return [node]; 
  }
  let _stack = []; // 借助一个栈
  let _nodes = [];
	_stack.unshift(node);
	while (_stack.length) {
		let _curNode = _stack.shift(); // 推出栈顶元素
    _nodes.push(_curNode);
		if (_curNode.children && _curNode.children.length) {
			_stack = _curNode.children.concat(_stack);
		}
  }
  return _nodes;
}