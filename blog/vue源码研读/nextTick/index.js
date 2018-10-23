(function() {
    var app = new Vue({
        el: "#J_app",
        data: {
            title: "父组件"
        },

        beforeCreate: function() { // 实例初始化之后
            console.log("parent: 父组件beforeCreate");
        },
        created: function() { // 实例创建完成之后被调用
            console.log("parent: 父组件created");
        },

        beforeMount: function() { // 在挂载开始之前被调用
            console.log("parent: 父组件beforeMount");
        },

        beforeUpdate: function() { // 数据更新时调用
            console.log("parent: 父组件beforeUpdate");
        },

        updated: function() { // 数据更新之后调用
             var that = this;

            console.log("parent: 父组件updated");
            this.$nextTick(function() {
                console.log("parent: 父组件nextTick");
                console.log("parent: 当前页面content:" + that.$el.textContent);
            });
        },

        mounted: function() { // el被新创建的vm.$el替换，挂载到实例上
            var that = this;

            console.log("parent: 父组件mounted");
            console.log("parent: 子组件content:" + that.$refs.item.subtitle);

            that.title = "父组件更新";
            console.log("parent: 父组件更新");
            console.log("parent: 当前页面content:" + that.$el.textContent);
        }
    });
})();