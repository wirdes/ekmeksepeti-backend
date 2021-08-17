const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database bağlantısı başarılı");
    })
    .catch((err) => {
      console.error(`Database bağlantısı başarısız\n ${err}`);
    });
};

module.exports = connectDatabase;