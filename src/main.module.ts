import { Module } from "@nestjs/common";
import { UserModule } from './user/user.module';
import { ReservationModule } from './reservation/reservation.module';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';


const uriDB = 'mongodb+srv://admin:Nv1kGGUOIq5jFQCv@cluster0.trzgoig.mongodb.net/test?retryWrites=true&w=majority'
@Module({
  imports: [
    UserModule,
    ReservationModule,
    MongooseModule.forRoot(uriDB),
    AuthModule
]
})
export class MainModule {

}