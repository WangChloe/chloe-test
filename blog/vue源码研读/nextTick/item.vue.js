(function() {
    var tpl = "<h4>{{subtitle}}</h4>";

    Vue.component('item', {
        data: function() {
            return {
                subtitle: "子组件"
            }
        },
        props: [],
        template: tpl,
        beforeCreate: function() { // 实例初始化之后
            console.log("child: 子组件beforeCreate");
        },
        created: function() { // 实例创建完成之后被调用
            console.log("child: 子组件created");
        },

        beforeMount: function() { // 在挂载开始之前被调用
            console.log("child: 子组件beforeMount");
        },

        beforeUpdate: function() { // 数据更新时调用
            console.log("child: 子组件beforeUpdate");
        },

        updated: function() { // 数据更新之后调用
            var that = this;

            console.log("child: 子组件updated");
            this.$nextTick(function() {
                console.log("child: 子组件nextTick");
                console.log("child: 当前页面content:" + that.$el.textContent);
            });
        },
        mounted: function() { // el被新创建的vm.$el替换，挂载到实例上
            var that = this;

            console.log("child: 子组件mounted")

            // that.subtitle = "子组件更新";
            // console.log("child: 子组件更新");
            console.log("child: 当前页面content:" + that.$el.textContent);
        }
    });
})();