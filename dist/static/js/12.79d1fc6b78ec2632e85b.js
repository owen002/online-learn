webpackJsonp([12],{SxBD:function(t,e){},smAk:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={name:"articledetail",data:function(){return{id:"",articleVal:{}}},methods:{queryArticle:function(t){var e=this;String(t)&&this.$model.datasys.getArticle({id:t},function(t){t.error?e.$alert(t.error):e.articleVal=t.data.news},function(t){console.error(t)})}},mounted:function(){var t=this.$route.query;this.id=t.id||"",this.queryArticle(this.id)}},a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("article",{staticClass:"article-warap"},[e("header",[this._v(this._s(this.articleVal.titel))]),this._v(" "),e("section",{domProps:{innerHTML:this._s(this.articleVal.content)}})])},staticRenderFns:[]};var n=i("vSla")(r,a,!1,function(t){i("SxBD")},"data-v-67007fc2",null);e.default=n.exports}});
//# sourceMappingURL=12.79d1fc6b78ec2632e85b.js.map