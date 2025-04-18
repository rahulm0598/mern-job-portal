import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("DB CONNECTED");
}
 catch (error) {
    console.error(error);
}
};
