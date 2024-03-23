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
    description: 'Image name',
    example: 'SampleImage',
  })
  @Prop({ required: true })
  image_name: string;

  // For storing the actual JPEG image, consider using a Buffer type.
  // However, it's generally not advised to store images directly in databases due to performance issues.
  // Instead, storing images in a storage service like AWS S3 and saving the link is preferable.
  @ApiProperty({
    description: 'JPEG image',
    type: 'string',
    format: 'binary',
  })
  @Prop()
  image: Buffer;
}

export const DesignSchema = SchemaFactory.createForClass(Design);
export type DesignDocument = Design & Document;
