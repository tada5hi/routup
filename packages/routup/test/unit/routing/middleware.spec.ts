/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { send, setRequestEnv, useRequestEnv } from '@routup/core';
import supertest from 'supertest';
import {
    Next, Request, Response, Router,
} from '../../../src';

describe('routing/middleware', () => {
    it('should use middleware', async () => {
        const router = new Router();

        router.use((req, res, next) => {
            setRequestEnv(req, 'foo', 'bar');

            next();
        });

        router.get('/', (req, res) => {
            send(res, useRequestEnv(req, 'foo'));
        });

        const server = supertest(router.createListener());

        const response = await server
            .get('/');

        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual('bar');
    });

    it('should use error middleware', async () => {
        const router = new Router();

        router.get('/', (req, res) => {
            throw new Error('ero');
        });

        router.use((err: Error, req: Request, res: Response, next: Next) => {
            send(res, err.message);
        });

        const server = supertest(router.createListener());

        const response = await server
            .get('/');

        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual('ero');
    });

    it('should use middleware on specific path', async () => {
        const router = new Router();

        router.use('/foo', (req, res, next) => {
            setRequestEnv(req, 'foo', 'bar');

            next();
        });

        router.get('/', (req, res) => {
            send(res, useRequestEnv(req, 'foo'));
        });

        router.get('/foo', (req, res) => {
            send(res, useRequestEnv(req, 'foo'));
        });

        router.get(
            '/bar',
            (req, res, next) => {
                setRequestEnv(req, 'bar', 'baz');
                next();
            },
            (req, res) => {
                send(res, useRequestEnv(req, 'bar'));
            },
        );

        const server = supertest(router.createListener());

        let response = await server
            .get('/');

        expect(response.statusCode).toEqual(200);
        expect(response.text).toBeFalsy();

        response = await server
            .get('/foo');

        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual('bar');

        response = await server
            .get('/bar');

        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual('baz');
    });
});
