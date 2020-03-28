<template>
    <div>
        <pie-chart :data="data" :animation='false' :legend='true' label-position='center'/>
    </div>
</template>

<script>
export default {
    props: ['data'],
}
</script>

<style>

</style>