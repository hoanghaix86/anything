import { SignInController } from './auth/sign-in/sign-in.controller'
import { SignUpController } from './auth/sign-up/sign-up.controller'
import { HardDeleteFileController } from './file/hard-delete-file/hard-delete-file.controller'
import { MoveFileController } from './file/move-file/move-file.controller'
import { RenameFileController } from './file/rename-file/rename-file.controller'
import { SoftDeleteFileController } from './file/soft-delete-file/soft-delete-file.controller'
import { UploadFileController } from './file/upload-file/upload-file.controller'
import { CreateFolderController } from './folder/create-folder/create-folder.controller'
import { HardDeleteFolderController } from './folder/hard-delete-folder/hard-delete-folder.controller'
import { MoveFolderController } from './folder/move-folder/move-folder.controller'
import { RenameFolderController } from './folder/rename-folder/rename-folder.controller'
import { SoftDeleteFolderController } from './folder/soft-delete-folder/soft-delete-folder.controller'
import { SearchController } from './search/search.controller'

export const controllers = [
    SignUpController,
    SignInController,
    // Folder
    CreateFolderController,
    RenameFolderController,
    MoveFolderController,
    SoftDeleteFolderController,
    HardDeleteFolderController,
    // File
    UploadFileController,
    RenameFileController,
    MoveFileController,
    SoftDeleteFileController,
    HardDeleteFileController,
    // Search
    SearchController,
]
