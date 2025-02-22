import { SignInController } from './auth/sign-in/sign-in.controller'
import { SignUpController } from './auth/sign-up/sign-up.controller'
import { CreateFolderController } from './folder/create-folder/create-folder.controller'
import { MoveFolderController } from './folder/move-folder/move-folder.controller'
import { RenameFolderController } from './folder/rename-folder/rename-folder.controller'

export const controllers = [
    SignUpController,
    SignInController,
    CreateFolderController,
    RenameFolderController,
    MoveFolderController,
]
