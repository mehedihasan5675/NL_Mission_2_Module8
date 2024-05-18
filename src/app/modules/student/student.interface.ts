// 1. Create an interface representing a document in MongoDB.

export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}
export type TUserName = {
  firstName: string
  middleName: string
  lastName: string
}
export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}
export type TStudent = {
  id: string
  name: TUserName
  gender: 'male' | 'female'
  dateOfBirth?: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'A-' | 'O+' | 'O-' | 'AB+' | 'AB-' | 'B+' | 'B-'
  email: string
  avatar?: string
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImg?: string
  isActive: 'active' | 'blocked'
}
