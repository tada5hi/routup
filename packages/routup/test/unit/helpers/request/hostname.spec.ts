/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import supertest from "supertest";
import {HeaderName, Router, send} from "../../../../src";
import {getRequestHostName} from "../../../../src/helpers/request/hostname";

describe('src/helpers/request/hostname', () => {
    it('should determine hostname', async () => {
        const router = new Router();

        router.get('/', async (req, res) => {
            send(res, getRequestHostName(req));
        });

        const server = supertest(router.createListener());

        await server
            .get('/')
            .set(HeaderName.HOST, 'example.com')
            .expect('example.com');

        await server
            .get('/')
            .set(HeaderName.HOST, 'example.com:3000')
            .expect('example.com');
    })

    it('should determine undefined hostname', async () => {
        const router = new Router();

        router.get('/', async (req, res) => {
            req.headers[HeaderName.HOST] = undefined;
            send(res, getRequestHostName(req));
        });

        const server = supertest(router.createListener());

        await server
            .get('/')
            .set(HeaderName.HOST, 'example.com')
            .expect('');
    })

    it('should determine hostname for IPv6', async () => {
        const router = new Router();

        router.get('/', async (req, res) => {
            send(res, getRequestHostName(req));
        });

        const server = supertest(router.createListener());

        await server
            .get('/')
            .set(HeaderName.HOST, '[::1]')
            .expect('[::1]');

        await server
            .get('/')
            .set(HeaderName.HOST, '[::1]:3000')
            .expect('[::1]');
    })

    it('should determine hostname with trust proxy', async () => {
        const router = new Router();

        router.get('/', async (req, res) => {
            send(res, getRequestHostName(req, {trustProxy: true}));
        });

        router.get('/not-trusted', async (req, res) => {
            send(res, getRequestHostName(req, {trustProxy: '10.1.10.0'}));
        });

        const server = supertest(router.createListener());

        await server
            .get('/')
            .set(HeaderName.HOST, 'localhost')
            .set(HeaderName.X_FORWARDED_HOST, 'example.com:3000')
            .expect('example.com');

        await server
            .get('/')
            .set(HeaderName.HOST, 'localhost')
            .set(HeaderName.X_FORWARDED_HOST, 'example.com, foobar.com')
            .expect('example.com');

        await server
            .get('/')
            .set(HeaderName.HOST, 'localhost')
            .set(HeaderName.X_FORWARDED_HOST, 'example.com:3000 , foobar.com:3000')
            .expect('example.com');

        await server
            .get('/not-trusted')
            .set(HeaderName.HOST, 'localhost')
            .set(HeaderName.X_FORWARDED_HOST, 'example.com:3000')
            .expect('localhost');
    })
})
