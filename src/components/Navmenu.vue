<template>
  <ul class="list list--unstyled list--nulled q-mt-xxs title-set">
    <!-- <li v-if="itemParent" class="list__item item-parent" @click="back">
    </li> -->
    <li v-if="itemParent" class="list__item item-parent item" @click="back">
      <i class="item  icon-keyboard_backspace" />
      <span class="active-title">{{isRootPath(itemParent.to) ? itemActive.title : itemParent.title}}</span>
      <span class="active-det list__item__det">{{isRootPath(itemParent.to) ? itemActive.det : itemParent.det}}</span>
      <hr v-if="items && items.length>0" style="margin: 5px 0 20px 0" />
    </li>
    <template v-if="loggedIn">
      <li class="list__item" v-for="(i, idx) in items" :key="idx">
        <span class="item" @click="itemClick(i)">{{i.title}}</span>
        <span class="list__item__det">{{i.det}}</span>
      </li>
    </template>
  </ul>
</template>

<script>
/* eslint-disable no-restricted-syntax */
import { reactive, ref, toRefs } from 'vue';
import router from '../router';
import useSession from '../service/useSession';
import menuJson from '../menu.json';

const state = reactive({
    itemActive: undefined,
    itemParent: undefined,
    items: [],
    rootItem: menuJson,
});
const findItemByPath = (path, items = [state.rootItem], parent) => {
    for (const item of items) {
        if (item.to === path) return { item, parent };
        if (item.items?.length > 0) {
            const encontrada = findItemByPath(path, item.items, item);
            if (encontrada) {
                return encontrada;
            }
        }
    }
    return false;
};
export default {
    setup() {
        const { loggedIn } = useSession();
        const itemClick = (item) => {
            if (item.items) {
                state.items = item.items ?? state.rootItem;
                if (item.default) {
                    router.push(item.default);
                    return;
                }
            }
            state.items = ref(state.rootItem);
            if (item.to) router.push(item.to);
        };
        const isRootPath = (path) => path === state.rootItem.to;
        const back = () => {
            if (!state.itemParent) return;
            const defaultRoute = state.itemParent?.default;
            if (defaultRoute) {
                const item = findItemByPath(state.itemParent.to);
                if (item.parent) {
                    router.push(item.parent.to);
                    return;
                }
            }
            router.push(state.itemParent.to);
        };
        const onRouteChanged = () => {
            const currentRoute = router.currentRoute.value;
            const item = findItemByPath(currentRoute.path);
            if (!item) {
                state.itemParent = undefined;// ?? state.rootItem;
                state.items = state.rootItem.items;
                state.itemActive = state.rootItem;
                // @TODO: avisar cuando la ruta no existe en rootItem??
                console.error('avisar cuando la ruta no existe en rootItem??');
                return;
            }
            state.itemParent = item.parent;
            state.items = item.item.items?.length > 0 ? item.item.items : state.itemParent?.items;
            state.itemActive = item.item;
        };
        router.afterEach(onRouteChanged);
        return {
            ...toRefs(state), itemClick, back, loggedIn, isRootPath,
        };
    },
};
</script>

<style lang="scss">
    ul {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
    .list__item__det {
        color: gray;
        margin-left: 12px;
        word-break: normal;
        max-width: 160px;
        display: block;
        width: 160px;
        font-size: 14px;
    }
    .item {
        cursor: pointer;
        color: #0074d9;
    }
    .item-parent {
        margin-bottom: 10px;
        .icon-keyboard_backspace {
            font-size: 2rem;
        }
        .active-title {
            font-size: 1.3rem;
            margin-left: 10px;
        }
    }


</style>
