import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ProfilesService } from './profiles.service'
import { CreateProfileDto } from './dto/create-profile.dto'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { GetSessionInfoDto } from 'src/auth/dto'
import { SessionInfo } from 'src/auth/session-info.decorator'

@Controller('profiles')
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) {}

  /*   @Post()
    create(@Body() createProfileDto: CreateProfileDto) {
        return this.profilesService.create(createProfileDto)
    } */

    @Get('all')
    findAll() {
        return this.profilesService.findAll()
    }

    @Get()
    findMySelf(@SessionInfo() session: GetSessionInfoDto) {
        const muUserId = session.id
        return this.profilesService.findOne(muUserId)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.profilesService.findOne(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
        return this.profilesService.update(+id, updateProfileDto)
    }

/*     @Delete(':id')
    remove(@Param('id') id: string) {
        return this.profilesService.remove(+id)
    } */
}
