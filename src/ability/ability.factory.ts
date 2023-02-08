import { Injectable } from "@nestjs/common";
import { Client } from "src/client/entities/client.entity";
import {Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects} from '@casl/ability'

//Actions
export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete'
}

// protect from whom , here user is subject
export type Subjects = InferSubjects<typeof Client> | 'all'

export type AppAbility = Ability<[Action, Subjects]>
@Injectable()
export class AbilityFactory {
    // from route handler will pass eg: id -1 , isAdmin - true
    defineAbility(user: Client){
        const {can, cannot, build} = new AbilityBuilder(Ability as AbilityClass<AppAbility>)
        if(user.isAdmin)
        can(Action.Manage, Client)
        else
        can(Action.Read, Client)

        return build({
            detectSubjectType: (item) => 
            item.constructor as ExtractSubjectType<Subjects>
        })
    }
}
