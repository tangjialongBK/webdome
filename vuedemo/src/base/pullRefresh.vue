<template>
  <div>
    <pull-to :top-load-method="refresh">

    </pull-to>
  </div>
</template>

<script>
  import PullTo from 'vue-pull-to'
  import { fetchDataList } from 'api'

  export default {
    name: 'example',
    components: {
      PullTo
    },
    data() {
      return {
        dataList: []
      }
    },
    methods: {
      refresh(loaded) {
        fetchDataList()
          .then((res) => {
            this.dataList = res.data.dataList
            loaded('done')
          })
      }
    }
  }
</script>
