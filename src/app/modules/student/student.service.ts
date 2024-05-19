import { TStudent } from './student.interface'
import { Student } from './student.model'

const createStudentIntoDB = async (student: TStudent) => {
  //static method
  // const result = await StudentModel.create(student)
  //instance method
  const INSstudent = new Student(student)
  if (await INSstudent.isUserExists(student.id)) {
    throw new Error('user already exists')
  }
  const result = await INSstudent.save() //built in instance method by moognoose
  return result
}

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
  return result
}

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
  return result
}
export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
}
