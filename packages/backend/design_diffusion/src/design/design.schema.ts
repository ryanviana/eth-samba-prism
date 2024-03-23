import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Design {
  @ApiProperty({
    description: 'Unique identifier',
    example: '507f191e810c19729de860ea',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    description: 'JPEG image',
    type: 'string',
    format: 'binary',
  })
  @Prop()
  image: Buffer;

  @Prop()
  image_hash: string;

  @ApiProperty({
    description: 'Design ID',
    example: 1000,
  })
  @Prop()
  designId: number;
}

export const DesignSchema = SchemaFactory.createForClass(Design);
export type DesignDocument = Design & Document;
