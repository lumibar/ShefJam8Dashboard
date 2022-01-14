import { getEvents, getStartTime } from "$lib/events";
import type { ServerRequest } from "@sveltejs/kit/types/hooks";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(request : ServerRequest) {
    const events = (await getEvents(parseInt(request.url.searchParams.get("limit")), request.url.searchParams.getAll('field')));
    return {
        body : events
    }
}