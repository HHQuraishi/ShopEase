const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGOURI);

        console.log(`MongoDB Connected! Host: ${conn.connection.host}`);
    }
    catch(error){
        console.error(`DB Error: ${error.message}`);

        process.exit(1);
    }
};

module.exports = connectDB;