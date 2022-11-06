/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import supertest from "supertest";
import {Router, send} from "../../../src";

describe('routing/paths', () => {
    it('should handle path', async () => {
        const router = new Router();

        router.get('/foo', async (req, res) => {
            send(res, '/foo');
        });

        router.get('/foo/bar/baz', async (req, res) => {
            send(res, '/foo/bar/baz');
        })

        const server = supertest(router.createListener());

        let response = await server
            .get('/foo');

        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual('/foo');

        response = await server
            .get('/foo/bar/baz');

        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual('/foo/bar/baz');
    })

    it('should handle path by mount path', async () => {
        const router = new Router({
            mountPath: '/foo'
        });

        router.get('/bar', async (req, res) => {
            send(res, '/foo/bar');
        });

        const server = supertest(router.createListener());

        let response = await server
            .get('/foo/bar');

        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual('/foo/bar');
    });

    it('should handle path for nested routers', async () => {
        const child = new Router({mountPath: '/bar'});

        child.get('/baz', async (req, res) => {
            send(res, '/foo/bar/baz');
        });

        const router = new Router({mountPath: '/foo'});
        router.use(child);

        const server = supertest(router.createListener());

        let response = await server
            .get('/foo/bar/baz');

        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual('/foo/bar/baz');
    })
});
