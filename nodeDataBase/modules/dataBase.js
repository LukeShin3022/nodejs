var mysql = require('mysql');
class dataBase{
    constructor(hostDB="localhost",dbUser="root",dbPass="",dbName="user_db"){
        this.dbConfig ={              
            host:hostDB,
            user:dbUser,
            password:dbPass,
            database:dbName
        }
    }
    dbConnect(){
        let con = mysql.createConnection(this.dbConfig);
        return con;
    }
    selectQuery(tableName,whereCalus = 1){
        let selectQuery = `SELECT * FROM ${tableName} WHERE ${whereCalus}`;
        return selectQuery;
    }
}
module.exports = new dataBase();