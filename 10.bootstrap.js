(self.webpackChunkshc_wasm=self.webpackChunkshc_wasm||[]).push([[10],{199:(t,e,n)=>{"use strict";n.a(t,(async a=>{n.d(e,{DH:()=>v,Pd:()=>x,Jr:()=>T,ug:()=>q,h9:()=>I,Dz:()=>A,kF:()=>C,$_:()=>D,y1:()=>B,eY:()=>H,UZ:()=>L,NI:()=>S,Or:()=>N});var r=n(461);t=n.hmd(t);var _=a([r]);r=(_.then?await _:_)[0];const s=new Array(32).fill(void 0);function i(t){return s[t]}s.push(void 0,null,!0,!1);let o=s.length;function d(t){const e=i(t);return function(t){t<36||(s[t]=o,o=t)}(t),e}let l=new("undefined"==typeof TextDecoder?(0,t.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});l.decode();let c=null;function u(){return null!==c&&c.buffer===r.memory.buffer||(c=new Uint8Array(r.memory.buffer)),c}function p(t,e){return l.decode(u().subarray(t,t+e))}function g(t){o===s.length&&s.push(s.length+1);const e=o;return o=s[e],s[e]=t,e}let f=null;function w(){return null!==f&&f.buffer===r.memory.buffer||(f=new Int32Array(r.memory.buffer)),f}let m=0,h=new("undefined"==typeof TextEncoder?(0,t.require)("util").TextEncoder:TextEncoder)("utf-8");const b="function"==typeof h.encodeInto?function(t,e){return h.encodeInto(t,e)}:function(t,e){const n=h.encode(t);return e.set(n),{read:t.length,written:n.length}};function y(t,e,n){if(void 0===n){const n=h.encode(t),a=e(n.length);return u().subarray(a,a+n.length).set(n),m=n.length,a}let a=t.length,r=e(a);const _=u();let s=0;for(;s<a;s++){const e=t.charCodeAt(s);if(e>127)break;_[r+s]=e}if(s!==a){0!==s&&(t=t.slice(s)),r=n(r,a,a=s+3*t.length);const e=u().subarray(r+s,r+a);s+=b(t,e).written}return m=s,r}function v(){r.main()}class k{static __wrap(t){const e=Object.create(k.prototype);return e.ptr=t,e}__destroy_into_raw(){const t=this.ptr;return this.ptr=0,t}free(){const t=this.__destroy_into_raw();r.__wbg_statusentry_free(t)}get mark(){try{const n=r.__wbindgen_add_to_stack_pointer(-16);r.statusentry_mark(n,this.ptr);var t=w()[n/4+0],e=w()[n/4+1];return p(t,e)}finally{r.__wbindgen_add_to_stack_pointer(16),r.__wbindgen_free(t,e)}}set mark(t){var e=y(t,r.__wbindgen_malloc,r.__wbindgen_realloc),n=m;r.statusentry_set_mark(this.ptr,e,n)}get text(){try{const n=r.__wbindgen_add_to_stack_pointer(-16);r.statusentry_text(n,this.ptr);var t=w()[n/4+0],e=w()[n/4+1];return p(t,e)}finally{r.__wbindgen_add_to_stack_pointer(16),r.__wbindgen_free(t,e)}}set text(t){var e=y(t,r.__wbindgen_malloc,r.__wbindgen_realloc),n=m;r.statusentry_set_text(this.ptr,e,n)}}class x{static __wrap(t){const e=Object.create(x.prototype);return e.ptr=t,e}__destroy_into_raw(){const t=this.ptr;return this.ptr=0,t}free(){const t=this.__destroy_into_raw();r.__wbg_universe_free(t)}static new(){var t=r.universe_new();return x.__wrap(t)}parse(t){try{const s=r.__wbindgen_add_to_stack_pointer(-16);var e=y(t,r.__wbindgen_malloc,r.__wbindgen_realloc),n=m;r.universe_parse(s,this.ptr,e,n);var a=w()[s/4+0],_=w()[s/4+1];let i;return 0!==a&&(i=p(a,_).slice(),r.__wbindgen_free(a,1*_)),i}finally{r.__wbindgen_add_to_stack_pointer(16)}}update(){try{const n=r.__wbindgen_add_to_stack_pointer(-16);r.universe_update(n,this.ptr);var t=w()[n/4+0],e=w()[n/4+1];let a;return 0!==t&&(a=p(t,e).slice(),r.__wbindgen_free(t,1*e)),a}finally{r.__wbindgen_add_to_stack_pointer(16)}}data(){try{const n=r.__wbindgen_add_to_stack_pointer(-16);r.universe_data(n,this.ptr);var t=w()[n/4+0],e=w()[n/4+1];return p(t,e)}finally{r.__wbindgen_add_to_stack_pointer(16),r.__wbindgen_free(t,e)}}issuer(){try{const n=r.__wbindgen_add_to_stack_pointer(-16);r.universe_issuer(n,this.ptr);var t=w()[n/4+0],e=w()[n/4+1];let a;return 0!==t&&(a=p(t,e).slice(),r.__wbindgen_free(t,1*e)),a}finally{r.__wbindgen_add_to_stack_pointer(16)}}issuer_is_calif_dph(){return 0!==r.universe_issuer_is_calif_dph(this.ptr)}kid(){try{const n=r.__wbindgen_add_to_stack_pointer(-16);r.universe_kid(n,this.ptr);var t=w()[n/4+0],e=w()[n/4+1];let a;return 0!==t&&(a=p(t,e).slice(),r.__wbindgen_free(t,1*e)),a}finally{r.__wbindgen_add_to_stack_pointer(16)}}patient_name(){try{const n=r.__wbindgen_add_to_stack_pointer(-16);r.universe_patient_name(n,this.ptr);var t=w()[n/4+0],e=w()[n/4+1];let a;return 0!==t&&(a=p(t,e).slice(),r.__wbindgen_free(t,1*e)),a}finally{r.__wbindgen_add_to_stack_pointer(16)}}imm_count(){return r.universe_imm_count(this.ptr)>>>0}imm_elapsed_time(){try{const n=r.__wbindgen_add_to_stack_pointer(-16);r.universe_imm_elapsed_time(n,this.ptr);var t=w()[n/4+0],e=w()[n/4+1];return 0===t?void 0:e}finally{r.__wbindgen_add_to_stack_pointer(16)}}imm_code(t){try{const a=r.__wbindgen_add_to_stack_pointer(-16);r.universe_imm_code(a,this.ptr,t);var e=w()[a/4+0],n=w()[a/4+1];return p(e,n)}finally{r.__wbindgen_add_to_stack_pointer(16),r.__wbindgen_free(e,n)}}imm_occurrence(t){try{const a=r.__wbindgen_add_to_stack_pointer(-16);r.universe_imm_occurrence(a,this.ptr,t);var e=w()[a/4+0],n=w()[a/4+1];return p(e,n)}finally{r.__wbindgen_add_to_stack_pointer(16),r.__wbindgen_free(e,n)}}imm_provider(t){try{const a=r.__wbindgen_add_to_stack_pointer(-16);r.universe_imm_provider(a,this.ptr,t);var e=w()[a/4+0],n=w()[a/4+1];return p(e,n)}finally{r.__wbindgen_add_to_stack_pointer(16),r.__wbindgen_free(e,n)}}imm_lot(t){try{const a=r.__wbindgen_add_to_stack_pointer(-16);r.universe_imm_lot(a,this.ptr,t);var e=w()[a/4+0],n=w()[a/4+1];return p(e,n)}finally{r.__wbindgen_add_to_stack_pointer(16),r.__wbindgen_free(e,n)}}imm_completed(t){return 0!==r.universe_imm_completed(this.ptr,t)}imm_is_two_dose(t){var e=r.universe_imm_is_two_dose(this.ptr,t);return 16777215===e?void 0:0!==e}vax_detail(){return d(r.universe_vax_detail(this.ptr))}vax_status(){var t=r.universe_vax_status(this.ptr);return 0===t?void 0:k.__wrap(t)}}class E{static __wrap(t){const e=Object.create(E.prototype);return e.ptr=t,e}__destroy_into_raw(){const t=this.ptr;return this.ptr=0,t}free(){const t=this.__destroy_into_raw();r.__wbg_vaxdetail_free(t)}get mark(){try{const n=r.__wbindgen_add_to_stack_pointer(-16);r.vaxdetail_mark(n,this.ptr);var t=w()[n/4+0],e=w()[n/4+1];return p(t,e)}finally{r.__wbindgen_add_to_stack_pointer(16),r.__wbindgen_free(t,e)}}set mark(t){var e=y(t,r.__wbindgen_malloc,r.__wbindgen_realloc),n=m;r.vaxdetail_set_mark(this.ptr,e,n)}get code(){try{const n=r.__wbindgen_add_to_stack_pointer(-16);r.vaxdetail_code(n,this.ptr);var t=w()[n/4+0],e=w()[n/4+1];return p(t,e)}finally{r.__wbindgen_add_to_stack_pointer(16),r.__wbindgen_free(t,e)}}set code(t){var e=y(t,r.__wbindgen_malloc,r.__wbindgen_realloc),n=m;r.vaxdetail_set_code(this.ptr,e,n)}get date(){try{const n=r.__wbindgen_add_to_stack_pointer(-16);r.vaxdetail_date(n,this.ptr);var t=w()[n/4+0],e=w()[n/4+1];return p(t,e)}finally{r.__wbindgen_add_to_stack_pointer(16),r.__wbindgen_free(t,e)}}set date(t){var e=y(t,r.__wbindgen_malloc,r.__wbindgen_realloc),n=m;r.vaxdetail_set_date(this.ptr,e,n)}get location(){try{const n=r.__wbindgen_add_to_stack_pointer(-16);r.vaxdetail_location(n,this.ptr);var t=w()[n/4+0],e=w()[n/4+1];return p(t,e)}finally{r.__wbindgen_add_to_stack_pointer(16),r.__wbindgen_free(t,e)}}set location(t){var e=y(t,r.__wbindgen_malloc,r.__wbindgen_realloc),n=m;r.vaxdetail_set_location(this.ptr,e,n)}get lot(){try{const n=r.__wbindgen_add_to_stack_pointer(-16);r.vaxdetail_lot(n,this.ptr);var t=w()[n/4+0],e=w()[n/4+1];return p(t,e)}finally{r.__wbindgen_add_to_stack_pointer(16),r.__wbindgen_free(t,e)}}set lot(t){var e=y(t,r.__wbindgen_malloc,r.__wbindgen_realloc),n=m;r.vaxdetail_set_lot(this.ptr,e,n)}}function T(t){return g(E.__wrap(t))}function q(t){d(t)}function I(){return g(new Error)}function A(t,e){var n=y(i(e).stack,r.__wbindgen_malloc,r.__wbindgen_realloc),a=m;w()[t/4+1]=a,w()[t/4+0]=n}function C(t,e){try{console.error(p(t,e))}finally{r.__wbindgen_free(t,e)}}function D(){return g(new Array)}function B(t,e){return i(t).push(i(e))}function H(t){return i(t).getTime()}function L(t){return i(t).getTimezoneOffset()}function S(){return g(new Date)}function N(t,e){throw new Error(p(t,e))}}))},461:(t,e,n)=>{"use strict";var a=([a])=>n.v(e,t.id,"ee1c1b7550cd382ec967",{"./shc_wasm_bg.js":{__wbg_vaxdetail_new:a.Jr,__wbindgen_object_drop_ref:a.ug,__wbg_new_59cb74e423758ede:a.h9,__wbg_stack_558ba5917b466edd:a.Dz,__wbg_error_4bb6c2a97407129a:a.kF,__wbg_new_515b65a8e7699d00:a.$_,__wbg_push_b7f68478f81d358b:a.y1,__wbg_getTime_55dfad3366aec58a:a.eY,__wbg_getTimezoneOffset_baab8599eeb15f06:a.UZ,__wbg_new0_85024d5e91a046e9:a.NI,__wbindgen_throw:a.Or}});n.a(t,(t=>{var e=t([n(199)]);return e.then?e.then(a):a(e)}),1)},10:(t,e,n)=>{"use strict";n.a(t,(async t=>{n.r(e);var a=n(199),r=n(166),_=t([a]);a=(_.then?await _:_)[0];const s=n(102),i=n(373)();a.DH(),s.registerHelper("ifEquals",(function(t,e,n){return t===e?"function"!=typeof n.fn||n.fn(this):"function"==typeof n.inverse&&n.inverse(this)}));const o={allowedProtoProperties:{mark:!0,text:!0,code:!0,date:!0,location:!0,lot:!0}},d=s.compile("\n<tr class='patient'><td class='patient name cl-blue' colspan=3>{{name}}</td></tr>\n<tr><td class='patient-dob' colspan=3>{{dob}}</td></tr>\n{{#each vax}}\n    <tr class='detail_status'>\n        {{#ifEquals mark 'green'}}\n            <td class='vax-status cl-green' rowspan=2>&#x2713;</td>\n        {{/ifEquals}}\n        {{#ifEquals mark 'yellow'}}\n            <td class='vax-status cl-yellow' rowspan=2>&#x203c;</td>\n        {{/ifEquals}}\n        {{#ifEquals mark 'red'}}\n            <td class='vax-status cl-red' rowspan=2>&#x2718;</td>\n        {{/ifEquals}}\n        <td colspan='2' class='vax-name cl-yellow'>{{code}}</td>\n    </tr>\n    <tr class='detail_status'>\n        <td class='vax-lot' title='Lot: {{lot}}'>{{lot}}</td>\n        <td class='vax-location'>{{location}} ({{date}})</td>\n    </tr>\n{{/each}}\n{{#each status}}\n    <tr class='detail_status' id='vax-status-row'>\n        {{#ifEquals mark 'green'}}\n            <td class='vax-status cl-green'>&#x2713;</td>\n        {{/ifEquals}}\n        {{#ifEquals mark 'yellow'}}\n            <td class='vax-status cl-yellow'>&#x203c;</td>\n        {{/ifEquals}}\n        {{#ifEquals mark 'red'}}\n            <td class='vax-status cl-red'>&#x2718;</td>\n        {{/ifEquals}}\n        <td colspan=2>{{text}}</td>\n    </tr>\n{{/each}}\n{{#ifEquals vax_okay (ifEquals valid_sig (ifEquals is_cadph true)) }}\n    <tr class='smile_status active'><td class='cl-green' colspan=4>&#x263A;</td></tr>\n{{else}}\n    <tr class='smile_status active'><td class='cl-red' colspan=4>&#x2639;</td></tr>\n{{/ifEquals}}\n<tr class='smile_status active'><td colspan=4 style='font-size: 14pt'>Tap for details</td></tr>\n");class l{static file_changed(){let t,e,n,a;l.update_status("Loading…"),"function"==typeof window.FileReader?(t=document.getElementById("imgfile"),t?t.files?t.files[0]?(e=t.files[0],n=new FileReader,n.onload=function(){a=new Image,a.onload=l.image_loaded,a.src=n.result},n.readAsDataURL(e)):l.update_status("Please select a file before clicking 'Load'"):l.update_status("This browser doesn't seem to support the `files` property of file inputs."):l.update_status("Couldn't find the imgfile element.")):l.update_status("The file API isn't supported on this browser yet.")}static async image_loaded(t){let e=t.target;l.update_status("Scanning for QR codes");let n=a.Pd.new(),_=await l.resize_image(e);if(void 0!==n.parse(_))return void l.update_status("No Smart Health Card found: QR is not a valid Smart Health Card");let s=n.update();if(s)return void l.update_status(s);let i=n.imm_count();1===i?l.update_status("Found 1 record"):l.update_status(`Found ${i} records`);let c={name:n.patient_name(),dob:null,vax:[],status:[]};for(let t of n.vax_detail())c.vax.push(t);let u=n.vax_status();u&&c.status.push(u),c.is_cadph=n.issuer_is_calif_dph(),!1===c.is_cadph?(c.status.push({mark:"red",text:"Not issued by the California Department of Public Health"}),l.update_table(d(c,o)),l.update_status()):(l.update_status("Verifying signature"),fetch(`${n.issuer()}/.well-known/jwks.json`).then((t=>{if(!t.ok)throw Error(t.statusText);return t})).then((t=>t.json())).then((t=>{if(void 0===t.keys||!(t.keys.length>0))return c.status.push({mark:"red",text:"Unverified, public key could not be fetched"}),c;{let a,_=n.data(),s=n.kid(),i=_.split("."),o=i[0],d=i[1],l=i[2],u=!1,p=t.keys.reduce((function(t,e){return t[e.kid]=e,t}),{});if(void 0!==s&&(a=p[s],void 0!==a?u=!0:console.error("We don't have this key")),!1===u&&(console.error("Take the first key we've got"),a=t.keys[0],void 0===a))return c.status.push({mark:"red",text:"Unverified, public key could not be fetched"}),c;let g=new r.fs.crypto.Signature({alg:"SHA256withECDSA"});g.init(a),g.updateString(`${o}.${d}`);let f=r.fs.crypto.ECDSA.concatSigToASN1Sig((0,r.Zk)(l));var e=g.verify(f);!1===e?(c.valid_sig=!1,c.status.push({mark:"red",text:"Not issued by the California Department of Public Health"})):!0===e&&!1===u?(c.valid_sig=!1,c.status.push({mark:"yellow",text:"Potentially issued by the California Department of Public Health, key thumbprint mismatch"})):!0===e&&!0===u&&(c.valid_sig=!0,c.status.push({mark:"green",text:"Issued by the California Department of Public Health"}))}return c})).then((t=>{l.update_table(d(t,o)),l.update_status()})).catch((t=>{c.status.push({mark:"red",text:"Unverified, public key could not be fetched"}),l.update_table(d(c,o)),l.update_status()})))}static toggle_row_on(t){let e=new Set(t.classList);e.add("active"),t.className=[...e].join(" ")}static toggle_row_off(t){let e=new Set(t.classList);e.delete("active"),t.className=[...e].join(" ")}static async resize_image(t){const e=document.getElementById("canvas"),n=e.getContext("2d");e.width=t.width,e.height=t.height,n.drawImage(t,0,0,t.width,t.height,0,0,t.width,t.height);let a,r,_,s=!0;return t.width>=t.height?(a=1024,r=a/t.width,_=Math.round(t.height*r),a>=t.width&&(s=!1)):(_=1024,r=_/t.height,a=Math.round(t.width*r),_>=t.height&&(s=!1)),!0===s&&(e.height=_,e.width=a,await i.resize(t,e,{quality:3,unsharpAmount:0}).then((t=>console.log("resize done!",t)))),e.toDataURL("image/png").replace("data:image/png;base64,","")}static update_table(t){""==t?(document.getElementById("vax-body").innerHTML="",document.getElementById("vax").style.visibility="hidden"):(document.getElementById("vax-body").innerHTML=t,document.getElementById("vax").style.visibility="visible")}static update_status(t){let e=document.getElementById("status");void 0===t?(e.innerHTML="…",e.style.display="none"):(e.innerHTML=t,e.style.display="block")}}document.getElementById("vax-body").addEventListener("click",(function(t){const e=t.target.parentElement;e.classList.contains("smile_status")?(Array.prototype.map.call(document.getElementsByClassName("detail_status"),l.toggle_row_on),Array.prototype.map.call(document.getElementsByClassName("smile_status"),l.toggle_row_off)):e.classList.contains("detail_status")&&(Array.prototype.map.call(document.getElementsByClassName("detail_status"),l.toggle_row_off),Array.prototype.map.call(document.getElementsByClassName("smile_status"),l.toggle_row_on))})),document.getElementById("imgfile").onchange=function(){l.update_table(""),setTimeout(l.file_changed,100)}}))}}]);