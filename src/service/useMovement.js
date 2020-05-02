/* eslint-disable no-return-assign */
import { toRefs, reactive } from 'vue';

const useMovement = () => {
  let keyEnterFN = () => {};
  let keyEscapeFN = () => {};

  const state = reactive({
    cantidad: 0,
    index: undefined,
  });
  const onKeyEnter = (fn) => keyEnterFN = fn;
  const onKeyEscape = (fn) => keyEscapeFN = fn;
  const keydownHandler = (e) => {
    const { key } = e;
    if (key === 'Escape') keyEscapeFN();
    if (state.cantidad === 0) return;
    if (key === 'ArrowDown') state.index = state.index !== undefined ? state.index + 1 : 0;
    else if (key === 'ArrowUp') state.index = state.index !== undefined ? state.index - 1 : 0;
    else if (key === 'Enter') keyEnterFN();
    if (state.index > state.cantidad - 1) state.index = 0;
    if (state.index < 0) state.index = state.cantidad - 1;
  };
  return {
    keydownHandler, ...toRefs(state), onKeyEnter, onKeyEscape,
  };
};
export default useMovement;
