import { prisma } from '$lib/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const user = await prisma.user.findFirst({ where: { id: params.id } });
  if (!user) {
    return error(404);
  }
  const presentations = await prisma.presentation.findMany({ where: { userId: params.id } });
  return { user, presentations };
};
