import { isArray } from 'rxjs/internal-compatibility';

/**
 * I know I'm not respecting anything here, what a mess, sorry
 */
export class NotSoCoolLogger {
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
    const textArgs = this._prefix ? [`%c${this._prefix}`, '%c: '] : ['%c'];
    const styleArgs = this._prefix
      ? [
          typeof this._prefixStyle == undefined
            ? ''
            : this.buildCssString(this._prefixStyle, highLighted),
        ]
      : [];

    for (const part of parts) {
      if (typeof part === 'string') {
        textArgs.push(part);
        styleArgs.push(this.buildCssString({}, highLighted));
      } else if (isArray(part)) {
        textArgs.push(part[0]);
        styleArgs.push(
          typeof part[1] === 'string'
            ? part[1]
            : part[1] == undefined
            ? ''
            : this.buildCssString(part[1], highLighted)
        );
      } else {
        textArgs.push(part.value);
        styleArgs.push(
          typeof part.style === 'string'
            ? part.style
            : part.style == undefined
            ? ''
            : this.buildCssString(part.style, highLighted)
        );
      }
    }

    console.log(textArgs.join(''), ...styleArgs);
  }

  private buildCssString(
    cssStyles: AcceptedStyles | string,
    highLighted: boolean
  ): string {
    if (typeof cssStyles === 'string')
      cssStyles = this.stringCssStylesToAcceptedStyles(cssStyles);
    if (highLighted) cssStyles.background = '#FFFACD22';
    let res = '';

    let first = true;
    for (const styleKey in cssStyles) {
      if (first) {
        res += `${styleKey}: ${cssStyles[styleKey]}`;
        first = false;
      } else {
        res += `; ${styleKey}: ${cssStyles[styleKey]}`;
      }
    }

    return res;
  }

  private stringCssStylesToAcceptedStyles(cssStyles: string): AcceptedStyles {
    let toTreat = cssStyles.toString();
    const result: AcceptedStyles = {};

    while (toTreat) {
      switch (true) {
        case toTreat.startsWith('background:'):
          toTreat = this.optimisticParseStyle(toTreat, 'background', result);
          break;
        case toTreat.startsWith('color:'):
          toTreat = this.optimisticParseStyle(toTreat, 'color', result);
          break;
      }
    }

    return result;
  }

  private optimisticParseStyle(
    toTreat: string,
    styleKey: keyof AcceptedStyles,
    parseObject: AcceptedStyles
  ) {
    let rest = toTreat.slice(`${styleKey}:`.length);
    while (rest.startsWith(' ')) {
      rest = rest.slice(1);
    }
    const parts = rest.split(';');
    const style = parts[0];
    parseObject[styleKey] = style;

    if (parts.length > 1) {
      parts.shift();
      return parts.join(';');
    }

    return '';
  }
}

type AcceptedStyles = Partial<
  Pick<CSSStyleDeclaration, 'color' | 'background'>
>;
