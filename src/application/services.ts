import { Module } from '@nestjs/common'
import { ChangePasswordUseCase } from './account/change-password-use-case/change-password.use-case'
import { CreateAccountUseCase } from './account/create-account-use-case/create-account.use-case'
import { SignInUseCase } from './auth/sign-in-use-case/sign-in.use-case'
import { SignUpUseCase } from './auth/sign-up-use-case/sign-up.use-case'
import { HardDeleteFileUseCase } from './file/hard-delete-file-use-case/hard-delete-file.use-case'
import { MoveFileUseCase } from './file/move-file-use-case/move-file.use-case'
import { RenameFileUseCase } from './file/rename-file-use-case/rename-file.use-case'
import { SoftDeleteFileUseCase } from './file/soft-delete-file-use-case/soft-delete-file.use-case'
import { UploadFileUseCase } from './file/upload-file-use-case/upload-file.use-case'
import { CreateFolderUseCase } from './folder/create-folder-use-case/create-folder.use-case'
import { HardDeleteFolderUseCase } from './folder/hard-delete-folder-use-case/hard-delete-folder.use-case'
import { MoveFolderUseCase } from './folder/move-folder-use-case/move-folder.use-case'
import { RenameFolderUseCase } from './folder/rename-folder-use-case/rename-folder.use-case'
import { SoftDeleteFolderUseCase } from './folder/soft-delete-folder-use-case/soft-delete-folder.use-case'
import { CreateQuotaUseCase } from './quota/create-quota-use-case/create-quota.use-case'
import { CreateSessionUseCase } from './session/create-session-use-case/create-session.use-case'

export const services = [
    // Account
    CreateAccountUseCase,
    ChangePasswordUseCase,
    // Auth
    SignUpUseCase,
    SignInUseCase,
    // File
    UploadFileUseCase,
    RenameFileUseCase,
    MoveFileUseCase,
    SoftDeleteFileUseCase,
    HardDeleteFileUseCase,
    // Folder
    CreateFolderUseCase,
    RenameFolderUseCase,
    MoveFolderUseCase,
    SoftDeleteFolderUseCase,
    HardDeleteFolderUseCase,
    // Quota
    CreateQuotaUseCase,
    // Session
    CreateSessionUseCase,
]
