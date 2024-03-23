import { IsNotEmpty } from 'class-validator';

export class CreateDesignDto {
  @IsNotEmpty() // Ensures that the prompt field is not empty
  prompt: string;
}
