const databasePassword = process.env.LOCAL_DB_PASS;

export const localMysqlConfig = {
    host: '127.0.0.1',
    port : 3306,
    user: 'face-recognition-app_raynermdz',
    password: databasePassword,
    database: 'face_recognition_app'
}
