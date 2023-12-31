//database connectivity
/******************** */
//try connection of database using 127.0.0.1 or 0.0.0.0 or localhost/27017, if encounterd issue*/
/***************** */
const mongoose=require('mongoose')
const Campground=require('../models/campground')
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp',{
    useNewUrlParser:true,
    //useCreateIndex:true,
    useUnifiedTopology:true

});

const db=mongoose.connection;
db.on("error",console.error.bind(console, "connection error"));
db.once("open",()=>{
    console.log("Database connected");
});

//importing files from another directory
const cities=require("./cities")
const {places,descriptors}=require('./seedHelpers')
const sample=array=>array[Math.floor(Math.random()*array.length)];

const seedDB= async()=>{
    await Campground.deleteMany({});//deletes everything existed before
    // const c=new Campground({title:'purple flied'});
    // await c.save();
    for(let i=0;i<50;i++){
        const random1000=Math.floor(Math.random()*1000)
        const price=Math.floor(Math.random()*20)+1;
    
    const camp=new Campground({
        location:`${cities[random1000].city},${cities[random1000].state}`,
        title:`${sample(descriptors)},${sample(places)}`,
        // image:'https://source.unsplash.com/collections/483251',
        description:'hfksbhfhdfgh fhbg jdfgbdfka omka  yiur ilove fdkfnvkf fd',
        price
    })
    await camp.save();
}

}
seedDB().then(()=>{
    mongoose.connection.close();

});