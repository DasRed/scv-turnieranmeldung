import Router from '@koa/router';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import creator from './db.js';

const config = {
    port: 7900,
    db:   {
        host:     '192.168.178.2',
        port:     3306,
        user:     'root',
        password: 'root',
        database: 'scvierkirchen_registration',
        charset:  'utf8',
    }
};

const db = await creator(config);

const router = new Router();
router.get('/healthcheck', async (ctx) => {
    const [[now]] = await db.query('SELECT NOW() as now');
    ctx.body      = now.now;
    ctx.status    = 200;
});

router.post('/api/v1/store', async (ctx) => {
    try {
        console.log(await db.execute(`
            INSERT INTO registration 
            SET age = ?,
                association = ?,
                team = ?,
                coach = ?,
                email = ?,
                phone = ?
        `, [
            ctx.request.body?.age ?? null,
            ctx.request.body?.association ?? null,
            ctx.request.body?.team ?? null,
            ctx.request.body?.coach ?? null,
            ctx.request.body?.email ?? null,
            ctx.request.body?.mobile ?? null,
        ]));
        ctx.status = 204;
    }
    catch (error) {
        ctx.status = 400;
        console.log(error);
    }
});

const app = new Koa();
app.use(bodyParser({jsonLimit: '20mb'}))
   .use(router.routes())
   .use(router.allowedMethods());

app.listen(config.port);
console.log(`SCV Trunieranmeldung API Server is listing at http://localhost:${config.port}`);
