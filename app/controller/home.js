'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const funcStr = await ctx.service.func.getFunc();
    const func = eval(funcStr);
    const res = func({ a: 1, b: 4 });
    ctx.body = res;
  }

  async show() {
    const { ctx } = this;
    const funcs = await ctx.service.func.getAllFunc();
    ctx.body = {
      items: funcs,
      total: funcs.length
    };
  }

  async run() {
    const { ctx } = this;
    const body = ctx.request.body;
    const funcStr = await ctx.service.func.getFunc(ctx.params.id);
    console.log(funcStr);
    const func = eval(funcStr+';main');
    const res = func(body);
    ctx.body = res;
  }

  async save() {
    const { ctx } = this;
    const { id, content } = ctx.request.body;
    const msg = await ctx.service.func.saveFunc(id, content);
    ctx.body = {
      state: 'success',
      msg: msg
    };
  }
}

module.exports = HomeController;
