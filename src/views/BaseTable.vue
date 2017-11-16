<template>
    <el-main>
      <div class="tpl-title">模板页</div>
      <FormInLine class="tpl-mg-t"></FormInLine>
      <ButtonInLine></ButtonInLine>
      <div class="tpl-mg">
        <TableList></TableList>
        <Pagination></Pagination>
      </div>
      <el-dialog title="创建新项" :visible.sync="visible" width="65%" :close-on-click-modal="false" :close-on-press-escape="false">
        <FormInBlock></FormInBlock>
      </el-dialog>
    </el-main>
</template>

<script>
  import FormInLine from './template/FormInLine.vue';
  import FormInBlock from './template/FormInBlock.vue';
  import TableList from './template/Table.vue';
  import Pagination from './template/Page.vue';
  import ButtonInLine from './template/ButtonInLine.vue';
  export default {
    components: {
      FormInLine, FormInBlock, TableList, Pagination, ButtonInLine
    },
    name: '',
    data () {
      return {
        visible: false
      }
    },
    created () {
      this.$root.$on('open', () => {
        this.setFormVisible(true);
      });
      this.$root.$on('close', () => {
        this.setFormVisible(false);
      });
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
