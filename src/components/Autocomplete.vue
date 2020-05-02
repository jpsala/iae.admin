<template>
<div id="autocomplete-wraper" class="q-pa-md">
      <div class="title--md" >autocomplete component</div>
      <div class="flex  flex--center" style="justify-content: space-between">
        <pre class="">attrs:{{$attrs}}</pre>
        <pre class="">props:{{$props}}</pre>
    </div>
      <div  class="autocomplete q-pa-md">
          <button class="button button--outlined button--primary" @click="updateValue">Emit, usuario = 2</button>
      </div>
    </div>
</template>
<script>
import { toRefs, reactive } from 'vue';

export default {
  props: ['value'],
  model: {
    prop: 'value',
    event: 'update',
  },
  setup(props, { attrs, emit }) {
    console.log('props', props);
    console.log('attrs', attrs);
    const state = reactive({

    });
    const updateValue = () => {
      console.log('emit');
      emit('update', { id: 2, nombre: new Date().getSeconds() });
      // emit('update', 'hola');
    };
    return { updateValue, ...toRefs(state) };
  },
};
</script>

<style lang="scss">
#autocomplete-wraper{
  background-color: lightpink;
}
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
