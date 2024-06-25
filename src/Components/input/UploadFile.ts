import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';
import { TValidationResult } from '../../services/Validators/type';

import { InputBaseElement } from '.';

interface IProps {
  id: string;
  name: string;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  formId?: string;
  validate?: (value: string) => TValidationResult;
  onBlur?: (event: ElementEvents['blur']) => void;
  onChange?: (event: ElementEvents['change']) => void;
  onSubmit?: (event: ElementEvents['submit']) => void;
  events?: {
    submit?: (event: ElementEvents['submit']) => void;
  };
}

type Refs = {
  input: InputBaseElement;
};

export class UploadFile extends Component<IProps, Refs> {
  constructor(props: IProps) {
    const { disabled = false, type = '', placeholder = '', ...restProps } = props;

    const submit = (event: ElementEvents['submit']) => {
      if (props.onSubmit) {
        props.onSubmit(event);
      }
    };

    super({
      ...restProps,
      disabled,
      placeholder,
      type,
      events: {
        submit,
      },
      onBlur: () => this.validate(),
    });
  }

  public value() {
    return this.refs.input.value();
  }

  public validate() {
    if (this.props.validate) {
      return this.props.validate(this.refs.input.value()).isValid;
    }

    return true;
  }

  render(): string {
    const { id, formId, disabled, name } = this.props;
    return `
      <form id='${formId}' name='${formId}'>
          <div class='uploadFile'>
            <label class='uploadFile__container'>
              {{{ InputBaseElement 
                class='uploadFile__element' 
                id="${id}" 
                type="file"
                ref="input"
                name="${name}" 
                ${disabled ? 'disabled' : ''} 
                onChange=onChange 
              }}}
              {{{ Text text='Выбрать файл на компьютере' type='secondary' weight='500' size='medium' underline=true }}}
            </label>
          </div>
        </form>
    `;
  }
}
