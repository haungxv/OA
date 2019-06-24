<template>
    <div class="receive-list">
        <receiveButton v-for="(obj,index) in list" :title="obj.title" :key="index" :isTrue="obj.isTrue"
                       :to="obj.path" :id="obj.id"></receiveButton>
        <div class="receive-border"></div>
    </div>
</template>

<script>
    import receiveButton from './receive-button.vue'

    export default {
        components: {
            receiveButton
        },
        data() {
            return {
                list: [
                    {
                        path: {name: 'receivePosts', query: {time: new Date().getTime()}},
                        title: '拟文',
                        isTrue: this.$store.state.role == 2,
                        id: 'rone'
                    }, {
                        path: {name: 'receiveDueout', query: {time: new Date().getTime()}},
                        title: '待发',
                        isTrue: this.$store.state.role == 2,
                        id: 'rtwo'
                    }, {
                        path: {name: 'receiveProcessing', query: {time: new Date().getTime()}},
                        title: '在办',
                        isTrue: true,
                        id: 'rthird'
                    }, {
                        path: {name: 'receiveApproval', query: {time: new Date().getTime()}},
                        title: '审批',
                        isTrue: this.$store.state.role == 0 || this.$store.state.role == 1,
                        id: 'rfour'
                    }, {
                        path: {name: 'receiveSign', query: {time: new Date().getTime()}},
                        title: '签发',
                        isTrue: this.$store.state.role == 2,
                        id: 'rfive'
                    }, {
                        path: {name: 'receiveRead', query: {time: new Date().getTime()}},
                        title: '传阅',
                        isTrue: this.$store.state.role == 2 || this.$store.state.role == 3,
                        id: 'rsix'
                    }, {
                        path: {name: 'receiveSecondApproval', query: {time: new Date().getTime()}},
                        title: '二审',
                        isTrue: this.$store.state.role == 1,
                        id: 'rseven'
                    }, {
                        path: {name: 'receiveDone', query: {time: new Date().getTime()}},
                        title: '已办结',
                        isTrue: this.$store.state.role == 2 || this.$store.state.role == 3,
                        id: 'reight'
                    }
                ]

            }
        }
    }
</script>

<style scoped>
    .receive-list {
        width: 95%;
        margin: 0 auto;
        background-color: white;
    }

    .receive-border {
        width: 100%;
        margin: 0 auto;
        border-bottom: 1px solid rgba(187, 187, 187, 1);
    }

    @media screen and (max-width: 768px) {
        a#rone, a#rtwo, a#reight, a#rthird {
            display: none;
        }
    }
</style>