"use strict";(self.webpackChunkecom_book_fe=self.webpackChunkecom_book_fe||[]).push([[180],{469:function(e,n,t){var r=t(3594),i=t(5159),a=t(4026),o=t(6169),c=t(269),s=t(6513),u=t(184);n.Z=function(e){var n=e.open,t=e.onClose,l=e.onConfirm,d=e.title,p=e.description;return(0,u.jsxs)(r.Z,{open:n,onClose:function(){return t()},"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",className:"cancel-popup",children:[(0,u.jsx)(i.Z,{id:"alert-dialog-title",children:d}),(0,u.jsx)(a.Z,{children:(0,u.jsx)(o.Z,{id:"alert-dialog-description",children:p})}),(0,u.jsxs)(c.Z,{children:[(0,u.jsx)(s.Z,{type:"button",onClick:function(){return t()},className:"btn pink-btn",children:"Cancel"}),(0,u.jsx)(s.Z,{onClick:function(){l()},autoFocus:!0,className:"btn green-btn",children:"Ok"})]})]})}},8180:function(e,n,t){t.r(n),t.d(n,{default:function(){return P}});var r=t(5861),i=t(1413),a=t(885),o=t(7757),c=t.n(o),s=t(2791),u=t(8596),l=t(8197),d=(0,u.Z)((function(e){return{productWrapper:{padding:"42px 0 80px","@media (max-width: 991px)":{padding:"35px 0 50px"},"@media (max-width: 767px)":{padding:"35px 0 40px"},"& .btn-wrapper":{textAlign:"right",display:"flex",justifyContent:"flex-end",marginBottom:"10px","& .btn":{height:"40px",lineHeight:"40px",minWidth:"100px",marginLeft:"10px",padding:"0 10px",fontSize:"14px"},"& .MuiFormControl-fullWidth":{maxWidth:"300px"}},"& .MuiTable-root":{"@media (max-width: 991px)":{width:"900px",overflow:"auto"},"& .MuiTableBody-root":{"& .MuiTableRow-root":{"& .MuiTableCell-root":{"&:last-child":{paddingRight:"0",textAlign:"right"}}}},"& .green-btn":{height:"30px",lineHeight:"30px",minWidth:"80px",fontSize:"14px",backgroundColor:"transparent",textTransform:"capitalize",color:l.O9.greenText,border:"1px solid #80BF32","&:hover":{backgroundColor:l.O9.greenText,color:l.O9.white}},"& .pink-btn":{height:"30px",lineHeight:"30px",minWidth:"80px",fontSize:"14px",backgroundColor:"transparent",color:l.O9.primary,border:"1px solid #f14d54",marginLeft:"10px",borderRadius:"4px",padding:"0 10px","&:hover":{backgroundColor:l.O9.primary,color:l.O9.white}}},"& .MuiTablePagination-root":{marginTop:"20px","& .MuiTablePagination-toolbar":{paddingRight:"20px","@media (max-width: 991px)":{padding:"0"},"@media (max-width: 374px)":{flexWrap:"wrap",justifyContent:"center"},"& .MuiSelect-selectMenu":{height:"40px",paddingRight:"25px !important",display:"flex",alignItems:"center"},"& .MuiSelect-nativeInput":{top:"0"},"& .MuiIconButton-root":{"@media (max-width: 574px)":{padding:"8px"},"@media (max-width: 374px)":{marginLeft:"0px",marginTop:"10px"}},"& .MuiTablePagination-actions":{"@media (max-width: 574px)":{marginLeft:"8px"}}}}}}})),p=t(9271),h=t(8302),f=t(3188),x=t(6556),m=t(6593),g=t(7631),v=t(8583),Z=t(9773),b=t(5757),w=t(3486),j=t(6513),y=t(6977),k=t(6960),N=t(1188),C=t(469),T=t(3595),E=t(184),P=function(){var e=d(),n=(0,N.Eu)(),t=(0,s.useState)(l.f9),o=(0,a.Z)(t,2),u=o[0],P=o[1],S=(0,s.useState)({records:[],totalRecords:0}),O=(0,a.Z)(S,2),I=O[0],R=O[1],W=(0,s.useState)(!1),D=(0,a.Z)(W,2),M=D[0],L=D[1],A=(0,s.useState)(0),U=(0,a.Z)(A,2),z=U[0],_=U[1],B=(0,s.useState)([]),F=(0,a.Z)(B,2),H=F[0],K=F[1],q=(0,p.k6)();(0,s.useEffect)((function(){J()}),[]),(0,s.useEffect)((function(){var e=setTimeout((function(){G((0,i.Z)({},u))}),500);return function(){return clearTimeout(e)}}),[u]);var G=function(){var e=(0,r.Z)(c().mark((function e(n){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.Z.getAllUsers(n).then((function(e){e&&R(e)}));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),J=function(){var e=(0,r.Z)(c().mark((function e(){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.Z.getAllRoles().then((function(e){e.records.length&&K(e.records)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Q=(0,s.useMemo)((function(){return null!==I&&void 0!==I&&I.records?(null===I||void 0===I||I.records.forEach((function(e){var n;e.role=null===(n=H.find((function(n){return n.id===e.roleId})))||void 0===n?void 0:n.name})),I.records):[]}),[H,I]),V=function(){var e=(0,r.Z)(c().mark((function e(){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.Z.delete(z).then((function(e){e&&(k.Am.success(T.Z.messages.DELETE_SUCCESS),L(!1),P((0,i.Z)({},u)))}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,E.jsx)("div",{className:e.productWrapper,children:(0,E.jsxs)("div",{className:"container",children:[(0,E.jsx)(h.Z,{variant:"h1",children:"User"}),(0,E.jsx)("div",{className:"btn-wrapper",children:(0,E.jsx)(f.Z,{id:"text",name:"text",placeholder:"Search...",variant:"outlined",inputProps:{className:"small"},onChange:function(e){P((0,i.Z)((0,i.Z)({},u),{},{keyword:e.target.value,pageIndex:1}))}})}),(0,E.jsx)(v.Z,{children:(0,E.jsxs)(x.Z,{"aria-label":"simple table",children:[(0,E.jsx)(Z.Z,{children:(0,E.jsxs)(w.Z,{children:[[{id:"firstName",label:"First Name",minWidth:100},{id:"lastName",label:"Last Name",minWidth:100},{id:"email",label:"Email",minWidth:170},{id:"roleName",label:"Role",minWidth:130}].map((function(e){return(0,E.jsx)(g.Z,{style:{minWidth:e.minWidth},children:e.label},e.id)})),(0,E.jsx)(g.Z,{})]})}),(0,E.jsxs)(m.Z,{children:[Q.map((function(e,t){return(0,E.jsxs)(w.Z,{children:[(0,E.jsx)(g.Z,{children:e.firstName}),(0,E.jsx)(g.Z,{children:e.lastName}),(0,E.jsx)(g.Z,{children:e.email}),(0,E.jsx)(g.Z,{children:e.role}),(0,E.jsxs)(g.Z,{children:[(0,E.jsx)(j.Z,{type:"button",className:"green-btn btn",variant:"contained",color:"primary",disableElevation:!0,onClick:function(){q.push("/edit-user/".concat(e.id))},children:"Edit"}),e.id!==n.user.id&&(0,E.jsx)(j.Z,{type:"button",className:"btn pink-btn",variant:"contained",color:"primary",disableElevation:!0,onClick:function(){var n;L(!0),_(null!==(n=e.id)&&void 0!==n?n:0)},children:"Delete"})]})]},e.id)})),!Q.length&&(0,E.jsx)(w.Z,{className:"TableRow",children:(0,E.jsx)(g.Z,{colSpan:5,className:"TableCell",children:(0,E.jsx)(h.Z,{align:"center",className:"noDataText",children:"No Users"})})})]})]})}),(0,E.jsx)(b.Z,{rowsPerPageOptions:l.cK,component:"div",count:null!==I&&void 0!==I&&I.records.length?I.totalRecords:0,rowsPerPage:u.pageSize||0,page:u.pageIndex-1,onPageChange:function(e,n){P((0,i.Z)((0,i.Z)({},u),{},{pageIndex:n+1}))},onRowsPerPageChange:function(e){P((0,i.Z)((0,i.Z)({},u),{},{pageIndex:1,pageSize:Number(e.target.value)}))}}),(0,E.jsx)(C.Z,{open:M,onClose:function(){return L(!1)},onConfirm:function(){return V()},title:"Delete user",description:T.Z.messages.USER_DELETE})]})})}},4136:function(e,n,t){var r=t(5861),i=t(7757),a=t.n(i),o=t(4569),c=t.n(o),s=t(6960),u=c().create({baseURL:"https://localhost:44394/",timeout:124e5,responseType:"json"}),l=[],d="";function p(){document.body.classList.add("loader-open")}function h(e){var n=l.indexOf(e);n>=0&&l.splice(n,1),l.length>0?p():document.body.classList.remove("loader-open"),e===d&&(d="",l=l.filter((function(n){return n!==e})))}u.interceptors.request.use(function(){var e=(0,r.Z)(a().mark((function e(n){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.headers&&(n.headers["Content-Type"]="application/json"),!0!==n.headers.isDisableLoader&&(l.push(n.url),p()),e.abrupt("return",n);case 3:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),(function(e){alert(e),Promise.reject(e)})),u.interceptors.response.use((function(e){var n=e.data;return h(e.config.url),null!==n&&void 0!==n&&n.code&&"OK"!==(null===n||void 0===n?void 0:n.code)?Promise.reject(new Error(n.detail||"Error")):Promise.resolve(e)}),(function(e){return h(e.config.url),s.Am.error(e.response.data.detail),Promise.reject(e)})),n.Z=u},6977:function(e,n,t){var r=t(5861),i=t(5671),a=t(3144),o=t(7757),c=t.n(o),s=t(4136),u=function(){function e(){(0,i.Z)(this,e),this.ENDPOINT="api/User"}return(0,a.Z)(e,[{key:"getAllUsers",value:function(){var e=(0,r.Z)(c().mark((function e(n){var t;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="".concat(this.ENDPOINT,"/list"),e.abrupt("return",s.Z.get(t,{params:n}).then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e,this)})));return function(n){return e.apply(this,arguments)}}()},{key:"getAllRoles",value:function(){var e=(0,r.Z)(c().mark((function e(){var n;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(this.ENDPOINT,"/Roles"),e.abrupt("return",s.Z.get(n).then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getById",value:function(){var e=(0,r.Z)(c().mark((function e(n){var t;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="".concat(this.ENDPOINT,"/").concat(n),e.abrupt("return",s.Z.get(t).then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e,this)})));return function(n){return e.apply(this,arguments)}}()},{key:"delete",value:function(){var e=(0,r.Z)(c().mark((function e(n){var t;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="".concat(this.ENDPOINT,"/Delete/").concat(n),e.abrupt("return",s.Z.delete(t).then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e,this)})));return function(n){return e.apply(this,arguments)}}()},{key:"update",value:function(){var e=(0,r.Z)(c().mark((function e(n){var t;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="".concat(this.ENDPOINT),e.abrupt("return",s.Z.put(t,n).then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e,this)})));return function(n){return e.apply(this,arguments)}}()}]),e}();n.Z=new u}}]);
//# sourceMappingURL=180.11d2fb02.chunk.js.map