import { redirect } from '@sveltejs/kit';
import { json } from '@sveltejs/kit'

export const GET = async (event) => {


    throw redirect(303, "/home");
};