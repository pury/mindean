import TreeNode from '../../core/data/TreeNode';

function build(content) {  
    function traverse(node) {  
        const treeNode = new TreeNode({
            title: node.title || node.name || node.text || ''
        })

        if (node.children && node.children.length > 0) {  
            treeNode.children = node.children.map(childNode => traverse(childNode));  
        }  

        return treeNode;  
    }  

    return traverse(content);
}  

/**
 * 幕布分享链接数据解析器
 */
export default (options) => {
    return new Promise((resolve, reject) => { 
        try {
            const data = options.data;
            const content = data.content;
            const title = content.name;
            const definition = JSON.parse(content.definition);
            const rootData = new TreeNode({ title });

            definition.nodes.forEach(node => {
                rootData.children.push(build(node));
            })

            const sourceData = { rootData };
            resolve(sourceData);
        }
        catch (e) {
            reject(e);
        }
    });
}