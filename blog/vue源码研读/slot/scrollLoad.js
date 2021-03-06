export default {
  data() {
    return {
      page: 1,
      isLoading: false,
      busy: false,
      isFirstLoad: false
    }
  },
  props: {
    pageSize: {
      default: 10 // 每页展示多少条数据
    },
    total: {
      default: 0 // 总共多少条记录
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.addScrollListener()
  },
  methods: {
    addScrollListener() {
      // 添加监听滚动操作，用到函数防抖
      this.scrollFn = Tool.throttle(this.onScroll, 30, 30)
      document.addEventListener('scroll', this.scrollFn, false)
    },
    getList() {
      // 正在拉取数据或者没有数据了，则取消滚动监听
      if(this.isLoading || this.isFirstLoad && (this.page > this.totalPage)) {
        document.removeEventListener('scroll', this.scrollFn, false)
        return
      }
      this.busy = true
      this.isLoading = true
      // 通知父组件去拉取更多数据
      this.$emit("getList", this.page, () => {
        this.isFirstLoad = true
        this.isLoading = false
        this.page++
      }, () => {
        Toast.show('网络错误，请稍后重试')
        this.total = 0
        this.isLoading = false
      })
    },
    reset() {
      // 重新拉取数据
      this.page = 1
      this.total = 0
      this.isLoading = false
      this.isFirstLoad = false
      this.addScrollListener()
      this.getList()
    },
    onScroll() {
      // 到底拉取更多数据 
      if(Tool.touchBottom()) {
        this.getList()
      }
    }
  }
}