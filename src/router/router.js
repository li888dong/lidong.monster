import Vue from 'vue';
import Router from 'vue-router';
import _import from './_import';

Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: _import('Home'),
        },
        {
            path: '/room/:roomid/:account',
            name: 'room',
            component: _import('webrtc/room')
        },
        {
            path: '/many',
            name: 'many',
            component: _import('webrtc/many')
        },
        {
            path: '/flyline-svg',
            name: 'flyline-svg',
            component: _import('flyline/flyline-svg')
        },
        {
            path: '/flyline-canvas',
            name: 'flyline-canvas',
            component: _import('flyline/flyline-canvas')
        },
        {
            path: '/local1',
            name: 'local1',
            component: _import('webrtc/local1')
        },
        {
            path: '/Speech',
            name: 'Speech',
            component: _import('webrtc/Speech')
        },
        {
            path: '/transfer',
            name: 'transfer',
            component: _import('webrtc/transfer')
        },
        {
            path: '/remote1',
            name: 'remote1',
            component: _import('webrtc/remote1')
        },
        {
            path: '/palette',
            name: 'palette',
            component: _import('webrtc/palette')
        },
        {
            path: '/whiteboard',
            name: 'whiteboard',
            component: _import('webrtc/whiteboard')
        },
        {
            path: '/communication',
            name: 'communication',
            component: _import('communication/communication')
        },
        {
            path: '/responsive',
            name: 'responsive',
            component: _import('responsive/responsive')
        },
        {
            path:'/mixloading',
            name:'mixloading',
            component:_import('wondercss/MixBlendLoading')
        },
        {
            path:'/mixloading2',
            name:'mixloading2',
            component:_import('wondercss/mixloading2')
        },
        {
            path:'/logo1',
            name:'logo1',
            component:_import('wondercss/logo1')
        },
        {
            path:'/logo2',
            name:'logo2',
            component:_import('wondercss/logo2')
        },
    ],
});
