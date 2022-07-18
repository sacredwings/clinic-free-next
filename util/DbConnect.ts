import { DB }  from "social-framework"

export default async function () {
    //конект
    const dbName = 'clinic'
    const url = 'mongodb://root:A28392839@127.0.0.1:27017/?authSource=admin'

    //подключение к базе
    DB.Client = await new DB().Init(url, dbName)
    /*
    if (DB.Client)
        console.log('Connected successfully to server')*/
}