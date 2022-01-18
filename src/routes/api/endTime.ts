import { getEndTime } from '$lib/events'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
    const end_time = await getEndTime();
    return {
        body : {
            end_time
        }
    }
}