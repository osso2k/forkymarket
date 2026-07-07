declare module "finnhub" {
    export class DefaultApi {
        constructor(apiKey: string)
        marketNews(
            category: string,
            opts: { minId?: number },
            callback: (error: unknown, data: unknown, response: unknown) => void
        ): void
        newsSentiment(
            symbol: string,
            callback: (error: unknown, data: unknown, response: unknown) => void
        )
        socialSentiment(
            symb:string,
            callback: (error: unknown, data: unknown) => void
        )
    }

    const finnhub: { DefaultApi: typeof DefaultApi }
    export default finnhub
}
