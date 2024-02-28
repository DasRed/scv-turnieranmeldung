import mysql from 'mysql2/promise';
/*
'schema' => array(
        'create schema scvierkirchen_registration',
        '
            create table registration(
                id          int auto_increment,
                created_at  datetime default current_timestamp    not null,
                age         ENUM (\'U7\', \'U8\', \'U9\', \'U10\', \'U11\') not null,
                association varchar(1024)                         not null,
                team        varchar(10124)                        not null,
                coach       varchar(1024)                         not null,
                email       varchar(1024)                         not null,
                phone       varchar(1024)                         not null,
                constraint registration_id_pk primary key (id)
            )
        ',
    ),
    'insert' => '
        INSERT INTO registration
        SET age = :age,
            association = :association,
            team = :team,
            coach = :coach,
            email = :email,
            phone = :phone,
    ',
 */
export default async function creator(config) {
    /** @type {mysql.Connection} */
    let db;

    async function reconnect() {
        db = await mysql.createConnection(config.db);

        //language=MySQL
        await db.query(`SET group_concat_max_len = 1024 * 1024 * 1024`);
        //language=MySQL
        await db.query(`SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`);
    }

    await reconnect();

    // wait_timeout variable of mysql is 8h, so ping every 7h
    setInterval(async () => {
        try {
            console.log(`${new Date().toJSON()} Sending ping to mysql server`);
            await db.ping();
        }
        catch (error) {
            console.error('DB Ping failed', error);
        }
    }, 7 * 60 * 60 * 1000);

    return {
        /**
         *
         * @param {string} sql
         * @param {*[]} [values]
         * @returns {Promise<mysql.Query>}
         */
        async query(sql, values) {
            try {
                return db.query(sql, values);
            }
            catch (error) {
                if (error.message.includes('Can\'t add new command when connection is in closed state')) {
                    await reconnect();
                    return db.query(sql, values);
                }
                throw error;
            }
        },

        /**
         *
         * @param {string} sql
         * @param {*[]} [values]
         * @returns {Promise<mysql.Query>}
         */
        async execute(sql, values) {
            try {
                return db.execute(sql, values);
            }
            catch (error) {
                if (error.message.includes('Can\'t add new command when connection is in closed state')) {
                    await reconnect();
                    return db.execute(sql, values);
                }
                throw error;
            }
        },
    };
}
