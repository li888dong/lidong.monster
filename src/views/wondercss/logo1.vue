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
        background: url('https://yyb.gtimg.com/aiplat/page/product/visionimgidy/img/demo6-16a47e5d31.jpg?max_age=31536000'), cyan;
        background-blend-mode: lighten;
        background-position: 0;
        background-size: contain;
        background-repeat: no-repeat;
        &:after {
            content: '';
            position: absolute;
            left: 15px;
            width: 200px;
            height: 300px;
            z-index: 3;
            background: url('https://yyb.gtimg.com/aiplat/page/product/visionimgidy/img/demo6-16a47e5d31.jpg?max_age=31536000'), red;
            background-blend-mode: lighten;
            margin-left: 10px;
            background-position: 0;
            mix-blend-mode: darken;
            background-size: contain;
            background-repeat: no-repeat;
        }
    }
</style>