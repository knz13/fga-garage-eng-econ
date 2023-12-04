export const prerender = false;
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import type { LayoutLoad } from './$types'
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr'


import "../app.css";
import { redirect } from '@sveltejs/kit';
import { toast } from 'svoast';

const routesThatRequireLogin = [
    "/home",
    "/dashboards"

]

export const load: LayoutLoad = async ({ fetch, data, depends, url, route }) => {
    depends('supabase:auth')

    const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
            fetch,
        },
        cookies: {
            get(key) {
                if (!isBrowser()) {
                    return JSON.stringify(data)
                }

                const cookie = parse(document.cookie)
                return cookie[key]
            },
        },
    })




    return { supabase }
}