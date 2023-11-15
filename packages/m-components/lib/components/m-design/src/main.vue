<!--
    new elFormItemModel({
        title: "选择器",
        keywords: "test2",
        elType: "MSelectPicker",
        options: {
        pickerItems: [
            { label: "继续前进", value: "CONTINUE" },
            { label: "暂停行进", value: "STOP" },
        ],
        },
    })
-->

<template>
  <div class="m-design">
    <DesignTable />
  </div>
</template>

<script>
import DesignTable from './component/design-table/design-table';
export default {
  name: 'MDesign',
  components: {
    DesignTable
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped></style>
