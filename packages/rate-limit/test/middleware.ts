/*
 * Copyright (c) 2022-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { Handler } from '@routup/core';
import { RequestListener } from 'http';

export function createMiddleware(handler: Handler) : RequestListener {
    return (req, res) => {
        handler(req, res, () => {
            res.end();
        });
    };
}
