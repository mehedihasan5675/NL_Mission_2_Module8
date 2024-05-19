import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../config'
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface'
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
        if (firstNameStr === value) {
          return true
        } else return false
      },
      message: '{VALUE} is not in capitalize format',
    },
    maxlength: [20, 'First Name can not be more than 20 charactors'],
    required: [true, 'First Name is required'],
  },
  middleName: { type: String, required: [true, 'Middle Name is required'] },
  lastName: {
    type: String,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
    required: [true, 'Last Name is required'],
  },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, 'Father Name is required'] },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact Number is required'],
  },
  motherName: { type: String, required: [true, 'Mother Name is required'] },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact Number is required'],
  },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, 'Local Guardian Name is required'] },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian Contact Number is required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address is required'],
  },
})

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required'],
    },
    password: {
      type: String,
      required: [true, 'PASSWORD is required'],
      unique: true,
      maxlength: [20, 'password can not be more than 20 character'],
    },
    name: { type: userNameSchema, required: [true, 'Name is required'] },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: [true, 'Email is required'],
      // validate: {
      //   validator: (value: string) => validator.isEmail(value),
      //   message: '{VALUE} is not a valid email type',
      // },
    },
    contactNo: { type: String, required: [true, 'Contact Number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact Number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'O+', 'O-', 'AB+', 'AB-', 'B+', 'B-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local Guardian information is required'],
    },
    profileImg: { type: String },
    isActive: {
      type: String,
      enum: {
        values: ['active', 'blocked'],
        message: '{VALUE} is not a valid status',
      },
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

//pre save middleware /hook:will work on create(),save()
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook :we wiill save the data')
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  //hashing password and save into db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

//post save middleware /hook
studentSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
  // console.log(this, 'post hook :we save our  data')
})

//creating a custom static method
studentSchema.statics.isUserExists = async function (id) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}

//Query middleware
studentSchema.pre('find', function (next) {
  // console.log(this)
  this.find({ isDeleted: { $ne: true } })
  next()
})
studentSchema.pre('findOne', function (next) {
  // console.log(this)
  this.find({ isDeleted: { $ne: true } })
  next()
})
studentSchema.pre('aggregate', function (next) {
  // console.log(this)
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

//virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName}  ${this.name.middleName}  ${this.name.lastName}`
})
//creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = Student.findOne({ id: id })
//   return existingUser
// }
//create model
export const Student = model<TStudent, StudentModel>('Student', studentSchema)
