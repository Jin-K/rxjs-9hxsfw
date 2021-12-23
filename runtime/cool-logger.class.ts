import { isArray } from 'rxjs/internal-compatibility';

const HIGHLIGHT_BACKGROUND = '#FFFACD22';

export class CoolLogger {
  static log(
    prefix: string,
    prefixStyle: AcceptedStyles,
    highLighted: boolean,
    ...parts: (
      | [string, AcceptedStyles]
      | { value: string; style: AcceptedStyles }
    )[]
  ) {
    const args = [`%c${prefix}`, '%c: '];
    const styleArgs = [this.buildCssString(prefixStyle, highLighted)];

    for (const part of parts) {
      if (isArray(part)) {
        args.push(part[0]);
        styleArgs.push(this.buildCssString(part[1], highLighted));
      } else {
        args.push(part.value);
        styleArgs.push(this.buildCssString(part.style, highLighted));
      }
    }

    console.log(args.join(''), ...styleArgs);
  }

  private static buildCssString(
    cssStyles: AcceptedStyles,
    highLighted: boolean
  ): string {
    if (highLighted) cssStyles.background = HIGHLIGHT_BACKGROUND;
    let res = '';

    let first = true;
    for (const styleKey in cssStyles) {
      res += `${styleKey}: ${cssStyles[styleKey]}`;
      if (first) {
        first = false;
      } else {
        res += '; ';
      }
    }

    return res;
  }
}

type AcceptedStyles = Partial<
  Pick<CSSStyleDeclaration, 'color' | 'background'>
>;
