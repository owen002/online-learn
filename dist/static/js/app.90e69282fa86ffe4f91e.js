webpackJsonp([18],{DbLx:function(n,t){},NHnr:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={};e.d(o,"setHeaderTitle",function(){return S});var a={};e.d(a,"getHeaderTitle",function(){return w});var i=e("IvJb"),r=e("rVsN"),u=e.n(r),c=e("+BxT"),l=e.n(c),s=e("jRUa"),f=e("wEua"),p=(e("DbLx"),e("kwQW"));i.a.use(p.a),i.a.use(f.a),i.a.use(s.a),i.a.use(l.a);var h={name:"App",data:function(){return{transitionName:"transition-go"}},mounted:function(){var n=this;document.title="太仓烟草",this.$ajax.interceptors.response.use(function(t){if(t.res=t.data,!t.data||"401"!=String(t.data.code))return t.data&&"0"===String(t.data.code)?t:(t.error=t.data&&t.data.msg||"系统忙，请稍后再试",t);var e=encodeURIComponent(location.href),o=function(){n.$local.rurlFlag()||(n.$local.rurlFlag("1"),n.$router.push({name:"login",query:{rurl:e}}))},a=n.$local.userinfo()||{},i=a.phone,r=a.password;i&&r?n.$model.datasys.login({phone:i,pwd:r},function(t){if(t.error)return n.$alert(t.error),void o();var e=t.data.token;localStorage.setItem("usertoken",e),localStorage.setItem("userid",t.data.user.id),n.$local.userinfo({user:t.data.user,token:e})}):o()},function(n){return u.a.reject(n)})}},d={render:function(){var n=this.$createElement,t=this._self._c||n;return t("div",{attrs:{id:"app"}},[t("transition",{attrs:{name:this.transitionName}},[t("router-view")],1)],1)},staticRenderFns:[]};var m=e("vSla")(h,d,!1,function(n){e("pZ1O")},null,null).exports,g=e("zO6J");i.a.use(g.a),i.a.mixin({watch:{},computed:{},beforeRouteUpdate:function(n,t,e){e()},mounted:function(){}});var v=new g.a({routes:[{path:"/index",name:"index",component:function(n){return Promise.all([e.e(0),e.e(4)]).then(function(){var t=[e("2NXm")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/myinfo",name:"myinfo",component:function(n){return e.e(15).then(function(){var t=[e("Gbml")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/mine",name:"mine",component:function(n){return Promise.all([e.e(0),e.e(3)]).then(function(){var t=[e("i30E")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/login",name:"login",component:function(n){return Promise.all([e.e(0),e.e(6)]).then(function(){var t=[e("rqbd")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/register",name:"register",component:function(n){return Promise.all([e.e(0),e.e(13)]).then(function(){var t=[e("Iwgb")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/forget",name:"forget",component:function(n){return Promise.all([e.e(0),e.e(14)]).then(function(){var t=[e("qjax")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/mygrow",name:"mygrow",component:function(n){return e.e(5).then(function(){var t=[e("4uAb")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/growdetail",name:"growdetail",component:function(n){return e.e(10).then(function(){var t=[e("U6pj")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/article",name:"article",component:function(n){return e.e(12).then(function(){var t=[e("smAk")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/ztlist",name:"ztlist",component:function(n){return e.e(11).then(function(){var t=[e("YqKa")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/courselist",name:"courselist",component:function(n){return Promise.all([e.e(0),e.e(7)]).then(function(){var t=[e("ZjeR")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/coursedetail",name:"coursedetail",component:function(n){return Promise.all([e.e(0),e.e(8)]).then(function(){var t=[e("DdVQ")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/coursevideo",name:"coursevideo",component:function(n){return Promise.all([e.e(0),e.e(1)]).then(function(){var t=[e("nWDn")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/shujixinxiang",name:"shujixinxiang",component:function(n){return e.e(9).then(function(){var t=[e("LvPo")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/ranking",name:"ranking",component:function(n){return Promise.all([e.e(0),e.e(2)]).then(function(){var t=[e("6g6W")];n.apply(null,t)}.bind(this)).catch(e.oe)}},{path:"/learning",name:"learning",component:function(n){return Promise.all([e.e(0),e.e(16)]).then(function(){var t=[e("o8Fd")];n.apply(null,t)}.bind(this)).catch(e.oe)}}]}),y=e("9rMa"),S=function(n,t){return(0,n.commit)({type:"PROJECT_TITLE",title:t})},w=function(n){return n.headerTitle},b=e("a3Yh"),T=e.n(b)()({},"PROJECT_TITLE",function(n,t){n.headerTitle=t}),_={state:{headerTitle:"基础数据后台"},actions:o,getters:a,mutations:T};i.a.use(y.a);var k=new y.a.Store({modules:{common:_}}),I=location.href,x=(I.indexOf("train.qa.17usoft"),I.indexOf("train.t.17usoft"),{part:"/"}),P="//120.79.76.235:8081";var L=function(n){n.defaults.timeout=1e4,n.interceptors.request.use(function(n){if(n.url=n.url.replace(/^(\w+):/,function(n,t){return x[t]||n}),P&&!/^(?:https?:)?\/\//.test(n.url)&&(n.url=P+n.url),"get"==n.method){var t=n.params;t?t.token=localStorage.getItem("usertoken")||"":n.params={token:localStorage.getItem("usertoken")||""},t&&(t._=(new Date).getTime())}else{console.log(n);var e=n.url,o=e.indexOf("?")>=0?"&":"?",a=["token="+localStorage.getItem("usertoken")||""],i=n.data;for(var r in i)a.push(r+"="+i[r]);e+=o+a.join("&"),n.url=e}return n},function(n){return u.a.reject(n)})},j=e("3cXf"),D=e.n(j),O=window.localStorage,$=window.sessionStorage;function N(n){var t=O.getItem(n),e=null;try{e=JSON.parse(t)}catch(n){e=t}if(!e)return e;var o=e.expoiration;if(o){var a=(new Date).getTime();return-1===o||a<=o?e.item:function(n){O.removeItem(n)}(n)}}function R(n,t){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:-1,o=0;if("number"==typeof e){o=-1===e?-1:864e5*e}else o=new Date(e.replace(/-/g,"/")).getTime();var a={item:t,expoiration:o};O.setItem(n,D()(a))}var q={videoCurrentTime:function(n){var t="vue_vurrentTime_local_"+localStorage.getItem("userid");return void 0===n?N(t):R(t,n,-1)},userinfo:function(n){var t="vue_userinfo_local_"+localStorage.getItem("userid");return void 0===n?N(t):R(t,n,-1)},videoStore:function(n){var t="vue_videoStore_local_"+localStorage.getItem("userid");return void 0===n?N(t):R(t,n,-1)},growthDetail:function(n){var t="vue_growthDetail_local_"+localStorage.getItem("userid");return void 0===n?N(t):R(t,n,-1)},myTotalStudy:function(n){var t="vue_myTotalStudy_local_"+localStorage.getItem("userid");return void 0===n?N(t):R(t,n,-1)},rurlFlag:function(n){return function(n,t){if(void 0===t){var e=$.getItem(n),o=null;try{o=JSON.parse(e)}catch(n){o=e}return o}return t=D()(t),$.setItem(n,t)}("vue_local_rurl_Flag",n)}},V=e("aozt"),A=e.n(V);L(A.a);var E,J,F={datasys:(E=A.a,J="//120.79.76.235:8081/",{getBanner:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1],e=arguments[2];return E.get(J+"api/getBanner",{params:n}).then(function(n){t(n)}).catch(function(n){e(n)})},getNewsList:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1],e=arguments[2];return E.get(J+"api/findSpecialList",{params:n}).then(function(n){t(n)}).catch(function(n){e(n)})},getVideoList:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1],e=arguments[2];return E.get(J+"api/video/findAllList",{params:n}).then(function(n){t(n)}).catch(function(n){e(n)})},getVideoDetail:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1],e=arguments[2],o=n.id||"";return E.get(J+"api/video/findDetail/"+o,{params:n}).then(function(n){t(n)}).catch(function(n){e(n)})},getVideoType:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1],e=arguments[2];return n.id,E.get(J+"/api/video/findTypeList",{params:n}).then(function(n){t(n)}).catch(function(n){e(n)})},updateVideo:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1],e=arguments[2];return E.post(J+"api/video/updateStudyProgress",n).then(function(n){t(n)}).catch(function(n){e(n)})},historyStudy:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1],e=arguments[2];return E.post(J+"/api/video/histroyStudy",n).then(function(n){t(n)}).catch(function(n){e(n)})},getArticle:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1],e=arguments[2];return E.get(J+"api/findNews/"+n.id,n).then(function(n){t(n)}).catch(function(n){e(n)})},getZtDetail:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1],e=arguments[2];return E.get(J+"api/findMoreNewsList/"+n.id,n).then(function(n){t(n)}).catch(function(n){e(n)})},login:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1],e=arguments[2];return E.post(J+"api/login",n).then(function(n){t(n)}).catch(function(n){e(n)})},register:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1],e=arguments[2];return E.post(J+"api/register",n).then(function(n){t(n)}).catch(function(n){e(n)})},getMyinfo:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1],e=arguments[2];return E.get(J+"api/mine/myTotalStudy",{params:n}).then(function(n){t(n)}).catch(function(n){e(n)})},findRanking:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1],e=arguments[2];return E.get(J+"api/mine/findRanking",{params:n}).then(function(n){t(n)}).catch(function(n){e(n)})},growth:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1],e=arguments[2];return E.get(J+"api/mine/growth",{params:n}).then(function(n){t(n)}).catch(function(n){e(n)})},mailSend:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1],e=arguments[2];return E.post(J+"api/mailSend",n).then(function(n){t(n)}).catch(function(n){e(n)})},findTotalRankingList:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1],e=arguments[2];return E.get(J+"api/mine/findTotalRankingList",{params:n}).then(function(n){t(n)}).catch(function(n){e(n)})}})},z={install:function(n){n.prototype.$local=q,n.prototype.$ajax=A.a,n.prototype.$model=F}},C=e("O/8c");e("Sy0n"),e("qhkV");i.a.config.productionTip=!1,i.a.use(C.a),i.a.use(z),new i.a({el:"#app",router:v,store:k,components:{App:m},template:"<App/>"})},Sy0n:function(n,t){},pZ1O:function(n,t){},qhkV:function(n,t){}},["NHnr"]);
//# sourceMappingURL=app.90e69282fa86ffe4f91e.js.map