import { resolve } from '$app/paths';
import { auth } from '$lib/auth.js';
import { redirect } from '@sveltejs/kit';
import { APIError } from 'better-auth';

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    try {
      await auth.api.signInEmail({
        body: {
          email: formData.get('email') as string,
          password: formData.get('password') as string
        },
        headers: request.headers
      });
      return redirect(303, resolve('/'));
    } catch (error) {
      if (error instanceof APIError) {
        return { error: error.message };
      }
      throw error;
    }
  }
};
