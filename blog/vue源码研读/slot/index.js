(function() {
    Vue.component('first-child', {
        template: '<div>' +
            '<p>子组件非slot内容</p>' +
            '<slot><p>子组件插入的内容</p></slot>' +
            '</div>'
    });

    var app1 = new Vue({
        el: "#J_app1",
        data: {
            title: "父组件内容"
        }

    });

    Vue.component('second-child', {
        template: '<div class="container">' +
            '<div class="header">' +
            '<slot name="header"></slot>' +
            '</div>' +
            '<div class="main">' +
            '<slot><p>子组件content</p></slot>' +
            '</div>' +
            '<div class="footer">' +
            '<slot name="footer"></slot>' +
            '</div>' +
            '</div>'
    });

    var app2 = new Vue({
        el: "#J_app2",
        data: {}
    });

    Vue.component('third-child', {
        template: '<div class="container">' +
            '<slot msg="子组件msg" ding="子组件ding"><p>子组件content</p></slot>' +
            '</div>'
    });

    var app3 = new Vue({
        el: "#J_app3",
        data: {}
    });

    Vue.component('child1', {
        template: "<p>this is child1</p>"
    })
    Vue.component('child2', {
        template: "<p>this is child2</p>"
    })
    var app4 = new Vue({
        el: "#J_app4",
        data: {
            active: 0,
            currentView: 'child1',
            tabs: [{
                type: 'tab1',
                view: 'child1'
            }, {
                type: 'tab2',
                view: 'child2'
            }]
        },
        methods: {
            toggle(i, v) {
                this.active = i
                this.currentView = v
            }
        }
    })
})();