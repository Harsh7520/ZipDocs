"use strict";(self.webpackChunkecom_book_fe=self.webpackChunkecom_book_fe||[]).push([[346],{469:function(e,t,n){var r=n(3594),i=n(5159),a=n(4026),o=n(6169),c=n(269),s=n(6513),l=n(184);t.Z=function(e){var t=e.open,n=e.onClose,u=e.onConfirm,d=e.title,p=e.description;return(0,l.jsxs)(r.Z,{open:t,onClose:function(){return n()},"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",className:"cancel-popup",children:[(0,l.jsx)(i.Z,{id:"alert-dialog-title",children:d}),(0,l.jsx)(a.Z,{children:(0,l.jsx)(o.Z,{id:"alert-dialog-description",children:p})}),(0,l.jsxs)(c.Z,{children:[(0,l.jsx)(s.Z,{type:"button",onClick:function(){return n()},className:"btn pink-btn",children:"Cancel"}),(0,l.jsx)(s.Z,{onClick:function(){u()},autoFocus:!0,className:"btn green-btn",children:"Ok"})]})]})}},8346:function(e,t,n){n.r(t),n.d(t,{default:function(){return k}});var r=n(1413),i=n(885),a=n(2791),o=n(8596),c=n(8197),s=(0,o.Z)((function(e){return{productWrapper:{padding:"42px 0 80px","@media (max-width: 991px)":{padding:"35px 0 50px"},"@media (max-width: 767px)":{padding:"35px 0 40px"},"& .btn-wrapper":{textAlign:"right",display:"flex",justifyContent:"flex-end",marginBottom:"10px","& .btn":{height:"40px",lineHeight:"40px",minWidth:"100px",marginLeft:"10px",padding:"0 10px",fontSize:"14px"},"& .MuiFormControl-fullWidth":{maxWidth:"300px"}},"& .MuiTable-root":{"@media (max-width: 991px)":{width:"900px",overflow:"auto"},"& .MuiTableBody-root":{"& .MuiTableRow-root":{"& .MuiTableCell-root":{"&:last-child":{paddingRight:"0",textAlign:"right"}}}},"& .green-btn":{height:"30px",lineHeight:"30px",minWidth:"80px",fontSize:"14px",backgroundColor:"transparent",textTransform:"capitalize",color:c.O9.greenText,border:"1px solid #80BF32","&:hover":{backgroundColor:c.O9.greenText,color:c.O9.white}},"& .pink-btn":{height:"30px",lineHeight:"30px",minWidth:"80px",fontSize:"14px",backgroundColor:"transparent",color:c.O9.primary,border:"1px solid #f14d54",marginLeft:"10px",borderRadius:"4px",padding:"0 10px","&:hover":{backgroundColor:c.O9.primary,color:c.O9.white}}},"& .MuiTablePagination-root":{marginTop:"20px","& .MuiTablePagination-toolbar":{paddingRight:"20px","@media (max-width: 991px)":{padding:"0"},"@media (max-width: 374px)":{flexWrap:"wrap",justifyContent:"center"},"& .MuiSelect-selectMenu":{height:"40px",paddingRight:"25px !important",display:"flex",alignItems:"center"},"& .MuiSelect-nativeInput":{top:"0"},"& .MuiIconButton-root":{"@media (max-width: 574px)":{padding:"8px"},"@media (max-width: 374px)":{marginLeft:"0px",marginTop:"10px"}},"& .MuiTablePagination-actions":{"@media (max-width: 574px)":{marginLeft:"8px"}}}}}}})),l=n(9271),u=n(8302),d=n(3188),p=n(6556),h=n(6593),x=n(7631),f=n(8583),m=n(9773),g=n(5757),b=n(3486),v=n(6513),Z=n(4231),y=n(6960),j=n(469),w=n(184),k=function(){var e,t=s(),n=(0,a.useState)(c.f9),o=(0,i.Z)(n,2),k=o[0],C=o[1],N=(0,a.useState)({totalRecords:0,records:[]}),T=(0,i.Z)(N,2),P=T[0],O=T[1],I=(0,a.useState)(!1),E=(0,i.Z)(I,2),S=E[0],M=E[1],D=(0,a.useState)(0),R=(0,i.Z)(D,2),W=R[0],A=R[1],L=(0,l.k6)();(0,a.useEffect)((function(){var e=setTimeout((function(){z((0,r.Z)({},k))}),500);return function(){return clearTimeout(e)}}),[k]);var z=function(e){Z.Z.getAll(e).then((function(e){O(e)}))};return(0,w.jsx)("div",{className:t.productWrapper,children:(0,w.jsxs)("div",{className:"container",children:[(0,w.jsx)(u.Z,{variant:"h1",children:"Category"}),(0,w.jsxs)("div",{className:"btn-wrapper",children:[(0,w.jsx)(d.Z,{id:"text",name:"text",placeholder:"Search...",variant:"outlined",inputProps:{className:"small"},onChange:function(e){C((0,r.Z)((0,r.Z)({},k),{},{keyword:e.target.value,pageIndex:1}))}}),(0,w.jsx)(v.Z,{type:"button",className:"btn pink-btn",variant:"contained",color:"primary",disableElevation:!0,onClick:function(){return L.push("/add-category")},children:"Add"})]}),(0,w.jsx)(f.Z,{children:(0,w.jsxs)(p.Z,{"aria-label":"simple table",children:[(0,w.jsx)(m.Z,{children:(0,w.jsxs)(b.Z,{children:[[{id:"name",label:"Category Name",minWidth:100}].map((function(e){return(0,w.jsx)(x.Z,{style:{minWidth:e.minWidth},children:e.label},e.id)})),(0,w.jsx)(x.Z,{})]})}),(0,w.jsxs)(h.Z,{children:[null===P||void 0===P||null===(e=P.records)||void 0===e?void 0:e.map((function(e,t){return(0,w.jsxs)(b.Z,{children:[(0,w.jsx)(x.Z,{children:e.name}),(0,w.jsxs)(x.Z,{children:[(0,w.jsx)(v.Z,{type:"button",className:"green-btn btn",variant:"contained",color:"primary",disableElevation:!0,onClick:function(){L.push("/edit-category/".concat(e.id))},children:"Edit"}),(0,w.jsx)(v.Z,{type:"button",className:"btn pink-btn",variant:"contained",color:"primary",disableElevation:!0,onClick:function(){var t;M(!0),A(null!==(t=e.id)&&void 0!==t?t:0)},children:"Delete"})]})]},e.id)})),!(null!==P&&void 0!==P&&P.records.length)&&(0,w.jsx)(b.Z,{className:"TableRow",children:(0,w.jsx)(x.Z,{colSpan:6,className:"TableCell",children:(0,w.jsx)(u.Z,{align:"center",className:"noDataText",children:"No Category"})})})]})]})}),(0,w.jsx)(g.Z,{rowsPerPageOptions:c.cK,component:"div",count:null!==P&&void 0!==P&&P.records.length?P.totalRecords:0,rowsPerPage:k.pageSize||0,page:k.pageIndex-1,onPageChange:function(e,t){C((0,r.Z)((0,r.Z)({},k),{},{pageIndex:t+1}))},onRowsPerPageChange:function(e){C((0,r.Z)((0,r.Z)({},k),{},{pageIndex:1,pageSize:Number(e.target.value)}))}}),(0,w.jsx)(j.Z,{open:S,onClose:function(){return M(!1)},onConfirm:function(){Z.Z.delete(W).then((function(e){y.Am.success("Record deleted successfully"),M(!1),C((0,r.Z)({},k))}))},title:"Delete category",description:"Are you sure you want to delete this category?"})]})})}},4231:function(e,t,n){var r=n(5861),i=n(5671),a=n(3144),o=n(7757),c=n.n(o),s=n(4136),l=function(){function e(){(0,i.Z)(this,e),this.ENDPOINT="api/Category"}return(0,a.Z)(e,[{key:"getAll",value:function(){var e=(0,r.Z)(c().mark((function e(t){var n;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(this.ENDPOINT,"/list"),e.abrupt("return",s.Z.get(n,{params:t}).then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getById",value:function(){var e=(0,r.Z)(c().mark((function e(t){var n;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(this.ENDPOINT,"/").concat(t),e.abrupt("return",s.Z.get(n).then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"delete",value:function(){var e=(0,r.Z)(c().mark((function e(t){var n;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(this.ENDPOINT,"/Delete/").concat(t),e.abrupt("return",s.Z.delete(n).then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"save",value:function(){var e=(0,r.Z)(c().mark((function e(t){var n,r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.id){e.next=5;break}return n="".concat(this.ENDPOINT,"/Update"),e.abrupt("return",s.Z.put(n,t).then((function(e){return e.data})));case 5:return r="".concat(this.ENDPOINT,"/Add"),e.abrupt("return",s.Z.post(r,t).then((function(e){return e.data})));case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}();t.Z=new l},4136:function(e,t,n){var r=n(5861),i=n(7757),a=n.n(i),o=n(4569),c=n.n(o),s=n(6960),l=c().create({baseURL:"https://localhost:44394/",timeout:124e5,responseType:"json"}),u=[],d="";function p(){document.body.classList.add("loader-open")}function h(e){var t=u.indexOf(e);t>=0&&u.splice(t,1),u.length>0?p():document.body.classList.remove("loader-open"),e===d&&(d="",u=u.filter((function(t){return t!==e})))}l.interceptors.request.use(function(){var e=(0,r.Z)(a().mark((function e(t){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.headers&&(t.headers["Content-Type"]="application/json"),!0!==t.headers.isDisableLoader&&(u.push(t.url),p()),e.abrupt("return",t);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),(function(e){alert(e),Promise.reject(e)})),l.interceptors.response.use((function(e){var t=e.data;return h(e.config.url),null!==t&&void 0!==t&&t.code&&"OK"!==(null===t||void 0===t?void 0:t.code)?Promise.reject(new Error(t.detail||"Error")):Promise.resolve(e)}),(function(e){return h(e.config.url),s.Am.error(e.response.data.detail),Promise.reject(e)})),t.Z=l}}]);
//# sourceMappingURL=346.f4672013.chunk.js.map