import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	console.log('hi from +page.server.ts');
	return {};
};
