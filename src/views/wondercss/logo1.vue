<template>
    <div class="mix3d"></div>
</template>

<script>
    export default {
        name: "logo1"
    }
</script>

<style lang="scss" scoped>
    .mix3d {
        margin: 30px;
        width: 200px;
        height: 300px;
        z-index: 2;
        background-blend-mode: lighten;
        background-size: contain;
        background: cyan url('https://lidong.monster/img/李栋1.png') no-repeat 0;
        &:after {
            content: '';
            position: absolute;
            left: 15px;
            width: 200px;
            height: 300px;
            z-index: 3;
            background-blend-mode: lighten;
            margin-left: 10px;
            mix-blend-mode: darken;
            background-size: contain;
            background: red url('https://lidong.monster/img/李栋1.png') no-repeat 0;
        }
    }
</style>