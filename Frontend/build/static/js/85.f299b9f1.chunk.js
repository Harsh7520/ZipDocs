"use strict";(self.webpackChunkecom_book_fe=self.webpackChunkecom_book_fe||[]).push([[85],{469:function(e,t,n){var r=n(3594),i=n(5159),a=n(4026),o=n(6169),c=n(269),u=n(6513),s=n(184);t.Z=function(e){var t=e.open,n=e.onClose,l=e.onConfirm,d=e.title,p=e.description;return(0,s.jsxs)(r.Z,{open:t,onClose:function(){return n()},"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",className:"cancel-popup",children:[(0,s.jsx)(i.Z,{id:"alert-dialog-title",children:d}),(0,s.jsx)(a.Z,{children:(0,s.jsx)(o.Z,{id:"alert-dialog-description",children:p})}),(0,s.jsxs)(c.Z,{children:[(0,s.jsx)(u.Z,{type:"button",onClick:function(){return n()},className:"btn pink-btn",children:"Cancel"}),(0,s.jsx)(u.Z,{onClick:function(){l()},autoFocus:!0,className:"btn green-btn",children:"Ok"})]})]})}},5085:function(e,t,n){n.r(t),n.d(t,{default:function(){return C}});var r=n(1413),i=n(5861),a=n(885),o=n(7757),c=n.n(o),u=n(2791),s=n(8596),l=n(8197),d=(0,s.Z)((function(e){return{productWrapper:{padding:"42px 0 80px","@media (max-width: 991px)":{padding:"35px 0 50px"},"@media (max-width: 767px)":{padding:"35px 0 40px"},"& .btn-wrapper":{textAlign:"right",display:"flex",justifyContent:"flex-end",marginBottom:"10px","& .btn":{height:"40px",lineHeight:"40px",minWidth:"100px",marginLeft:"10px",padding:"0 10px",fontSize:"14px"},"& .MuiFormControl-fullWidth":{maxWidth:"300px"}},"& .MuiTable-root":{"@media (max-width: 991px)":{width:"900px",overflow:"auto"},"& .MuiTableBody-root":{"& .MuiTableRow-root":{"& .MuiTableCell-root":{"&:last-child":{paddingRight:"0",textAlign:"right"}}}},"& .green-btn":{height:"30px",lineHeight:"30px",minWidth:"80px",fontSize:"14px",backgroundColor:"transparent",textTransform:"capitalize",color:l.O9.greenText,border:"1px solid #80BF32","&:hover":{backgroundColor:l.O9.greenText,color:l.O9.white}},"& .pink-btn":{height:"30px",lineHeight:"30px",minWidth:"80px",fontSize:"14px",backgroundColor:"transparent",color:l.O9.primary,border:"1px solid #f14d54",marginLeft:"10px",borderRadius:"4px",padding:"0 10px","&:hover":{backgroundColor:l.O9.primary,color:l.O9.white}}},"& .MuiTablePagination-root":{marginTop:"20px","& .MuiTablePagination-toolbar":{paddingRight:"20px","@media (max-width: 991px)":{padding:"0"},"@media (max-width: 374px)":{flexWrap:"wrap",justifyContent:"center"},"& .MuiSelect-selectMenu":{height:"40px",paddingRight:"25px !important",display:"flex",alignItems:"center"},"& .MuiSelect-nativeInput":{top:"0"},"& .MuiIconButton-root":{"@media (max-width: 574px)":{padding:"8px"},"@media (max-width: 374px)":{marginLeft:"0px",marginTop:"10px"}},"& .MuiTablePagination-actions":{"@media (max-width: 574px)":{marginLeft:"8px"}}}}}}})),p=n(9271),h=n(8302),f=n(3188),x=n(6556),m=n(6593),g=n(7631),v=n(8583),b=n(9773),Z=n(5757),y=n(3486),k=n(6513),w=n(9421),N=n(6960),j=n(4231),T=n(469),P=n(184),C=function(){var e=d(),t=(0,u.useState)(l.f9),n=(0,a.Z)(t,2),o=n[0],s=n[1],C=(0,u.useState)({records:[],totalRecords:0}),I=(0,a.Z)(C,2),O=I[0],E=I[1],D=(0,u.useState)(!1),S=(0,a.Z)(D,2),M=S[0],W=S[1],A=(0,u.useState)(0),R=(0,a.Z)(A,2),B=R[0],L=R[1],z=(0,u.useState)([]),_=(0,a.Z)(z,2),F=_[0],H=_[1];(0,u.useEffect)((function(){U()}),[]);var U=function(){var e=(0,i.Z)(c().mark((function e(){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.Z.getAll({pageIndex:0}).then((function(e){e&&H(e.records)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),K=(0,u.useMemo)((function(){return null!==O&&void 0!==O&&O.records?(null===O||void 0===O||O.records.forEach((function(e){var t;e.category=null===(t=F.find((function(t){return t.id===e.categoryId})))||void 0===t?void 0:t.name})),O.records):[]}),[F,O]),q=(0,p.k6)();(0,u.useEffect)((function(){var e=setTimeout((function(){G((0,r.Z)({},o))}),500);return function(){return clearTimeout(e)}}),[o]);var G=function(e){w.Z.getAll(e).then((function(e){E(e)}))};return(0,P.jsx)("div",{className:e.productWrapper,children:(0,P.jsxs)("div",{className:"container",children:[(0,P.jsx)(h.Z,{variant:"h1",children:"Book Page"}),(0,P.jsxs)("div",{className:"btn-wrapper",children:[(0,P.jsx)(f.Z,{id:"text",name:"text",placeholder:"Search...",variant:"outlined",inputProps:{className:"small"},onChange:function(e){s((0,r.Z)((0,r.Z)({},o),{},{keyword:e.target.value,pageIndex:1}))}}),(0,P.jsx)(k.Z,{type:"button",className:"btn pink-btn",variant:"contained",color:"primary",disableElevation:!0,onClick:function(){return q.push("/add-book")},children:"Add"})]}),(0,P.jsx)(v.Z,{children:(0,P.jsxs)(x.Z,{"aria-label":"simple table",children:[(0,P.jsx)(b.Z,{children:(0,P.jsxs)(y.Z,{children:[[{id:"name",label:"Book Name",minWidth:100},{id:"price",label:"Price",minWidth:100},{id:"category",label:"Category",minWidth:100}].map((function(e){return(0,P.jsx)(g.Z,{style:{minWidth:e.minWidth},children:e.label},e.id)})),(0,P.jsx)(g.Z,{})]})}),(0,P.jsxs)(m.Z,{children:[null===K||void 0===K?void 0:K.map((function(e,t){return(0,P.jsxs)(y.Z,{children:[(0,P.jsx)(g.Z,{children:e.name}),(0,P.jsx)(g.Z,{children:e.price}),(0,P.jsx)(g.Z,{children:e.category}),(0,P.jsxs)(g.Z,{children:[(0,P.jsx)(k.Z,{type:"button",className:"green-btn btn",variant:"contained",color:"primary",disableElevation:!0,onClick:function(){q.push("/edit-book/".concat(e.id))},children:"Edit"}),(0,P.jsx)(k.Z,{type:"button",className:"btn pink-btn",variant:"contained",color:"primary",disableElevation:!0,onClick:function(){var t;W(!0),L(null!==(t=e.id)&&void 0!==t?t:0)},children:"Delete"})]})]},e.id)})),!(null!==O&&void 0!==O&&O.records.length)&&(0,P.jsx)(y.Z,{className:"TableRow",children:(0,P.jsx)(g.Z,{colSpan:5,className:"TableCell",children:(0,P.jsx)(h.Z,{align:"center",className:"noDataText",children:"No Books"})})})]})]})}),(0,P.jsx)(Z.Z,{rowsPerPageOptions:l.cK,component:"div",count:null!==O&&void 0!==O&&O.records.length?O.totalRecords:0,rowsPerPage:o.pageSize||0,page:o.pageIndex-1,onPageChange:function(e,t){s((0,r.Z)((0,r.Z)({},o),{},{pageIndex:t+1}))},onRowsPerPageChange:function(e){s((0,r.Z)((0,r.Z)({},o),{},{pageIndex:1,pageSize:Number(e.target.value)}))}}),(0,P.jsx)(T.Z,{open:M,onClose:function(){return W(!1)},onConfirm:function(){w.Z.delete(B).then((function(e){N.Am.success("Record deleted successfully"),W(!1),s((0,r.Z)((0,r.Z)({},o),{},{pageIndex:1}))}))},title:"Delete book",description:"Are you sure you want to delete this book?"})]})})}},9421:function(e,t,n){var r=n(5861),i=n(5671),a=n(3144),o=n(7757),c=n.n(o),u=n(4136),s=function(){function e(){(0,i.Z)(this,e),this.ENDPOINT="api/Book"}return(0,a.Z)(e,[{key:"getAll",value:function(){var e=(0,r.Z)(c().mark((function e(t){var n;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(this.ENDPOINT,"/list"),e.abrupt("return",u.Z.get(n,{params:t}).then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getById",value:function(){var e=(0,r.Z)(c().mark((function e(t){var n;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(this.ENDPOINT,"/").concat(t),e.abrupt("return",u.Z.get(n).then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"delete",value:function(){var e=(0,r.Z)(c().mark((function e(t){var n;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(this.ENDPOINT,"/Delete/").concat(t),e.abrupt("return",u.Z.delete(n).then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"save",value:function(){var e=(0,r.Z)(c().mark((function e(t){var n,r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.id){e.next=5;break}return n="".concat(this.ENDPOINT,"/Update"),e.abrupt("return",u.Z.put(n,t).then((function(e){return e.data})));case 5:return r="".concat(this.ENDPOINT,"/Add"),e.abrupt("return",u.Z.post(r,t).then((function(e){return e.data})));case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}();t.Z=new s},4231:function(e,t,n){var r=n(5861),i=n(5671),a=n(3144),o=n(7757),c=n.n(o),u=n(4136),s=function(){function e(){(0,i.Z)(this,e),this.ENDPOINT="api/Category"}return(0,a.Z)(e,[{key:"getAll",value:function(){var e=(0,r.Z)(c().mark((function e(t){var n;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(this.ENDPOINT,"/list"),e.abrupt("return",u.Z.get(n,{params:t}).then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getById",value:function(){var e=(0,r.Z)(c().mark((function e(t){var n;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(this.ENDPOINT,"/").concat(t),e.abrupt("return",u.Z.get(n).then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"delete",value:function(){var e=(0,r.Z)(c().mark((function e(t){var n;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(this.ENDPOINT,"/Delete/").concat(t),e.abrupt("return",u.Z.delete(n).then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"save",value:function(){var e=(0,r.Z)(c().mark((function e(t){var n,r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.id){e.next=5;break}return n="".concat(this.ENDPOINT,"/Update"),e.abrupt("return",u.Z.put(n,t).then((function(e){return e.data})));case 5:return r="".concat(this.ENDPOINT,"/Add"),e.abrupt("return",u.Z.post(r,t).then((function(e){return e.data})));case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}();t.Z=new s},4136:function(e,t,n){var r=n(5861),i=n(7757),a=n.n(i),o=n(4569),c=n.n(o),u=n(6960),s=c().create({baseURL:"https://localhost:44394/",timeout:124e5,responseType:"json"}),l=[],d="";function p(){document.body.classList.add("loader-open")}function h(e){var t=l.indexOf(e);t>=0&&l.splice(t,1),l.length>0?p():document.body.classList.remove("loader-open"),e===d&&(d="",l=l.filter((function(t){return t!==e})))}s.interceptors.request.use(function(){var e=(0,r.Z)(a().mark((function e(t){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.headers&&(t.headers["Content-Type"]="application/json"),!0!==t.headers.isDisableLoader&&(l.push(t.url),p()),e.abrupt("return",t);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),(function(e){alert(e),Promise.reject(e)})),s.interceptors.response.use((function(e){var t=e.data;return h(e.config.url),null!==t&&void 0!==t&&t.code&&"OK"!==(null===t||void 0===t?void 0:t.code)?Promise.reject(new Error(t.detail||"Error")):Promise.resolve(e)}),(function(e){return h(e.config.url),u.Am.error(e.response.data.detail),Promise.reject(e)})),t.Z=s}}]);
//# sourceMappingURL=85.f299b9f1.chunk.js.map