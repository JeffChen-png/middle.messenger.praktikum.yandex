import { UploadFile } from '../../Components';
import { changeAvatar } from '../../Controllers/User';
import Component from '../../services/Component';
import { ElementEvents } from '../../services/Component/types';

interface IProps {}

type Refs = {
  avatar: UploadFile;
};

export class LoadAvatar extends Component<IProps, Refs> {
  constructor(props: IProps = {}) {
    super({
      ...props,
      loadAvatar: (event: ElementEvents['submit']) => {
        event.preventDefault();

        const targets = event.target as unknown as Array<HTMLInputElement>;
        const file = targets[0]?.files?.[0];

        if (!file) return;

        changeAvatar({ avatar: file });
      },
    });
  }

  // onSubmit = (event: ElementEvents['submit']) => {
  //   if (props.onChange) {
  //     props.onChange(event);
  //   }
  // };

  render() {
    return `
        {{#> Modal}}
          <div class="loadAvatar shadow">
              <div class="loadAvatar_header">
                  {{{ Text size='large' weight='700' text='Загрузите файл' }}}
              </div>
                  {{{ UploadFile ref='avatar' id='avatar' formId='loadAvatarForm' name='avatar' onSubmit=loadAvatar }}}
              <div class="loadAvatar_actions">
                  {{{ Button label="Поменять" formFor='loadAvatarForm' submit=true type="primary" }}}
              </div>
          </div>
        {{/Modal}}
    `;
  }
}
