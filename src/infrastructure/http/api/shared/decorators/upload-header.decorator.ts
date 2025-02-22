// import { createParamDecorator, ExecutionContext } from '@nestjs/common'
// import { Request } from 'express'
// import {
//     UploadChunkDto,
//     UploadSingleDto,
// } from 'src/presentation/http/dtos/upload.dto'

// export const UploadSingleHeaderPayload = createParamDecorator(
//     (data: unknown, ctx: ExecutionContext) => {
//         const req: Request = ctx.switchToHttp().getRequest()

//         const name = req.headers['file-name']
//             ? (req.headers['file-name'] as string)
//             : undefined
//         if (!name) return undefined

//         const size = req.headers['file-size']
//             ? (req.headers['file-size'] as string)
//             : undefined
//         if (!size) return undefined

//         const mimetype = req.headers['file-mimetype']
//             ? (req.headers['file-mimetype'] as string)
//             : undefined
//         if (!mimetype) return undefined

//         const parentId = req.headers['parent-id']
//             ? (req.headers['parent-id'] as string)
//             : undefined

//         const item = new UploadSingleDto()
//         item.name = name
//         item.size = Number(size)
//         item.mimetype = mimetype
//         item.parentId = parentId
//         return item
//     },
// )

// export const UploadChunkHeaderPayload = createParamDecorator(
//     (data: unknown, ctx: ExecutionContext) => {
//         const req: Request = ctx.switchToHttp().getRequest()

//         const name = req.headers['file-name']
//             ? (req.headers['file-name'] as string)
//             : undefined
//         if (!name) return undefined

//         const size = req.headers['file-size']
//             ? (req.headers['file-size'] as string)
//             : undefined
//         if (!size) return undefined

//         const mimetype = req.headers['file-mimetype']
//             ? (req.headers['file-mimetype'] as string)
//             : undefined
//         if (!mimetype) return undefined

//         const parentId = req.headers['parent-id']
//             ? (req.headers['parent-id'] as string)
//             : undefined

//         const currentPart = req.headers['file-current-part']
//             ? (req.headers['file-current-part'] as string)
//             : undefined
//         if (!currentPart) return undefined

//         const totalPart = req.headers['file-total-part']
//             ? (req.headers['file-total-part'] as string)
//             : undefined
//         if (!totalPart) return undefined

//         const item = new UploadChunkDto()
//         item.name = name
//         item.size = Number(size)
//         item.mimetype = mimetype
//         item.parentId = parentId
//         item.currentPart = Number(currentPart)
//         item.totalPart = Number(totalPart)
//         return item
//     },
// )
