import Component from '../../services/Component';

interface IProps {
  src?: string;
  alt?: string;
  onClick?: () => void;
  events: {
    click: () => void;
  };
}

export class Avatar extends Component<IProps> {
  constructor({ onClick, ...props }: IProps) {
    const click = () => {
      onClick?.();
    };

    super({
      ...props,
      events: {
        click,
      },
    });
  }

  protected render(): string {
    const { src = '', alt = '' } = this.props;

    const image = `<img src="https://ya-praktikum.tech/api/v2/resources${src}" alt="${alt}" />`;
    const empty = `{{> EmptyAvatar}}`;
    return `
      <div class="avatar">
        ${src ? image : empty}
      </div>
    `;
  }
}
