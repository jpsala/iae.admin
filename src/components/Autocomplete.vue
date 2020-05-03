<template>
    <div class="autocomplete" :id="thisCompID">
      <div class="control">
        <input :placeholder="placeholder" class="control__input" type="text" v-bind="$attrs"
          v-model="filterInput" @keydown="keydownHandler" />
      </div>
      <div class="options-wraper" v-show="filteredItems.length">
        <div class="options">
          <div :class="{'is-active': index === activeIndex}" :key="index" @click="onClick(item)"
            class="option" v-for="(item, index) of filteredItems">
            <slot name="option" v-bind:option="item">
              {{item.apellido}},
              {{item.nombre}}
            </slot>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
/* eslint-disable object-curly-newline */
import { toRefs, reactive, onBeforeMount, onMounted, onUnmounted, watch } from 'vue';
import { debounce, uniqueID } from '../service/helpers';
import useMovement from '../service/useMovement';

export default {
  props: {
    value: { default: undefined },
    options: { default: [], as: 'parentOptions' },
    minChars: { default: 3, type: Number },
    optionLabel: { default: 'nombre' },
    optionId: { default: 'id' },
  },
  setup(props, { emit }) {
    const state = reactive({
      items: [],
      filteredItems: [],
      filterInput: '',
      placeholder: '',
      activeIndex: undefined,
      thisCompID: uniqueID(),

    });
    const filterChanged = async (filterInput) => {
      if (filterInput.length < props.minChars) {
        state.filteredItems = [];
        return;
      }
      if (typeof state.items === 'function') {
        state.filteredItems = await state.items(filterInput);
      } else {
        state.filteredItems = state.items.filterInput(
          (option) => option[props.searchKey]
            .toLowerCase()
            .indexOf(filterInput.toLowerCase()) > -1,
        );
      }
    };
    const clearState = () => {
      state.filterInput = '';
      state.filteredItems = [];
    };
    const selectOption = (option) => {
      emit('update', option);
      // state.placeholder = option[props.optionLabel];
      clearState();
    };
    const movement = useMovement();
    movement.onKeyEscape(() => clearState());
    movement.onKeyEnter((index) => selectOption(state.filteredItems[index]));
    const onClick = selectOption;
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
    watch(() => state.filterInput, debounce((filterInput) => filterChanged(filterInput), 500));
    watch(() => state.filteredItems.length, (length) => movement.setCantItems(length));
    watch(movement.index, scrollIntoView);
    watch(() => props.value, (v) => { state.placeholder = v[props.optionLabel]; }, { immediate: true });
    onBeforeMount(async () => { state.items = props.options; });
    // onMounted(() => { state.filterInput = 'sala'; });
    onMounted(() => document.addEventListener('click', documentClick));
    onUnmounted(() => document.removeEventListener('click', documentClick));

    return { onClick,
      ...toRefs(state),
      activeIndex: movement.index,
      keydownHandler: movement.keydownHandler };
  },
};
</script>

<style lang="scss">
#autocomplete-wraper {
    background-color: lightpink;
}
.autocomplete {
    display: inline-block;
    position: relative;
    width: 100%;
    input {
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
        position: absolute;
        .options {
            overflow-y: auto;
            overflow-x: hidden;
            max-height: 250px;
            padding: 10px;
            width: 300px;
        }
        .options .option {
            padding: 5px;
            display: block;
            border-radius: 2px;
            cursor: pointer;
        }
        .options .option:hover,
        .options .is-active {
            background-color: #dedede;
        }
    }
}
.autocomplete {
    display: inline-block;
    position: relative;
    width: 100%;
    input {
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
        position: absolute;
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
        .options .option:hover,
        .options .is-active {
            background-color: #dedede;
        }
    }
}
</style>
