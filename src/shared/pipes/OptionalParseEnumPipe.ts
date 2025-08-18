import { ParseEnumPipe } from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common';

export class OptionalParseEnumPipe extends ParseEnumPipe {
  transform(value: string, metadata: ArgumentMetadata) {
    if (typeof value === 'undefined') return undefined;
    return super.transform(value, metadata);
  }
}
