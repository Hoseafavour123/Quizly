import UserModel from '../models/user.model'
import appAssert from '../utils/appAssert'
import { NOT_FOUND, OK } from '../constants/http'
import catchErrors from '../utils/catchErrors'
import cloudinary from 'cloudinary'
import { hashValue } from '../utils/bcrypt'

export const getUserHandler = catchErrors(async (req, res) => {
  const user = await UserModel.findById(req.userId)
  appAssert(user, NOT_FOUND, 'User not found')
  return res.status(OK).json(user.omitPassword())
})

// Delete a volunteer
export const deleteUser = catchErrors(async (req, res) => {
  const { id } = req.params
  const user = await UserModel.findByIdAndDelete(id)
  appAssert(user, NOT_FOUND, 'The user does not exist')
  res.status(200).json({ message: 'User deleted successfully' })
})

// Update a volunteer
export const updateUser = catchErrors(async (req, res) => {
  const { firstName, lastName, password, email, ...restData } =
    req.body

  const user = await UserModel.findById(req.userId)
  appAssert(user, NOT_FOUND, 'Volunteer not found')
  
  let imageInfo = user.imageInfo

  if (req.file) {
    if (imageInfo?.imageId) {
      await cloudinary.v2.uploader.destroy(imageInfo.imageId)
    }
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: 'users',
    })

    imageInfo = {
      imageUrl: result.secure_url,
      imageId: result.public_id,
    }
  }

  const updateFields: Partial<typeof user> = {
    firstName,
    lastName,
    email,
    ...restData,
    ...(imageInfo && { imageInfo }),
  }

  if (password) {
    updateFields.password = await hashValue(password)
  }

  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: req.userId },
    updateFields,
    { new: true, runValidators: true }
  )

  appAssert(updatedUser, NOT_FOUND, 'Volunteer not found')

  return res.status(200).json({ user: updatedUser })
})



export const getAllUsers = catchErrors(async (req, res) => {
  const users = await UserModel.find()
  res.status(200).json({ users })
})
