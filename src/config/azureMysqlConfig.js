import fs from 'fs';

const host = process.env.AZURE_MYSQL_HOST;
const user = process.env.AZURE_MYSQL_USER;
const password = process.env.AZURE_MYSQL_PASSWORD;

export const azureMysqlConfig = {
    host: host,
    port : 3306,
    user: user,
    password: password,
    database: 'face_recognition_app',
    ssl: {ca: fs.readFileSync('src/util/certificates/BaltimoreCyberTrustRoot.crt.pem')}
}
