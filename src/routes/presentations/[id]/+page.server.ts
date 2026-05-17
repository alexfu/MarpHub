import { prisma } from '$lib/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const presentation = await prisma.presentation.findFirst({ where: { id: params.id } });
  if (!presentation) {
    return error(404, 'Not found');
  }
  return { presentation };
};
