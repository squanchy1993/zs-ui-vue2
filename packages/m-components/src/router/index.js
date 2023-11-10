import VueRouter from 'vue-router';
import Vue from 'vue';
import BasicExample from '@/views/TableLayout/BasicExample/index.vue';
import JsConfigExample from '@/views/TableLayout/JsConfigExample/index.vue';
import JsonConfigExample from '@/views/TableLayout/JsonConfigExample/index.vue';
import SetConfigExample from '@/views/TableLayout/SetConfigExample/index.vue';
import DesignTable from '@/views/TableLayout/DesignTable/index.vue';

Vue.use(VueRouter);
export const router = new VueRouter({
  routes: [
    {
      path: '/tableLayout/basicExample',
      component: BasicExample
    },
    {
      path: '/tableLayout/jsConfigExample',
      component: JsConfigExample
    },
    {
      path: '/tableLayout/jsonConfigExample/:id',
      component: JsonConfigExample
    },
    {
      path: '/tableLayout/setConfigExample',
      component: SetConfigExample
    },
    {
      path: '/tableLayout/DesignTable',
      component: DesignTable
    }
  ]
});
