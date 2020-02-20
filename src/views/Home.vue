<template>
    <div class="home">

        <logo></logo>
        <div class="center">
            <div><router-link :to="{name: 'remote1'}">WebRTC  1 v 1 网络对等连接</router-link></div>
            <div><router-link :to="{name: 'mixloading'}">mixblendloading</router-link></div>
            <div><router-link :to="{name: 'mixloading2'}">mixblendloading2</router-link></div>
            <div><router-link :to="{name: 'logo1'}">logo1</router-link></div>
            <div><router-link :to="{name: 'logo2'}">logo2</router-link></div>
        </div>
    </div>
</template>

<script>
    import logo from './wondercss/logo2'
    export default {
        name: 'home',
        data() {
            return {
                sdata: []
            }
        },
        components:{
            logo
        },
        watch: {
        },
        methods: {
        },
        mounted() {
        }
    };
</script>

<style lang="scss" scoped>
    .home{
        text-align: center;
        .github-logo{
            position: absolute;
            right: 0;
            top: 0;
            width: 120px;
            height: 120px;
            z-index: 1;
            background-image: url("../assets/github.png");
            background-size: contain;
            background-position: 10px -8px;
            background-repeat: no-repeat;
            display: block;
        }
    }
    .center{
        margin: auto;
        font-size: 18px;
        border: 1px solid #ddd;
        margin-top: 100px;
        position: relative;
        a{
            color: #fff;
        }
        div{
            line-height: 48px;
            border-bottom: 1px solid #ddd;
            cursor: pointer;
        }
        div:last-child{
            border-bottom: none;
        }
        div:hover{
            background-color: #25b25e;
            a{
                display: block;
                color: #fff;
            }
        }
    }

    .fork-me-on-github{
        width: 0;
        height: 0;
        position: absolute;
        right: 0;
        top:0;
        border-right: 60px solid rgba(37, 178, 94, 0.8);
        border-top: 60px solid rgba(37, 178, 94, 0.8);
        border-bottom: 60px solid #fff;
        border-left: 60px solid #fff;
    }
    .edit-div{
        width: 200px;
        height: 200px;
        display: table-cell;
        vertical-align: middle;
        border: 1px solid #000;
    }
</style>
