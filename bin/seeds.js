const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/foodApp");
const Vendor  = require("../models/vendor");

const initialVendorData = [{
        email : "maria@gmail.com",
        password : "lopez",
            name : "Maria Lopez",
        postcode : "08002", 
        cuisine : "Italian",
        capacity : 5
    
    },
    {
        email : "alessandro@gmail.com",
        password : "cerri",
            name : "Alessandro Cerri",
        postcode : "08002", 
        cuisine : "Italian",
        capacity : 9
    },
    {
        email : "nicola@gmail.com",
        password : "daddabo",
            name : "Nicola D'Addabo",
        postcode : "08003", 
        cuisine : "Italian",
        capacity : 12
    },
    {
        email : "alberto@live.com",
        password : "piccioli",
            name : "Alberto Piccioli",
        postcode : "08003", 
        cuisine : "Italian",
        capacity : 3
    },
    {
        email : "riccardo@gmail.com",
        password : "conti",
            name : "Riccardo Conti",
        postcode : "08004", 
        cuisine : "Italian",
        capacity : 7
    },
    {
        email : "camila@ccc.com",
        password : "castellano",
            name : "camila castellano",
        postcode : "08004", 
        cuisine : "Spanish",
        capacity : 5
    },
    {
        email: "gregory@byrne.at",
        password: "Friedman",
            name: "Alina Barton",
        postcode: "08004",
        cuisine: "Italian",
        capacity: 3
    },
    {
           email : "joyce@heller.do",
        password : "Oakley",
            name : "Nora Clements",
        postcode : "08005",
         cuisine : "Spanish",
        capacity : 10
    },
    {
           email : "allen@rao.gp",
        password : "desai",
            name : "Charlotte Welch",
        postcode : "08005",
         cuisine : "Italian",
        capacity : 6
    }
];

Vendor.create(initialVendorData, (err, docs) => {
    if(err){
        throw err;
    }
    docs.forEach((element) => {
        console.log(element);
    })
    mongoose.connection.close();
})