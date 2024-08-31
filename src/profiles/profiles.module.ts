import { Module } from '@nestjs/common'
import { ProfilesService } from './profiles.service'
import { ProfilesController } from './profiles.controller'
import { DbModule } from 'src/db/db.module'

@Module({
    imports: [DbModule],
    controllers: [ProfilesController],
    providers: [ProfilesService],
    exports: [ProfilesService]
})
export class ProfilesModule {}
