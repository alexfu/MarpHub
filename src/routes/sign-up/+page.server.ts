import { auth } from '$lib/auth';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    await auth.api.signUpEmail({
      body: {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        name: formData.get('name') as string
      }
    });

    return redirect(303, '/');
  }
} satisfies Actions;
