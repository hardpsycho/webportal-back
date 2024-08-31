import { ApiProperty } from '@nestjs/swagger'

export class UpdateProfileDto {
    @ApiProperty({
        example: 'Иван'
    })
    firstName!: string

    @ApiProperty({
        example: 'Иванов'
    })
    lastName!: string

    @ApiProperty({
        example: 18
    })
    age!: number

    @ApiProperty({
        example: 18
    })
    nickName?: string
}
