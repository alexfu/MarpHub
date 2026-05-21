import { auth } from '$lib/auth';
import { signInRedirect } from '$lib/auth/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return signInRedirect(request);
  }
};
