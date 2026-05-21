import { auth } from '$lib/auth';
import { parseNextParam } from '$lib/auth/utils.js';
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
      const redirectPath = parseNextParam(request) || '/';
      return redirect(303, redirectPath);
    } catch (error) {
      if (error instanceof APIError) {
        return { error: error.message };
      }
      throw error;
    }
  }
};
