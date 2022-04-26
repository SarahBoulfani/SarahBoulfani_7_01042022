<template>
    <div class="alert alert-danger" role="alerte">
        {{ e }}
    </div>
</template>
<script>
export default {
    name: 'ErrorMsg',
    props: ['e']
}
</script>