<template>
    <el-main>
      <div class="tpl-title">模板页</div>
      <FormInLine class="tpl-mg-t"></FormInLine>
      <ButtonInLine v-on="event.open"></ButtonInLine>
      <div class="tpl-mg">
        <TableList></TableList>
        <Pagination></Pagination>
      </div>
      <el-dialog title="创建新项" v-if="visible" :visible.sync="visible" width="65%" :close-on-click-modal="false" :close-on-press-escape="false">
        <FormInBlock v-on="event.close" :subKey="tValue"></FormInBlock>
      </el-dialog>
    </el-main>
</template>

<script>
  import FormInLine from './FormInLine.vue';
  import FormInBlock from './FormInBlock.vue';
  import TableList from './Table.vue';
  import Pagination from './Page.vue';
  import ButtonInLine from './ButtonInLine.vue';
  export default {
    components: {
      FormInLine, FormInBlock, TableList, Pagination, ButtonInLine
    },
    name: '',
    data () {
      return {
        visible: false,
        event: {
          open: {}, close: {}
        },
        tValue: 'tAbc'
      }
    },
    created () {
      this.$data.event.open['openDialog'] = () => {
        this.setFormVisible(true);
      };
      this.$data.event.close['closeDialog'] = () => {
        this.setFormVisible(false);
      };
    },
    methods: {
      setFormVisible (visible) {
        this.$data.visible = visible;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">
</style>
