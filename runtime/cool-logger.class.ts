import { isArray } from 'rxjs/internal-compatibility';

const HIGHLIGHT_BACKGROUND = '#FFFACD22';

export class CoolLogger {
  private _prefix: string | undefined;
  private _prefixStyle: AcceptedStyles | string | null | undefined;

  constructor(prefix?: string, prefixStyle?: AcceptedStyles | string | null) {
    this._prefix = prefix;
    this._prefixStyle = prefixStyle;
  }

  withPrefix(prefix: string) {
    this._prefix = prefix;
    return this;
  }

  withPrefixStyle(prefixStyle: AcceptedStyles | string) {
    this._prefixStyle = prefixStyle;
    return this;
  }

  log(
    highLighted: boolean,
    ...parts: (
      | string
      | [string, AcceptedStyles | string | null | undefined]
      | { value: string; style?: AcceptedStyles | string | null }
    )[]
  ) {
    const args = [`%c${this._prefix}`, '%c: '];
    const styleArgs = [
      typeof this._prefixStyle === 'string'
        ? this._prefixStyle
        : this._prefixStyle == undefined
        ? ''
        : this.buildCssString(this._prefixStyle, highLighted),
    ];

    for (const part of parts) {
      if (typeof part === 'string') {
        args.push(part);
        styleArgs.push('');
      } else if (isArray(part)) {
        args.push(part[0]);
        styleArgs.push(
          typeof part[1] === 'string'
            ? part[1]
            : part[1] == undefined
            ? ''
            : this.buildCssString(part[1], highLighted)
        );
      } else {
        args.push(part.value);
        styleArgs.push(
          typeof part.style === 'string'
            ? part.style
            : part.style == undefined
            ? ''
            : this.buildCssString(part.style, highLighted)
        );
      }
    }

    console.log(args.join(''), ...styleArgs);
  }

  private buildCssString(
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
