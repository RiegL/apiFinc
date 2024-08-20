let conn;

const knexService = () =>{
    if(!conn){
        conn = ''; //TODO connect db
    }
    return conn;
};

export default knexService;