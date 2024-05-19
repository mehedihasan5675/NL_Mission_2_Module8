import { TStudent } from './student.interface'
import { Student } from './student.model'

const createStudentIntoDB = async (student: TStudent) => {
  if (await Student.isUserExists(student.id)) {
    throw new Error('user already exists')
  }
  //static method
  const result = await Student.create(student)

  //instance method
  // const INSstudent = new Student(student)
  // if (await INSstudent.isUserExists(student.id)) {
  //   throw new Error('user already exists')
  // }
  // const result = await INSstudent.save() //built in instance method by moognoose
  return result
}

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
  return result
}

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id })
  const result = await Student.aggregate([{ $match: { id: id } }])
  return result
}
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true })
  return result
}
export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}
