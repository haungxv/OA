<template>
    <div class="dispatch-list">
        <DispatchButton v-for="(obj,index) in list" :title="obj.title" :isTrue="obj.isTrue" :key="index" :id="obj.id"
                        :to="obj.path"></DispatchButton>
        <div class="dispatch-border"></div>
    </div>
</template>

<script>
    import DispatchButton from './dispatch-button.vue'

    export default {
        components: {
            DispatchButton
        },
        data() {

            return {

                list: [
                    {
                        path: {name: 'posts', query: {time: new Date().getTime()}},
                        title: '拟文',
                        id: 'one',
                        isTrue: this.$store.state.role == 2 || this.$store.state.role == 3
                    }, {
                        path: {name: 'dueout', query: {time: new Date().getTime()}},
                        title: '待发',
                        id: 'two',
                        isTrue: this.$store.state.role == 2 || this.$store.state.role == 3
                    }, {
                        path: {name: 'processing', query: {time: new Date().getTime()}},
                        title: '在办',
                        id: 'third',
                        isTrue: true
                    }, {
                        path: {name: 'approval', query: {time: new Date().getTime()}},
                        title: '审批',
                        id: 'four',
                        isTrue: this.$store.state.role == 0 || this.$store.state.role == 1
                    }, {
                        path: {name: 'sign', query: {time: new Date().getTime()}},
                        title: '签发',
                        id: 'five',
                        isTrue: this.$store.state.role == 2
                    }, {
                        path: {name: 'read', query: {time: new Date().getTime()}},
                        title: '传阅',
                        id: 'six',
                        isTrue: this.$store.state.role == 2 || this.$store.state.role == 3
                    }, {
                        path: {name: 'secondApproval', query: {time: new Date().getTime()}},
                        title: '二审',
                        id: 'seven',
                        isTrue: this.$store.state.role == 1
                    }, {
                        path: {name: 'done', query: {time: new Date().getTime()}},
                        title: '已办结',
                        id: 'eight',
                        isTrue: this.$store.state.role == 2 || this.$store.state.role == 3
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .dispatch-list {
        width: 95%;
        margin: 0 auto;
        background-color: white;
    }

    .dispatch-border {
        width: 100%;
        margin: 0 auto;
        border-bottom: 1px solid rgba(187, 187, 187, 1);
    }

    @media screen and (max-width: 768px) {
        a#one,a#two,a#eight,a#third {
            display: none;
        }
    }
</style>