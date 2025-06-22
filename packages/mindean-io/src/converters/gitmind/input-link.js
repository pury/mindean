import TreeNode from '../../core/data/TreeNode';

function build(content) {  
    function traverse(node) {  
        const treeNode = new TreeNode({
            title: node.data.text || node.data.html
        });

        if (node.children && node.children.length) {  
            treeNode.children = node.children.map(childNode => traverse(childNode));  
        }  

        return treeNode;  
    }  

    return traverse(content);
}  

/**
 * GitMind分享链接数据解析器
 */
export default (options) => {
    return new Promise((resolve, reject) => { 
        try {
            const data = options.data;
            const rootData = build(data.root);
            const sourceData = { rootData };
            resolve(sourceData);
        }
        catch (e) {
            reject(e);
        }
    });
}