const mongoose= require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')


const userSchema = new mongoose.Schema({ 
  name: {
    type: String ,
    required: true ,
    trim: true 
  },
  email :{
   type: String,
   unique: true ,
   trim: true,
   lowercase: true,
   validate(value){
       if(!validator.isEmail(value)){
           throw new Error('put a valid email address')
       }
   }

  },
 password :{
  type: String,
  required: true,
  trim: true,
  minlength: 7,
  validate(value){
      if(value.toLowerCase().includes('password')){
         throw new Error('password is wrong')
      }
  }


 },
  age: {
    type: Number,
    default: 0,
  
    validate(value){
    if(value<0){
      throw new Error('age must be greater than zero')
    }
        
    }
  },
  tokens:[{
    token: {
      type: String,
      required: true
    }
  }],
  avatar : {
    type : Buffer
  }

}, {
  timestamps : true
})

userSchema.virtual('tasks', {
  ref : 'Task' ,
  localField: '_id' ,
  foreignField: 'owner'
})

userSchema.methods.toJSON = function (){
  const user = this 
  const userObject = user.toObject() 
  delete userObject.password
  delete userObject.avatar
  
  return userObject 
}

userSchema.methods.generateAuthToken = async function (){
  const user= this
  const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
  user.tokens = user.tokens.concat({ token }) // shorthand for {token: token}
  await user.save()
  return token
}


userSchema.statics.findByCredentials = async (email, password) => {

  const user = await User.findOne({ email })
  if(!user){
  throw new Error('Unable to login')
  }
const isMstch = await bcrypt.compare(password, user.password)
if(!isMstch){
  throw new Error('Unable to login')
}
return user
}



userSchema.pre('save', async function (next) {
  const user = this

  if(user.isDirectModified('password')){
    user.password =  await bcrypt.hash(user.password , 8)
  }
  next()
})

// delete user task when user is removed
userSchema.pre('remove' , async function (next){
  const user = this
  await Task.deleteMany({ owner: user._id })
  next()
})
const User = mongoose.model('User',userSchema)


   module.exports = User



 /*
 const me = new User({
     name: 'Donald                  ',
     email: 'dddd@gmail.com       ' ,
     password: 'phone12348'
 })
 */
  
 