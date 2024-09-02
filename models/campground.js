const mongoose  = require('mongoose')
const Schema  = mongoose.Schema
const Comment = require('./comments')


const CampgroundSchema = new Schema({

    title:{

        type:String,
        // required:true
    },
    image :{
        type:String
    },
    price:{
        type:Number,
    
    },
    description:{
        type:String,
        // required:true

    },
    location:{
        type:String,
        // required:true
    },

    comments :[
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

CampgroundSchema.post('findOneAndDelete',async function (doc){
    if(doc){
        await Comment.deleteMany({
            _id : { $in : doc.comments}
        })
    }
})

module.exports = mongoose.model('Campground',CampgroundSchema);
