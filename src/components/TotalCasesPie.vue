<template>
    <div>
        <pie-chart :data="data" :animation='false' :legend='true' label-position='outside'/>
    </div>
</template>

<script>
export default {
    props: ['data'],
}
</script>

<style>

</style>