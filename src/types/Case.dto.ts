import {
  IsString,
  IsBoolean,
  IsDefined,
  IsDateString,
  IsNotEmpty,
} from "class-validator";

export class CaseRequestBody {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  customerName?: string;

  @IsDateString()
  @IsDefined()
  startDate?: Date;

  @IsBoolean()
  @IsDefined()
  isFinished?: boolean;
}
