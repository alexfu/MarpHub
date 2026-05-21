import { resolve } from '$app/paths';
import { redirect } from '@sveltejs/kit';

export const signInRedirect = (request: Request) => {
  const callbackPath = new URL(request.url).pathname;
  return redirect(302, resolve(`/sign-in?next=${callbackPath}`));
};

export const parseNextParam = (request: Request) => {
  const url = new URL(request.url);
  const next = url.searchParams.get('next');
  if (next && next.startsWith('/')) {
    return next;
  }
  return null;
};
