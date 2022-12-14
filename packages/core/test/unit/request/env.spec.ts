/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import supertest from 'supertest';
import { createHandler } from '../../handler';
import {
    send,
    setRequestEnv,
    unsetRequestEnv,
    useRequestEnv,
} from '../../../src';

describe('src/helpers/request/env', () => {
    it('set & get env param', async () => {
        const server = supertest(createHandler((req, res) => {
            setRequestEnv(req, 'bar', 'baz');
            setRequestEnv(req, 'foo', 'bar');

            send(res, useRequestEnv(req, 'foo'));
        }));

        const response = await server
            .get('/');

        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual('bar');
    });

    it('set set & get env object', async () => {
        const server = supertest(createHandler((req, res) => {
            setRequestEnv(req, {
                foo: 'bar',
                bar: 'baz',
            });

            send(res, useRequestEnv(req));
        }));

        const response = await server
            .get('/');

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            foo: 'bar',
            bar: 'baz',
        });
    });

    it('should append env to request', async () => {
        const server = supertest(createHandler((req, res) => {
            setRequestEnv(req, {
                foo: 'bar',
            });

            setRequestEnv(req, {
                bar: 'baz',
            }, true);

            send(res, useRequestEnv(req));
        }));

        const response = await server
            .get('/');

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            foo: 'bar',
            bar: 'baz',
        });
    });

    it('should overwrite env of request', async () => {
        const server = supertest(createHandler((req, res) => {
            setRequestEnv(req, {
                foo: 'bar',
            });

            setRequestEnv(req, {
                bar: 'baz',
            });

            send(res, useRequestEnv(req));
        }));

        const response = await server
            .get('/');

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            bar: 'baz',
        });
    });

    it('should unset env of request', async () => {
        const server = supertest(createHandler((req, res) => {
            setRequestEnv(req, {
                foo: 'bar',
                bar: 'baz',
            });

            unsetRequestEnv(req, 'foo');

            send(res, useRequestEnv(req));
        }));

        const response = await server
            .get('/');

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            bar: 'baz',
        });
    });

    it('should use request env', async () => {
        const server = supertest(createHandler((req, res) => {
            send(res, useRequestEnv(req));
        }));

        const response = await server
            .get('/');

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({});
    });
});
