import { generate } from '../../utils/uuid';

/**
 * Tree node class representing a single node in a mind map structure.
 */
export default class TreeNode {
    /**
     * Initialize tree node with title and optional ID.
     */
    constructor(opts) {
        this.title = opts.title || '';
        this.id = opts.id || generate();
        this.children = [];
    }

    /**
     * Add a child node to this node.
     */
    addChild(child) {
        if (child instanceof TreeNode) {
            this.children.push(child);
        } else {
            throw new Error('Child must be an instance of TreeNode');
        }
    }

    /**
     * Remove a child node by ID.
     */
    removeChild(childId) {
        this.children = this.children.filter(child => child.id !== childId);
    }

    /**
     * Update a child node's title by ID.
     */
    updateNode(childId, newTitle) {
        const childIndex = this.children.findIndex(child => child.id === childId);
        if (childIndex !== -1) {
            this.children[childIndex].title = newTitle;
        } else {
            throw new Error(`Child with ID ${childId} not found`);
        }
    }

    /**
     * Find and return a child node by ID.
     */
    findChild(childId) {
        return this.children.find(child => child.id === childId);
    }
}