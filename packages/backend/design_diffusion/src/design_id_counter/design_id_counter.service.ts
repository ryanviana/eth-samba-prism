import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDesignIdCounterDto } from './dto/create-design_id_counter.dto';
import { UpdateDesignIdCounterDto } from './dto/update-design_id_counter.dto';
@Injectable()
export class DesignIdCounterService {
  constructor(
    @InjectModel('DesignIdCounter') private counterModel: Model<any>,
  ) {}

  async create(createCounterDto: CreateDesignIdCounterDto) {
    const createdCounter = new this.counterModel(createCounterDto);
    return await createdCounter.save();
  }

  async findAll() {
    return await this.counterModel.find().exec();
  }

  async findOne(id: string) {
    return await this.counterModel.findById(id).exec();
  }

  async update(id: string, updateCounterDto: UpdateDesignIdCounterDto) {
    return await this.counterModel
      .findByIdAndUpdate(id, updateCounterDto, { new: true })
      .exec();
  }

  async findOneAndUpdate(id: string, sequenceValue: number) {
    return await this.counterModel
      .findOneAndUpdate(
        { _id: id },
        { $set: { seq: sequenceValue } },
        { new: true, upsert: true },
      )
      .exec();
  }

  async getNextSequence(seqName: string): Promise<number> {
    const counter = await this.counterModel.findOneAndUpdate(
      { name: seqName },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );
    return counter.seq;
  }

  async getSeqByName(name: string): Promise<number> {
    const counter = await this.counterModel.findOne({ name }).exec();
    return counter.seq;
  }

  async updateSeqByName(name: string, sequenceValue: number) {
    return await this.counterModel
      .findOneAndUpdate(
        { name },
        { $set: { seq: sequenceValue } },
        { new: true },
      )
      .exec();
  }
}
