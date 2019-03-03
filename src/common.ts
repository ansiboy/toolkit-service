export let constants = {
    dbNotFound: 'NotFoundError'
}

export let baseUrl = "/tool"

export function setBaseUrl(value: string) {
    baseUrl = value
}