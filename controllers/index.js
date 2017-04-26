const fs = require('fs');

const path =require('path');

const db = path.join(__dirname,'../db/db.txt');

// 获取页面
const getPage = async (ctx, next) => {
  ctx.body = ('index.html');
}

// 保存数据
const saveData = async (ctx, next) => {
  console.log(ctx.request.body);
  let data = ctx.request.body.data || [];

  let res = await fs.writeFile(db, JSON.stringify(data), (e) => {
    if (e) throw e;
  })

  ctx.body = '保存成功';
}

// 获取数据
const getData = async (ctx, next) => {
  let data = await fs.readFileSync(db, "utf-8");
  ctx.body = data;
}

module.exports = {
  'GET /': getPage,
  'POST /saveData': saveData,
  'GET /getData': getData
}