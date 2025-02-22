import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateFolderDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsOptional()
    @IsString()
    parentId?: string
}
