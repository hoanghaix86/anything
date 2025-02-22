import { SignInController } from './auth/sign-in/sign-in.controller'
import { SignUpController } from './auth/sign-up/sign-up.controller'
import { CreateFolderController } from './folder/create-folder/create-folder.controller'
import { HardDeleteFolderController } from './folder/hard-delete-folder/hard-delete-folder.controller'
import { MoveFolderController } from './folder/move-folder/move-folder.controller'
import { RenameFolderController } from './folder/rename-folder/rename-folder.controller'
import { SoftDeleteFolderController } from './folder/soft-delete-folder/soft-delete-folder.controller'

export const controllers = [
    SignUpController,
    SignInController,
    CreateFolderController,
    RenameFolderController,
    MoveFolderController,
    SoftDeleteFolderController,
    HardDeleteFolderController,
]
