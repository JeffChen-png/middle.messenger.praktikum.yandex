import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';

interface IProps {
  id: string;
  name: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  type?: string;
  value?: string;
  onBlur?: (event: ElementEvents['blur']) => void;
  onChange?: (event: ElementEvents['change']) => void;
  events?: {
    blur?: (event: ElementEvents['blur']) => void;
    change?: (event: ElementEvents['change']) => void;
  };
}

type Refs = {
  input: HTMLInputElement;
};

export class InputBaseElement extends Component<IProps, Refs> {
  constructor(props: IProps) {
    const { disabled = false, className = 'input__element', type = '', placeholder = '', ...restProps } = props;

    const blur = (event: ElementEvents['blur']) => {
      if (props.onBlur) {
        props.onBlur(event);
      }
    };

    const change = (event: ElementEvents['change']) => {
      if (props.onChange) {
        props.onChange(event);
      }
    };

    super({
      ...restProps,
      disabled,
      placeholder,
      type,
      className,
      events: {
        blur,
        change,
      },
    });
  }

  public value() {
    return this.refs.input.value;
  }

  protected render(): string {
    const { id, value, disabled, className, type, name, placeholder } = this.props;

    const formValue = Object.prototype.hasOwnProperty.call(this.props, 'value') ? `value="${value}"` : '';

    return `
      <input 
      class=${className} 
      ref="input"
      id="${id}" 
      type="${type}" 
      name="${name}"
      ${formValue}
      placeholder='${placeholder}' 
      ${disabled ? 'disabled' : ''}/>
    `;
  }
}
