import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
@Injectable()
export class LoginPipe implements PipeTransform {
  transform(value: any, metaData: ArgumentMetadata) {
    console.log('pipe value', value);
    console.log('pipe metaData', metaData);

    return value;
  }
}
