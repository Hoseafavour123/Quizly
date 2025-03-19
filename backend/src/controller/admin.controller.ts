import AdminModel from '../models/admin.model'
import appAssert from '../utils/appAssert'
import { NOT_FOUND, OK } from '../constants/http'
import catchErrors from '../utils/catchErrors'
import cloudinary from 'cloudinary'
import { hashValue } from '../utils/bcrypt'

export const getAdminHandler = catchErrors(async (req, res) => {
  const admin = await AdminModel.findById(req.userId)
  appAssert(admin, NOT_FOUND, 'Organisation not found')
  return res.status(OK).json(admin.omitPassword())
})

export const updateAdmin = catchErrors(async (req, res) => {
  const { name, email, password, ...restData } = req.body

  const admin = await AdminModel.findById(req.userId)
  appAssert(admin, NOT_FOUND, 'Admin not found')

  let imageInfo = admin.imageInfo

  if (req.file) {
    if (imageInfo?.imageId) {
      await cloudinary.v2.uploader.destroy(imageInfo.imageId)
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: 'admin',
    })

    imageInfo = {
      imageUrl: result.secure_url,
      imageId: result.public_id,
    }
  }

  const updateFields: Partial<typeof admin> = {
    name,
    email,
    ...restData,
    ...(imageInfo && { imageInfo }),
  }

  if (password) {
    updateFields.password = await hashValue(password)
  }

  const updatedAdmin = await AdminModel.findOneAndUpdate(
    { _id: req.userId },
    updateFields,
    { new: true, runValidators: true }
  )

  appAssert(updatedAdmin, NOT_FOUND, 'Admin not found')

  return res.status(200).json({ admin: updatedAdmin })
})

export const getAllAdmin = catchErrors(async (req, res) => {
  const admins = await AdminModel.find()
  res.status(200).json({ admins })
})

export const deleteAdmin = catchErrors(async (req, res) => {
  const { id } = req.params
  const admin = await AdminModel.findByIdAndDelete(id)
  appAssert(admin, NOT_FOUND, 'The organisation does not exist')
  res.status(200).json({ message: 'Organisation deleted successfully' })
})
