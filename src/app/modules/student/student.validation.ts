import { z } from 'zod'

// Define userNameSchema using Zod
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First Name cannot be more than 20 characters')
    .min(1, 'First Name is required')
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First Name must be capitalized',
      },
    ),
  middleName: z.string().min(1, 'Middle Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
})

// Define guardianSchema using Zod
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father Name is required'),
  fatherOccupation: z.string().min(1, 'Father Occupation is required'),
  fatherContactNo: z.string().min(1, 'Father Contact Number is required'),
  motherName: z.string().min(1, 'Mother Name is required'),
  motherOccupation: z.string().min(1, 'Mother Occupation is required'),
  motherContactNo: z.string().min(1, 'Mother Contact Number is required'),
})

// Define localGuardianSchema using Zod
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local Guardian Name is required'),
  occupation: z.string().min(1, 'Local Guardian Occupation is required'),
  contactNo: z.string().min(1, 'Local Guardian Contact Number is required'),
  address: z.string().min(1, 'Local Guardian Address is required'),
})

// Define studentSchema using Zod
const studentValidationSchema = z.object({
  id: z.string().min(1, 'Student ID is required'),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z
    .enum(['male', 'female'], {
      errorMap: () => ({ message: '{VALUE} is not a valid gender' }),
    })
    .refine((val) => val !== undefined, 'Gender is required'),
  dateOfBirth: z.string().optional(),
  email: z
    .string()
    .email('{VALUE} is not a valid email type')
    .min(1, 'Email is required'),
  contactNo: z.string().min(1, 'Contact Number is required'),
  emergencyContactNo: z.string().min(1, 'Emergency Contact Number is required'),
  bloodGroup: z
    .enum(['A+', 'A-', 'O+', 'O-', 'AB+', 'AB-', 'B+', 'B-'])
    .optional(),
  presentAddress: z.string().min(1, 'Present Address is required'),
  permanentAddress: z.string().min(1, 'Permanent Address is required'),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
})
export default studentValidationSchema
