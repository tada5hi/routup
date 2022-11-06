/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {
    Key, ParseOptions, TokensToRegexpOptions, pathToRegexp,
} from 'path-to-regexp';
import { PathMatcherExecResult } from './type';

function decodeParam(val: unknown) {
    if (typeof val !== 'string' || val.length === 0) {
        return val;
    }

    return decodeURIComponent(val);
}

export class PathMatcher {
    path: string;

    regexp : RegExp;

    regexpKeys : Key[] = [];

    regexpOptions: TokensToRegexpOptions & ParseOptions;

    constructor(path: string, options?: TokensToRegexpOptions & ParseOptions) {
        this.path = path;
        this.regexpOptions = options || {};
        this.regexp = pathToRegexp(path, this.regexpKeys, options);
    }

    test(path: string) {
        const fastSlash = this.path === '/' && this.regexpOptions.end === false;
        if (fastSlash) {
            return true;
        }

        return this.regexp.test(path);
    }

    exec(path: string) : PathMatcherExecResult | undefined {
        let match : RegExpExecArray | null = null;

        const fastSlash = this.path === '/' && this.regexpOptions.end === false;
        if (fastSlash) {
            return {
                path: '/',
                params: {},
            };
        }

        match = this.regexp.exec(path);

        if (!match) {
            return undefined;
        }

        const output : Record<string, unknown> = {};

        for (let i = 1; i < match.length; i++) {
            const key = this.regexpKeys[i - 1];
            const prop = key.name;
            const val = decodeParam(match[i]);

            if (typeof val !== 'undefined') {
                output[prop] = val;
            }
        }

        return {
            path: match[0],
            params: output,
        };
    }
}
