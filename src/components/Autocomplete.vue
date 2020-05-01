<template>
<div  class="autocomplete" :id="thisCompID">
    <div class="control">
        <input v-bind="$attrs" v-model="userInput"
              :placeholder="placeholder" class="control__input" type="text" @keydown="keydownHandler">
    </div>
    <div class="options-wraper" v-show="filteredOptions.length">
      <div class="options">
        <div v-for="(option, index) of filteredOptions" :key="index"
                class="option" @click="onClick(option)" :class="{'is-active': index === activeOptionIndex}">
            {{parseOption(option)}}
        </div>
      </div>
    </div>
</div>
</template>

<script>
/* eslint-disable object-curly-newline */
import { reactive, toRefs, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { uniqueID } from '../service/helpers';
import useMovement from '../service/useKeydown';


export default {
  props: {
    options: { default: [] },
    clave: { default: '' },
    option: { default: '' },
    minLength: { default: 2 },
    placeholder: { default: '' },
  },
  setup(props, { emit }) {
    const state = reactive({
      options: props.options,
      filteredOptions: [],
      selectedOption: {},
      activeOptionIndex: undefined,
      userInput: '',
      placeholder: undefined,
      thisCompID: uniqueID(),
    });
    const { keydownHandler, onKeyEnter, onKeyEscape,
      index: activeOptionIndex, cantidad: cantFilteredItems } = useMovement();
    const clearState = () => {
      state.userInput = '';
      state.filteredOptions = [];
    };
    const showPlaceholder = (option) => {
      if (props.placeholder) {
        if (typeof (props.placeholder) === 'function') {
          state.placeholder = props.placeholder(option);
          return;
        }
        state.placeholder = option[props.placeholder];
      } else {
        state.placeholder = parseOption(option);
      }
    };
    const selectOption = (option) => {
      emit('select', option);
      clearState();
      showPlaceholder(option);
    };
    onKeyEscape(() => clearState());
    onKeyEnter(() => selectOption(state.filteredOptions[activeOptionIndex.value]));
    const onClick = selectOption;
    const onUserInputChange = async () => {
      const i = state.userInput;
      state.selectedOption = { userInput: state.userInput, item: null };
      if (i.length === 0) {
        state.filteredOptions = [];
        activeOptionIndex.value = undefined;
        return;
      }
      if (i.length < props.minLength) return;
      if (typeof (state.options) === 'function') {
        state.filteredOptions = await state.options(state.userInput);
      } else {
        const r = state.options.filter(
          (option) => option[props.clave].toLowerCase().indexOf(i.toLowerCase()) > -1,
        );
        state.filteredOptions = r;
      }
      nextTick(() => {
        chkIfInsideViewport();
      });
      cantFilteredItems.value = state.filteredOptions.length;
    };
    const parseOption = (option) => (typeof (props.option) === 'function' ? props.option(option) : option[props.option]);
    const documentClick = (e) => {
      const { target } = e;
      const clickInsideThisComp = document.getElementById(state.thisCompID).querySelector('input').contains(target);
      if (clickInsideThisComp) return;
      clearState();
    };
    const chkIfInsideViewport = () => {
      const element = document.getElementById(state.thisCompID).querySelector('.options-wraper');
      const boundaries = element.getBoundingClientRect();
      if (boundaries.bottom > window.innerHeight) {
        element.style.top = '-255px';
      }
      console.log('boundaries.top', boundaries.top);
      nextTick(() => {
        const boundaries2 = element.getBoundingClientRect();
        if (boundaries2.top < 0) {
          element.style.top = '40px';
        }
      });
      return false;
    };
    const scrollIntoView = () => {
      setTimeout(() => {
        const element = document.getElementById(state.thisCompID).querySelector('.is-active');
        if (element) element.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }, 50);
    };
    onMounted(() => document.addEventListener('click', documentClick));
    onUnmounted(() => document.removeEventListener('click', documentClick));
    // onMounted(() => {
    //   state.userInput = 'sala';
    //   setTimeout(() => {
    //     keydownHandler({ key: 'ArrowDown' });
    //   }, 300);
    // });
    watch(() => state.userInput, (i) => onUserInputChange(i));
    watch(activeOptionIndex, scrollIntoView);
    return { ...toRefs(state), activeOptionIndex, onUserInputChange, onClick, parseOption, keydownHandler };
  },
};
</script>

<style lang="scss">
.autocomplete{
  display: inline-block;
  position: relative;
  width: 100%;
    input{
      width: 250px;
    }
  .options-wraper {
      background-color: white;
      box-shadow: 3px 2px 3px 0px #b5b5c7bf;
      border: 1px solid #0000002e;
      // left: 0;
      // top: 50px;
      // padding: 10px 0 10px 10px;
      // max-height: 233px;
      position:   absolute;
  }
  .options {
      overflow-y: auto;
      overflow-x: hidden;
      max-height: 250px;
      padding: 10px;
  }
  .options .option {
    padding: 5px;
    display: block;
    border-radius: 2px;
  }
  .options .option:hover, .options .is-active {
      background-color: #dedede;
  }
}
</style>
