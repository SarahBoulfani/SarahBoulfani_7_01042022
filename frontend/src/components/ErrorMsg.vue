<template>
    <div class="alert alert-danger" role="alerte">
        {{ error }}
    </div>
</template>
<script>
export default {
    name: 'ErrorMsg',
    props: ['error']
}
</script>