import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDesignDto } from './dto/create-design.dto';
import { UpdateDesignDto } from './dto/update-design.dto';
import { Design, DesignDocument } from './design.schema';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

@Injectable()
export class DesignService {
  constructor(
    @InjectModel(Design.name) private designModel: Model<DesignDocument>,
  ) {}

  private async toB64(imgPath: string) {
    const data = fs.readFileSync(path.resolve(imgPath));
    return Buffer.from(data).toString('base64');
  }

  private async getDesignFromExternalAPI(prompt: string): Promise<String> {
    const api_key = 'SG_44e57559c58654ee';
    const url = 'https://api.segmind.com/v1/sd1.5-inpainting';

    const imagePath = path.resolve('image.png');
    const maskPath = path.resolve('mask.png');

    const imageBase64 = await this.toB64(imagePath);
    const maskBase64 = await this.toB64(maskPath);

    const data = {
      prompt: prompt,
      negative_prompt: 'Disfigured, blurry, nude',
      samples: 1,
      image: imageBase64,
      mask: maskBase64,
      scheduler: 'DDIM',
      num_inference_steps: 25,
      guidance_scale: 7.5,
      strength: 1,
      seed: 17123564234,
      img_width: 626,
      img_height: 626,
    };

    const response = await axios.post(url, data, {
      headers: { 'x-api-key': api_key },
      responseType: 'arraybuffer',
    });

    fs.writeFileSync(path.resolve('output.jpg'), response.data, 'binary');
    return Buffer.from(response.data).toString('base64');
  }

  async create(createDesignDto: CreateDesignDto): Promise<Design> {
    const { prompt } = createDesignDto;
    const imageBase64 = await this.getDesignFromExternalAPI(prompt);

    const createdDesign = new this.designModel({
      prompt,
      image: imageBase64,
      image_name: 'output.jpg',
    });
    return createdDesign.save();
  }

  async findAll(): Promise<Design[]> {
    return this.designModel.find().exec();
  }

  async findOne(id: string): Promise<Design> {
    const design = await this.designModel.findById(id).exec();
    if (!design) {
      throw new NotFoundException(`Design with ID ${id} not found`);
    }
    return design;
  }

  async update(id: string, updateDesignDto: UpdateDesignDto): Promise<Design> {
    const existingDesign = await this.designModel
      .findByIdAndUpdate(id, updateDesignDto, { new: true })
      .exec();
    if (!existingDesign) {
      throw new NotFoundException(`Design with ID ${id} not found`);
    }
    return existingDesign;
  }

  async remove(id: string): Promise<void> {
    const result = await this.designModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Design with ID ${id} not found`);
    }
  }
}
