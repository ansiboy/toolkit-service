import { setBaseUrl } from './common';

export = function init(baseUrl?: string) {
    if (baseUrl)
        setBaseUrl(baseUrl)

    require('./modules/unique-number')
    require('./modules/small-data')
}