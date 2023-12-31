const express=require('express')
const app=express()
const path=require('path')
app.use(express.urlencoded({extended:true}))
const ejsMate=require('ejs-mate')//

//for patch,update and delete we need method-override
const methodOverride=require('method-override')
app.use(methodOverride('_method')) // string to be overridden
//database connectivity
/******************** */
//try connection of database using 127.0.0.1 or 0.0.0.0 or localhost/27017, if encounterd issue*/
/***************** */
const mongoose=require('mongoose')
const Campground=require('./models/campground')
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

//Starting the server at port 3000
app.listen(3000,()=>{
    console.log('SERVING ON PORT 3000')
})

//seeting ejs as templating language, path is joined to that directory
app.engine('ejs',ejsMate)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))


//Confirming server creation 
app.get('/',(req,res)=>{
    res.render("home")  //or home.ejs (Ok)?
})

//making campground model

//an eg------->>>>>>>>>> been commented
// app.get('/makecampground',async (req,res)=>{
//     const camp=new Campground({title:"My homeyard",description:"cheap camping"});
//     await camp.save();
//     res.send(camp)

// })

//rendering all campgrounds from database to index.ejs 
app.get('/campgrounds',async(req,res)=>{
    const campgrounds=await Campground.find({});
    res.render('campgrounds/index',{campgrounds})
})
//campground new & create
app.get('/campgrounds/new',(req,res)=>{
    res.render('campgrounds/new')
})

//post request to create new campground
app.post('/campgrounds',async (req,res)=>{
    const campground=new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
})
//selecting single campground by id
app.get('/campgrounds/:id',async (req,res)=>{
    const campground=await Campground.findById(req.params.id)
    res.render('campgrounds/show',{campground})
})
app.get('/login',(req,res)=>{
    res.render('login')
})

//edit & update
app.get('/campgrounds/:id/edit',async(req,res)=>{
    const campground=await Campground.findById(req.params.id);
    res.render('campgrounds/edit',{campground})
})

app.put('/campgrounds/:id',async(req,res)=>{
    const {id}=req.params;
    const campground=await Campground.findByIdAndUpdate(id,{...req.body.campground})
    res.redirect(`/campgrounds/${campground._id}`)
})

//delete
app.delete('/campgrounds/:id' ,async(req,res)=>{
    const {id}=req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})
app.get('/showu',(req,res)=>{
    res.render('/campgrounds/showu')
})






