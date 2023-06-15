import {Schema, model,models} from "mongoose";

const houseSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    noOfGuests:{
        type:Number,
        required:true
    },
    imageUrl:{
        type:String,
        
    },
   
    roomType:{
        type:String,
        required:true
    },
    currentBookings:[],
    months: {
        type: Object,
        default: {},
        set: function (months) {
          const populatedMonths = {};
          for (const month of Object.keys(months)) {
            populatedMonths[new Date(month).toLocaleString('default', { month: 'long' })] = months[month];
          }
          return populatedMonths;
        },
      },


   
},{
    timestamps:true
})

const House = models.House || model('House', houseSchema)

export default House