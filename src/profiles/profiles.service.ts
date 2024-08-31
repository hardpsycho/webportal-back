import { Injectable } from '@nestjs/common'
import { CreateProfileDto } from './dto/create-profile.dto'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { DbService } from 'src/db/db.service'

@Injectable()
export class ProfilesService {
    constructor(private db: DbService) {}

    create(createProfileDto: CreateProfileDto) {
        const { lastName, firstName, userId } = createProfileDto

        return this.db.profile.create({ data: { lastName, firstName, userId } })
    }

    findAll() {
        return this.db.profile.findMany({ where: { userId: { gt: 0 } } })
    }

    findOne(id: number) {
        return this.db.profile.findUnique({ where: { userId: id } })
    }

    update(userId: number, { lastName, firstName, age, nickName }: UpdateProfileDto) {
        return this.db.profile.update({
            where: {
                userId
            },
            data: { lastName, firstName, age, nickName }
        })
    }

    remove(id: number) {
        return this.db.profile.delete({ where: { userId: id } })
    }
}
