import ErrorResponse from '../common/ErrorResponse';
import TreeNode from '../core/data/TreeNode';
import { generate } from './uuid';

/**
 * Create an error response object.
 */
export const createError = (code, error) => {
	return new ErrorResponse(code, error)
}

/**
 * Create a tree node object.
 */
export const createTreeNode = (opts) => {
	return new TreeNode(opts);
}

/**
 * Create a unique identifier.
 */
export const createUUID = () => {
	return generate();
}