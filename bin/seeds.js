const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/foodApp");
const Vendor  = require("../models/vendor");
const Dish = require("../models/vendor");

const initialVendorData = [{
        email     : "maria@gmail.com",
        password  : "lopez",
        name      : "Maria Lopez",
        location  : { type : "Point", 
                      coordinates: [2.189792, 41.390627]
                    },
        cuisine   : "Italian",
        capacity  : 5,
        menu      : [
                        {
                            dishName    : "Pasta",
                            dishQuantity : 20,
                            dishPrice     : 9,   
                        }
                    ]
    
    },
    {
        email      : "alessandro@gmail.com",
        password   : "cerri",
        name       : "Alessandro Cerri",
        location   : { type : "Point", 
                      coordinates: [2.162541, 41.387037]
                     },
        cuisine    : "Italian",
        capacity   : 9,
        menu      : [
                        {
                            dishName    : "Pizza",
                            dishQuantity : 10,
                            dishPrice     : 5,   
                        }
                    ]
    
    },
    {
        email       : "nicola@gmail.com",
        password    : "daddabo",
        name        : "Nicola D'Addabo",
        location    : { type : "Point", 
                      coordinates: [2.165517, 41.368959]
                      },        
        cuisine     : "Italian",
        capacity    : 12,
        menu      : [
                        {
                            dishName    : "Pizza",
                            dishQuantity : 10,
                            dishPrice     : 5,   
                        }
                    ]

    },
    {
        email       : "alberto@live.com",
        password    : "piccioli",
        name        : "Alberto Piccioli",
        location    : { type : "Point", 
                      coordinates: [2.121814, 41.392153]
                      }, 
        cuisine     : "Italian",
        capacity    : 3,
        menu        : [
                        {
                            dishName     : "Pizza",
                            dishQuantity : 4,
                            dishPrice    : 5,   
                        }
                    ]
    },
    {
        email       : "riccardo@gmail.com",
        password    : "conti",
        name        : "Riccardo Conti",
        location    : { type : "Point", 
                      coordinates: [2.171749, 41.397647]
                      }, 
        cuisine     : "Italian",
        capacity    : 7,
        menu      : [
                        {
                            dishName     : "Pizza",
                            dishQuantity : 10,
                            dishPrice    : 5,   
                        }
                    ]
    },
    {
        email       : "camila@ccc.com",
        password    : "castellano",
        name        : "Camila castellano",
        location    : { type : "Point", 
                      coordinates: [2.170578, 41.390958]
                      }, 
        cuisine     : "Spanish",
        capacity    : 5,
        menu      : [
                        {
                            dishName     : "Paella",
                            dishQuantity : 10,
                            dishPrice    : 5,   
                        }
                    ]
    },
    {
        email       : "gregory@byrne.at",
        password    : "Friedman",
        name        : "Alina Barton",
        location    : { type : "Point", 
                      coordinates: [2.173521, 41.380698]
                      }, 
        cuisine     : "Italian",
        capacity    : 3,
        menu      : [
                        {
                            dishName     : "Pizza",
                            dishQuantity : 10,
                            dishPrice    : 5,   
                        }
                    ]
    }, 
    {
        email       : "joyce@heller.do",
        password    : "Oakley",
        name        : "Nora Clements",
        location    : { type : "Point", 
                      coordinates: [2.178880, 41.381546]
                      },
        cuisine     : "Spanish",
        capacity    : 10,
        menu      : [
                        {
                            dishName     : "Paella",
                            dishQuantity : 8,
                            dishPrice    : 5,   
                        }
                    ]
    },
    {
        email       : "allen@rao.gp",
        password    : "desai",
        name        : "Charlotte Welch",
        location    : { type : "Point", 
                      coordinates: [2.179882, 41.378736]
                      },
        cuisine     : "Italian",
        capacity    : 6,
        menu      : [
                        {
                            dishName     : "Pizza",
                            dishQuantity : 10,
                            dishPrice    : 5,   
                        }
                    ]
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