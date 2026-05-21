import { auth } from '$lib/auth';
import { signInRedirect } from '$lib/auth/utils';
import { prisma } from '$lib/db.js';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { resolve } from '$app/paths';

export const load: PageServerLoad = async ({ request }) => {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return signInRedirect(request);
  }
};

export const actions = {
  default: async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    const formData = await request.formData();
    const presentation = await prisma.presentation.create({
      data: {
        title: formData.get('title') as string,
        content: await (formData.get('file') as File).text(),
        user: {
          connect: {
            id: session?.user.id
          }
        }
      }
    });
    return redirect(302, resolve(`/presentations/${presentation.id}`));
  }
};
