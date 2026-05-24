import { auth } from '$lib/auth';
import { signInRedirect } from '$lib/auth/utils';
import { prisma } from '$lib/db.js';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { resolve } from '$app/paths';
import { Marp } from '@marp-team/marp-core';

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

    const content = await (formData.get('file') as File).text();
    const contentHead = marpHead(content);

    const presentation = await prisma.presentation.create({
      data: {
        title: formData.get('title') as string,
        content: await (formData.get('file') as File).text(),
        previewHtml: renderPreview(contentHead),
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

const renderPreview = (markdown: string) => {
  const { html, css } = new Marp().render(markdown);
  return `<!DOCTYPE html><html><head><style>html,body { margin: 0; overflow: hidden; } ${css}</style></head><body>${html}</body></html>`;
};

const marpHead = (input: string) => {
  const lines: string[] = [];
  let separatorCount = 0;
  const inputLines = input.split('\n');

  for (const line of inputLines) {
    if (line === '---') {
      separatorCount += 1;
    }
    if (separatorCount < 3) {
      lines.push(line);
    }
    if (separatorCount == 3) {
      break;
    }
  }

  return lines.join('\n');
};
