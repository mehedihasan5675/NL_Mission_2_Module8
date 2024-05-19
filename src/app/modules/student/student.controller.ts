import { Request, Response } from 'express'

import { StudentServices } from './student.service'
import studentValidationSchema from './student.validation'
// import studentValidationSchema from './student.joi.validation'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body
    // const { error,} = studentValidationSchema.validate(studentData)
    const ZodParseData = studentValidationSchema.parse(studentData)

    // console.log({ error }, { value })
    //will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(ZodParseData)
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'something went wrong',
    //     error: error.details,
    //   })
    // }

    //send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    // console.log(result)
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId
    const result = await StudentServices.getSingleStudentFromDB(studentId)
    res.status(200).json({
      success: true,
      message: 'Single Student retrieved successfullly',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId
    const result = await StudentServices.deleteStudentFromDB(studentId)
    res.status(200).json({
      success: true,
      message: ' Student deleted successfullly',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}
export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
