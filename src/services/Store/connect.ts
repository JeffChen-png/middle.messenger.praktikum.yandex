import { isEqual } from '../../utils';
import { ComponentClass, TRefsBase } from '../Component';
import { TPropsBase } from '../Component/types';
import { AppState } from './AppState';
import { StoreEvents } from './store';

export function connect(mapStateToProps: (state: AppState) => Partial<AppState>) {
  // eslint-disable-next-line func-names
  return function <P extends TPropsBase = any, R extends TRefsBase = any>(Component: ComponentClass<P, R>) {
    return class extends Component {
      private onChangeStoreCallback: () => void;

      constructor(props: P) {
        const { store } = window;
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        this.onChangeStoreCallback = () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            const newProps = { ...newState } as P;
            this.setProps({ ...newProps });
          }

          // не забываем сохранить новое состояние
          state = newState;
        };

        // подписываемся на событие
        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      componentDidUnmount() {
        super.componentDidUnmount();
        window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}
