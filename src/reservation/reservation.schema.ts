import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema()
export class Reservation {

    @Prop()
    id: number;

    @Prop()
    name: string;
    
    @Prop({ required: true })
    table: number;

    @Prop()
    phone: number;

    @Prop({ required: true })
    dateStart: Date;

    @Prop()
    dateEnd: Date;

    @Prop({ required: true })
    dateCreate: Date;

    @Prop()
    dateUpdate: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);