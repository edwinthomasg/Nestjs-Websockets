import { BeforeApplicationShutdown, Module, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AbilityFactory } from './ability.factory';

@Module({
    providers: [AbilityFactory],
    exports: [AbilityFactory]
})
export class AbilityModule implements OnModuleInit, OnModuleDestroy, BeforeApplicationShutdown{
    onModuleInit() {
        console.log("ability module init")
    }
    onModuleDestroy() {
        console.log("destroy triggered in ability module")
    }
    beforeApplicationShutdown(signal?: string) {
        console.log("before shutdown in ability module")
    }
}
