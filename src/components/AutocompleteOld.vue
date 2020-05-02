<template>
<div  class="autocomplete" :id="thisCompID">
    <div class="control">
        <input v-bind="$attrs" v-model="userInput" :placeholder="placeholder"
                     class="control__input" type="text" @keydown="keydownHandler">
    </div>
    <div class="options-wraper" v-show="filteredOptions.length">
      <div class="options">
        <div v-for="(option, index) of filteredOptions" :key="index"
                class="option" @click="onClick(option)" :class="{'is-active': index === activeOptionIndex}">
            <slot name="option" v-bind:option="option">
              {{showOnSuccess(option)}}
            </slot>
        </div>
      </div>
    </div>
</div>
</template>
<script>
/* eslint-disable object-curly-newline */
import { reactive, toRefs, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { uniqueID, debounce } from '../service/helpers';
import useMovement from '../service/useMovement';


export default {
  props: {
    options: { default: [] },
    searchKey: undefined,
    minLength: { default: 3 },
    showOnSuccess: undefined,
    value: undefined,
  },
  setup(props, { emit }) {
    const state = reactive({
      options: props.options,
      filteredOptions: [],
      activeOptionIndex: undefined,
      userInput: '',
      placeholder: undefined,
      thisCompID: uniqueID(),
      showOnSuccess: undefined,
    });
    if (!props.showOnSuccess && !props.searchKey) console.warn('Autocomplete: Asigne showOnSuccess');
    if (props.showOnSuccess === undefined) {
      state.showOnSuccess = (option) => (props.searchKey ? option[props.searchKey] : 'Asigne showOnSuccess o searchKey');
    } else if (typeof (props.showOnSuccess) === 'string') {
      state.showOnSuccess = (option) => option[props.showOnSuccess];
    } else state.showOnSuccess = props.showOnSuccess; // is a func
    // if (props.value) state.placeholder = typeof (props.value) === 'string' ? props.value : props.showOnSuccess(props.value);

    const { keydownHandler, onKeyEnter, onKeyEscape,
      index: activeOptionIndex, cantidad: cantFilteredItemsForMovement } = useMovement();
    const clearState = () => {
      state.userInput = '';
      state.filteredOptions = [];
    };
    const selectOption = (option) => {
      emit('onchange', option);
      clearState();
      state.placeholder = state.showOnSuccess(option);
    };
    onKeyEscape(() => clearState());
    onKeyEnter(() => selectOption(state.filteredOptions[activeOptionIndex.value]));
    const onClick = selectOption;
    const chkIfInsideViewport = () => {
      const element = document.getElementById(state.thisCompID).querySelector('.options-wraper');
      const boundaries = element.getBoundingClientRect();
      if (boundaries.bottom > window.innerHeight) {
        element.style.top = '-255px';
      }
      nextTick(() => {
        const boundaries2 = element.getBoundingClientRect();
        if (boundaries2.top < 0) {
          element.style.top = '40px';
        }
      });
      return false;
    };
    const onUserInputChange = async (userInput) => {
      if (userInput.length < props.minLength) {
        state.filteredOptions = [];
        return;
      }
      if (typeof (state.options) === 'function') {
        state.filteredOptions = await state.options(state.userInput);
      } else {
        state.filteredOptions = state.options.filter(
          (option) => option[props.searchKey].toLowerCase().indexOf(userInput.toLowerCase()) > -1,
        );
      }
      chkIfInsideViewport();
    };
    const documentClick = (e) => {
      const { target } = e;
      const clickInsideThisComp = document.getElementById(state.thisCompID).querySelector('input').contains(target);
      if (clickInsideThisComp) return;
      clearState();
    };
    const scrollIntoView = () => {
      setTimeout(() => {
        const element = document.getElementById(state.thisCompID).querySelector('.is-active');
        if (element) element.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }, 50);
    };
    onMounted(() => document.addEventListener('click', documentClick));
    // onMounted(() => { state.userInput = 'sala'; });
    onUnmounted(() => document.removeEventListener('click', documentClick));
    watch(() => state.filteredOptions.length, (length) => { cantFilteredItemsForMovement.value = length; });
    watch(() => state.userInput, debounce((userInput) => onUserInputChange(userInput), 500));
    watch(() => props.value, (value) => { selectOption(value); }, { immediate: true });
    watch(activeOptionIndex, scrollIntoView);
    return { ...toRefs(state), activeOptionIndex, onClick, keydownHandler };
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
      cursor: pointer;
    }
    .options .option:hover, .options .is-active {
        background-color: #dedede;
    }
  }
}
</style>
