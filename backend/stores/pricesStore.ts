

let latestPrices : Record<string, {price: string; changePct: string; volume: string}> = {}

export const getPrices = () => {
    return latestPrices
}
export const setPrices = (p: typeof latestPrices) => {
    latestPrices = p
}