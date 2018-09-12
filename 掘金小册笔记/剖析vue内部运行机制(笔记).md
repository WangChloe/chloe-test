render function touch（触发） 依赖数据的getter，进而被该数据收集依赖；
render function 执行后生成 vNode，vNode经过新旧对比生成patch，最终将patch应用到真实DOM上