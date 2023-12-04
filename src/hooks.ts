import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { toast } from 'svoast';



export const handle: Handle = async ({ event, resolve }) => {



    // If not redirecting, allow the request to resolve normally
    const response = await resolve(event);
    return response;
};



