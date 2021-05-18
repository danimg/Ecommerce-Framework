import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'format' })
export class FormatPipe implements PipeTransform {

  transform(value: string, mask: string) {
    if (value != null && value.length > 0) {
      value = value.replace(/\D/g, '');

      const pad = mask.replace(/\D/g, '').replace(/9/g, '_');
      const valorMask = value + pad.substring(0, pad.length - value.length);

      let valorMaskPos = 0;
      value = '';
      for (let i = 0; i < mask.length; i++) {
        if (isNaN(parseInt(mask.charAt(i)))) {
          value += mask.charAt(i);
        } else {
          value += valorMask[valorMaskPos++];
        }
      }

      if (value.indexOf('_') > -1) {
        value = value.substr(0, value.indexOf('_'));
      }
    }
    return value;
  }
}
