import { auth } from '$lib/auth';
import { redirect } from '@sveltejs/kit';

export async function POST({ request }): Promise<void> {
  await auth.api.signOut({ headers: request.headers });
  throw redirect(303, '/');
}
