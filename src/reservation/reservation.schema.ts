import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";
import { HydratedDocument } from "mongoose";

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema()
export class Reservation {

    // @Prop()
    // _id?: string;

    @Prop()
    name: string;
    
    @Prop({ required: true })
    table: number;

    @Prop()
    phone: number;

    @Prop({ required: true })
    dateStart: string;

    @Prop()
    dateEnd: string;

    @Prop({ required: true })
    dateCreate: string;

    @Prop()
    dateUpdate: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);