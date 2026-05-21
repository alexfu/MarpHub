import { prisma } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const presentations = await prisma.presentation.findMany({ include: { user: true } });
  return { presentations };
};
