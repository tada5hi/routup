/*
 * Copyright (c) 2022-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import etag from 'etag';
import { isObject, merge } from 'smob';
import { EtagFn, EtagOptions } from './type';

export function buildEtagFn(input?: boolean | EtagOptions | EtagFn) : EtagFn {
    if (typeof input === 'function') {
        return input;
    }

    input = input ?? true;

    if (input === false) {
        return () => undefined;
    }

    let options : EtagOptions = {
        weak: true,
    };

    if (isObject(input)) {
        options = merge(input, options);
    }

    return (body: any, encoding?: BufferEncoding, size?: number) => {
        const buff = Buffer.isBuffer(body) ?
            body :
            Buffer.from(body, encoding);

        if (typeof options.threshold !== 'undefined') {
            size = size ?? Buffer.byteLength(buff);

            if (size <= options.threshold) {
                return undefined;
            }
        }

        return etag(buff, options);
    };
}
