<template>
  <detail :is-edit="false" />
</template>

<script>
import Detail from './components/PurchaseInDetail'

export default {
  name: 'CreatePurchaseIn',
  components: { Detail }
}
</script>

