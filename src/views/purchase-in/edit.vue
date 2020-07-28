<template>
  <detail :is-edit="true" />
</template>

<script>
import Detail from './components/PurchaseInDetail'

export default {
  name: 'EditForm',
  components: { Detail }
}
</script>

