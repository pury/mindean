/**
 * Main entry point for Mindean Drawing Editor application
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * Initialize and render the application
 */
function initializeApp() {
	const container = document.getElementById('root');
	const root = createRoot(container);

	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
}

/**
 * Start the application when DOM is ready
 */
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initializeApp);
} else {
	initializeApp();
}
