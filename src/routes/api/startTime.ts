import { getStartTime } from '$lib/events'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
    const start_time = (await getStartTime());
    return {
        body : {
            start_time
        }
    }
}