import dotenv from 'dotenv';
dotenv.config();
import { startSequelize  } from './models';
import * as admin from 'firebase-admin';
import app from './app';
import envs from './models/configDBs'
import { Bar } from './models/B.model';
import { Info } from './models/A.model';
const PORT = process.env.PORT;
admin.initializeApp()

const envRunning = process.env.ENVIRONMENT === 'testing' ? envs.test  : envs.dev  

app.listen(PORT, async () => {
    try {
        const sequelize = startSequelize(envRunning.database, envRunning.passwd, envRunning.host, envRunning.username);
        await sequelize.sync({ force: true });
        const infoA = await Info.create({text: 'Hola'})
        const barA = await Bar.create({desc: 'Hola'});
        console.log(await infoA.setBar(barA))
        console.log(await (await infoA.getBar()).desc)
        console.info('DB and Express server is up and running!!!!')
        console.info(process.env.ENVIRONMENT)
    } catch (error) {
        console.error(error);
        process.abort();
    }
})