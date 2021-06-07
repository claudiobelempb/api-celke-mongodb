import mongoose from 'mongoose';

class DataBase {
  constructor() {
    this.mongoDataBase();
  }
  
  mongoDataBase(){
    mongoose.connect('mongodb://localhost/celke', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }).then(() => {
      console.log(`Connect com MongoDB realizer com success!`);
    }).catch((error) => {
      console.log(`Error: connect not realizer! ${error}`)
    });
  }
}

export default new DataBase();
