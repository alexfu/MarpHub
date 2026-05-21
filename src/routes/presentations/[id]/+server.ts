import { auth } from '$lib/auth';
import { prisma } from '$lib/db';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ request, params }) => {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return error(401);
  }

  await prisma.presentation.delete({ where: { id: params.id, userId: session.user.id } });

  return new Response();
};
