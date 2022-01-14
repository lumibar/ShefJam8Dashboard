import timetable from '$lib/events/timetable.json'

export const getStartTime = async () => {
    return (timetable.start_time);
}

export const getEndTime = async () => {
    return (timetable.end_time);
}

export const getEvents = async (limit = 3, fields: string[]) => {
    if (fields.length === 0) return [];
    const events = timetable.events
    events.sort((a, b) => {
        const date1 = new Date(a.time)
        const date2 = new Date(b.time)
        return date1.getTime() - date2.getTime()
    })
    if (limit === 0) return events.map((event) => {
        let out = {}
        fields.forEach((field) => {
            out[field] = event[field]
        });
        return out
    })
    limit = limit < events.length ? limit : events.length - 1

    return events.slice(0, limit).map((event) => {
        let out = {}
        fields.forEach((field) => {
            out[field] = event[field]
        })
        return out
    });
}