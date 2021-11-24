
const fs = require('fs');

let typora_path = "D:\\app\\Typora\\Typora.exe"
let note_dir_path = "D:\\document\\notebooks\\"
let exec = require("child_process").exec;

let files = fs.readdirSync(note_dir_path)

let list = []
files.forEach(value => {
   if(!value.startsWith(".") && value !== "order.json"){
      list[list.length] = {
         title: value
      }
   }
})

window.exports = {
   "note": { // 注意：键对应的是 plugin.json 中的 features.code
      mode: "list",  // 列表模式
      args: {
         // 进入插件时调用（可选）
         enter: (action, callbackSetList) => {
            // 如果进入插件就要显示列表数据
            callbackSetList(list)
         },
         // 子输入框内容变化时被调用 可选 (未设置则无搜索)
         search: (action, searchWord, callbackSetList) => {
            let matchList = []
            list.forEach(value => {
               if (value.title.toLowerCase().startsWith(searchWord.toLowerCase())){
                  matchList[matchList.length] = value;
               }
            })
            // 获取一些数据
            // 执行 callbackSetList 显示出来
            callbackSetList(matchList)
         },
         // 用户选择列表中某个条目时被调用
         select: (action, itemData, callbackSetList) => {
            window.utools.hideMainWindow()
            const url = itemData.title
            exec(typora_path+" "+note_dir_path+url)
            window.utools.outPlugin()
         },
         // 子输入框为空时的占位符，默认为字符串"搜索"
         placeholder: "搜索"
      }
   }
}
