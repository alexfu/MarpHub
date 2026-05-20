import { prisma } from '$lib/db';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/auth';

export const load: PageServerLoad = async () => {
  const presentations = await prisma.presentation.findMany();
  return { presentations };
};

export const actions = {
  default: async ({ request }) => {
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session) {
      return error(401);
    }

    const formData = await request.formData();

    const presentationFile = formData.get('presentation') as File;
    const presentationContent = await presentationFile.text();
    const presentation = await prisma.presentation.create({
      data: {
        title: formData.get('title') as string,
        content: presentationContent,
        user: {
          connect: {
            id: session.user.id
          }
        }
      }
    });

    return redirect(302, `/presentations/${presentation.id}`);
  }
} satisfies Actions;
