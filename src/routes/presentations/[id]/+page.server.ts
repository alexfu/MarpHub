import { prisma } from '$lib/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/auth';

export const load: PageServerLoad = async ({ request, params }) => {
  const session = await auth.api.getSession({ headers: request.headers });
  const presentation = await prisma.presentation.findFirst({
    where: { id: params.id },
    include: { user: { select: { name: true } } }
  });
  if (!presentation) {
    return error(404, 'Not found');
  }
  return { presentation, isOwner: session?.user.id == presentation.userId };
};
