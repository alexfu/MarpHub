import { prisma } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const presentationFile = formData.get('presentation') as File;
    const presentationContent = await presentationFile.text();
    const presentation = await prisma.presentation.create({
      data: {
        title: formData.get('title') as string,
        content: presentationContent,
        user: {
          connectOrCreate: {
            create: {
              username: 'alexfu'
            },
            where: {
              username: 'alexfu'
            }
          }
        }
      }
    });

    return redirect(302, `/presentations/${presentation.id}`);
  }
} satisfies Actions;
