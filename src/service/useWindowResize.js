/* eslint-disable object-curly-newline */
/* eslint-disable no-use-before-define */
import { ref, onMounted, onUnmounted, onBeforeMount } from 'vue';
import { throttle } from './helpers';

const Screen = ref({ lt: {}, gt: {} });
const setScreenValues = (data) => {
  if (!data) {
    console.log('data', data);
    return;
  }
  Screen.value.X = data.ScreenX;
  Screen.value.Y = data.ScreenY;
  Screen.value.width = data.innerWidth;
  if (data.innerWidth < 600) {
    Screen.value.name = 'xs';
    Screen.value.xs = true;
    Screen.value.sm = false;
    Screen.value.md = false;
    Screen.value.lg = false;
    Screen.value.xl = false;
    Screen.value.lt.sm = true;
    Screen.value.lt.md = true;
    Screen.value.lt.lg = true;
    Screen.value.lt.xl = true;
    Screen.value.gt.xs = false;
    Screen.value.gt.sm = false;
    Screen.value.gt.md = false;
    Screen.value.gt.lg = false;
    Screen.value.gt.xl = false;
  } else if (data.innerWidth < 1024) {
    Screen.value.name = 'sm';
    Screen.value.xs = false;
    Screen.value.sm = true;
    Screen.value.md = false;
    Screen.value.lg = false;
    Screen.value.xl = false;
    Screen.value.lt.sm = false;
    Screen.value.lt.md = true;
    Screen.value.lt.lg = true;
    Screen.value.lt.xl = true;
    Screen.value.gt.xs = true;
    Screen.value.gt.sm = false;
    Screen.value.gt.md = false;
    Screen.value.gt.lg = false;
    Screen.value.gt.xl = false;
  } else if (data.innerWidth < 1440) {
    Screen.value.name = 'md';
    Screen.value.xs = false;
    Screen.value.sm = false;
    Screen.value.md = true;
    Screen.value.lg = false;
    Screen.value.xl = false;
    Screen.value.lt.sm = false;
    Screen.value.lt.md = false;
    Screen.value.lt.lg = true;
    Screen.value.lt.xl = true;
    Screen.value.gt.xs = true;
    Screen.value.gt.sm = true;
    Screen.value.gt.md = false;
    Screen.value.gt.lg = false;
    Screen.value.gt.xl = false;
  } else {
    Screen.value.name = 'xl';
    Screen.value.xs = false;
    Screen.value.sm = false;
    Screen.value.md = false;
    Screen.value.lg = false;
    Screen.value.xl = true;
    Screen.value.lt.sm = false;
    Screen.value.lt.md = false;
    Screen.value.lt.lg = false;
    Screen.value.lt.xl = false;
    Screen.value.gt.xs = true;
    Screen.value.gt.sm = true;
    Screen.value.gt.md = true;
    Screen.value.gt.lg = true;
    Screen.value.gt.xl = false;
  }
};
const windowResize = (e) => setScreenValues(e.target);
export default () => {
  onBeforeMount(() => setScreenValues(window));
  onMounted(() => {
    setScreenValues(window);
    window.addEventListener('resize', throttle(windowResize, 200));
  });
  onUnmounted(() => {
    window.removeEventListener('resize', throttle(windowResize, 200));
  });
  return Screen;
};


/*
import { toRefs, reactive } from "@vue/composition-api"
const useAutoComplete = (options, key) => {
  let state = reactive({
    userInput: "",
    filteredSuggestions: [],
    suggestions: options,
    selectedItem: {}
  });

  let selected = _item => {
    state.userInput = _item[key];
    state.filteredSuggestions = [];
    state.selectedItem = { userInput: state.userInput, item: _item };
  };

  let onChange = _event => {
    let i = state.userInput;
    state.selectedItem = { userInput: state.userInput, item: null };
    if (i.length === 0) {
      state.filteredSuggestions = [];
      return;
    }
    const r = state.suggestions.filter(
      suggestion => suggestion[key].toLowerCase().indexOf(i.toLowerCase()) > -1
    );
    console.log(r);
    state.filteredSuggestions = r;
  };
  return {
    ...toRefs(state),
    selected,
    onChange
  };
};

export default useAutoComplete;
*/
