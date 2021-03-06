export const safePaths = [
    "/archive",
    "/api"
]

export const currVersion = 8

export enum TimeUnits {
    MILLISECOND = 1,
    SECOND = MILLISECOND * 1000,
    MINUTE = SECOND * 60,
    HOUR = MINUTE * 60,
    DAY = HOUR * 24
}