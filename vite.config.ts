import { sveltekit } from '@sveltejs/kit/vite';
import {defineConfig, searchForWorkspaceRoot} from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    server: {
        fs: {
            allow: [
                // search up for workspace root
                searchForWorkspaceRoot(process.cwd()),
                // your custom rules
                '/path/to/custom/allow_directory',
                '/path/to/custom/allow_file.demo',
            ],
        },
    },
});
