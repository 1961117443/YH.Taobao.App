<template>
  <article-detail :is-edit="false" />
</template>

<script>
import ArticleDetail from './components/ProductDetail'

export default {
  name: 'CreateProduct',
  components: { ArticleDetail }
}
</script>

