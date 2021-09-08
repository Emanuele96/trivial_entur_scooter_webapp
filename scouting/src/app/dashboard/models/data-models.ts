export interface Variables {
    lat : number,
    lon: number,
    range: number,
    count: number
}

export interface Scooter {
    lat: number,
    long: number,
    company: string,
    currentRangeMeters:number,
    isReserved: boolean,
    isDisabled: boolean
}

