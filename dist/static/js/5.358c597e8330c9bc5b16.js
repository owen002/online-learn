webpackJsonp([5],{"4uAb":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("QD7P"),s={name:"mygrow",components:{Timeline:n.Timeline,TimelineItem:n.TimelineItem,TimelineTitle:n.TimelineTitle},data:function(){return{growDetail:"",chartData:{columns:["type","value"],rows:[{type:"速度",value:0}]},colorArr:["#91c7ae","#63869e","#c23531"],growList:[],chartSettings:{dimension:"type",metrics:"value",dataName:{"速度":""},seriesMap:{"速度":{min:0,max:100,splitNumber:10,radius:"80%",pointer:{shadowColor:"#fff",shadowBlur:5}}}},ranking:{}}},computed:{dengji:function(){var e=this.chartData.rows[0].value;return e>=80?"优秀":70<=e<80?"合格":60<=e<70?"基本合格":"不合格"}},methods:{goDetail:function(){this.$router.push({name:"growdetail"})},queryGrowth:function(){var e=this;this.$model.datasys.growth({},function(t){t.error?e.$alert(t.error):(e.growList=t.data.list,e.chartData.rows[0].value=e.growList[0].reateScore,e.growDetail=e.growList[0],e.$local.growthDetail(e.growList))})},findRanking:function(){var e=this;this.$model.datasys.findRanking({type:2},function(t){t.error?e.$alert(error):e.ranking=t.data.rankingVo})}},mounted:function(){this.queryGrowth(),this.findRanking()}},r={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("article",{staticClass:"my-grow"},[e.growDetail?i("section",{staticClass:"grow-chart",on:{click:e.goDetail}},[i("ve-gauge",{attrs:{data:e.chartData,height:"300px",settings:e.chartSettings}}),e._v(" "),i("div",{staticClass:"growth-result"},[e._v(e._s(e.dengji))])],1):e._e(),e._v(" "),i("section",{staticClass:"my-sorts-data"},[e._m(0),e._v(" "),i("div",{staticClass:"rate-data"},[i("em",[e._v("积分："+e._s(e.ranking.score))]),e._v(" "),i("em",[e._v("排名："+e._s(e.ranking.place))])])]),e._v(" "),i("section",{staticClass:"my-sorts-data"},[e._m(1),e._v(" "),i("div",{staticClass:"rewards-list"},[i("timeline",[e.growList.length>0?i("timeline-title",{attrs:{"bg-color":e.colorArr[0]}},[i("em",[e._v(e._s(e.growList[0].cycle))]),e._v(" "),i("span",[e._v("得分"+e._s(e.growList[0].reateScore)+"分，比上月"+e._s(e.growList[0].differenceScore>=0?"增加":"减少")+e._s(Math.abs(e.growList[0].differenceScore))+"分")])]):e._e(),e._v(" "),e._l(e.growList,function(t,n){return n>0?i("timeline-item",{attrs:{"bg-color":e.colorArr[n%3]}},[i("em",[e._v(e._s(t.cycle))]),e._v(" "),i("span",[e._v("得分"+e._s(t.reateScore)+"分，比上月"+e._s(t.differenceScore>=0?"增加":"减少")+e._s(Math.abs(t.differenceScore))+"分")])]):e._e()})],2)],1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"class-w-header"},[t("div",{staticClass:"class-sub-title"},[this._v("\n        排名\n      ")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"class-w-header"},[t("div",{staticClass:"class-sub-title"},[this._v("\n        成长解读\n      ")])])}]};var o=i("vSla")(s,r,!1,function(e){i("vOEM")},"data-v-54401d0a",null);t.default=o.exports},QD7P:function(e,t,i){(function(e){"use strict";!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style"),i=" .timeline { padding: 0; position: relative; list-style: none; font-family: PingFangSC-light, Avenir, Helvetica, Arial, Hiragino Sans GB, Microsoft YaHei, sans-serif; -webkit-font-smoothing: antialiased; margin: 10px 20px; } .timeline:after { position: absolute; content: ''; left: 0; top: 0; width: 1px; height: 100%; background-color: var(--timelineTheme); } .timeline-item { position: relative; margin: 1.5em 0 0 28px; padding-bottom: 1.5em; border-bottom: 1px dotted var(--timelineTheme); } .timeline-item:last-child { border-bottom: none; } .timeline-circle { position: absolute; top: .28em; left: -34px; width: 10px; height: 10px; border-radius: 50%; border: 1px solid var(--timelineTheme); background-color: var(--timelineTheme); z-index: 1; box-sizing: content-box; } .timeline-title { position: relative; display: inline-block; /** * BFC inline-block 元素与其兄弟元素、子元素和父元素的外边距都不会折叠（包括其父元素和子元素） */ cursor: crosshair; margin: -.15em 0 15px 28px } .timeline-title:not(:first-child) { margin-top: 28px; } .timeline-title-circle { left: -36px; top: .15em; width: 16px; height: 16px; } .timeline-others { width: 40px; height: auto; top: .2em; left: -48px; line-height: 1; padding: 2px 0; text-align: center; border: none; background-color: #fff; } ";t.type="text/css",t.styleSheet?t.styleSheet.cssText=i:t.appendChild(document.createTextNode(i)),e.appendChild(t)}}();var t={render:function(){var e=this.$createElement;return(this._self._c||e)("ul",{ref:"timeline",staticClass:"timeline"},[this._t("default")],2)},staticRenderFns:[],name:"Timeline",props:{timelineTheme:{type:String,default:"#dbdde0"}},mounted:function(){this.$refs.timeline.style.setProperty("--timelineTheme",this.timelineTheme)}};!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",t.styleSheet?t.styleSheet.cssText="":t.appendChild(document.createTextNode("")),e.appendChild(t)}}();var i={name:"TimelineItemBase",props:{bgColor:{type:String,default:""},lineColor:{type:String,default:""},hollow:{type:Boolean,default:!1},fontColor:{type:String,default:"#37414a"}},data:function(){return{slotOthers:!1}},computed:{circleStyle:function(){if(this.bgColor||this.lineColor||this.hollow){var e={};return this.bgColor&&(e={"border-color":this.bgColor,"background-color":this.bgColor}),this.lineColor&&(e=Object.assign({},e,{"border-color":this.lineColor})),this.hollow&&(e=Object.assign({},e,{"background-color":"#fff"})),e}},itemStyle:function(){return{color:this.fontColor}},slotClass:function(){return this.slotOthers?"timeline-others":""}},mounted:function(){this.slotOthers=!!this.$refs.others.innerHTML}};!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",t.styleSheet?t.styleSheet.cssText="":t.appendChild(document.createTextNode("")),e.appendChild(t)}}();var n={render:function(){var e=this.$createElement,t=this._self._c||e;return t("li",{staticClass:"timeline-item",style:this.itemStyle},[t("div",{ref:"others",staticClass:"timeline-circle",class:this.slotClass,style:this.circleStyle},[this._t("others")],2),this._v(" "),this._t("default")],2)},staticRenderFns:[],extends:i};!function(){if("undefined"!=typeof document){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",t.styleSheet?t.styleSheet.cssText="":t.appendChild(document.createTextNode("")),e.appendChild(t)}}();var s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("h3",{staticClass:"timeline-title",style:this.itemStyle},[t("div",{ref:"others",staticClass:"timeline-circle timeline-title-circle",class:this.slotClass,style:this.circleStyle},[this._t("others")],2),this._v(" "),this._t("default")],2)},staticRenderFns:[],extends:i};"undefined"!=typeof window&&window.Vue&&(window.Vue.component(t.name,t),window.Vue.component(n.name,n),window.Vue.component(s.name,s)),e.Timeline=t,e.TimelineItem=n,e.TimelineTitle=s,Object.defineProperty(e,"__esModule",{value:!0})})(t)},vOEM:function(e,t){}});
//# sourceMappingURL=5.358c597e8330c9bc5b16.js.map