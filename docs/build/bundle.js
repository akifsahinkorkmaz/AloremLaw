var app=function(){"use strict";function e(){}function s(e){return e()}function t(){return Object.create(null)}function i(e){e.forEach(s)}function a(e){return"function"==typeof e}function n(e,s){return e!=e?s==s:e!==s||e&&"object"==typeof e||"function"==typeof e}let l,r;function o(e,s){e.appendChild(s)}function c(e,s,t){e.insertBefore(s,t||null)}function u(e){e.parentNode.removeChild(e)}function m(e){return document.createElement(e)}function d(){return e=" ",document.createTextNode(e);var e}function p(e,s,t){null==t?e.removeAttribute(s):e.getAttribute(s)!==t&&e.setAttribute(s,t)}function g(e){r=e}function x(e){(function(){if(!r)throw new Error("Function called outside component initialization");return r})().$$.on_mount.push(e)}const v=[],h=[],f=[],b=[],y=Promise.resolve();let $=!1;function k(e){f.push(e)}let w=!1;const q=new Set;function L(){if(!w){w=!0;do{for(let e=0;e<v.length;e+=1){const s=v[e];g(s),M(s.$$)}for(g(null),v.length=0;h.length;)h.pop()();for(let e=0;e<f.length;e+=1){const s=f[e];q.has(s)||(q.add(s),s())}f.length=0}while(v.length);for(;b.length;)b.pop()();$=!1,w=!1,q.clear()}}function M(e){if(null!==e.fragment){e.update(),i(e.before_update);const s=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,s),e.after_update.forEach(k)}}const _=new Set;function T(e,s){e&&e.i&&(_.delete(e),e.i(s))}function S(e,s,t,i){if(e&&e.o){if(_.has(e))return;_.add(e),undefined.c.push((()=>{_.delete(e),i&&(t&&e.d(1),i())})),e.o(s)}}function C(e){e&&e.c()}function z(e,t,n,l){const{fragment:r,on_mount:o,on_destroy:c,after_update:u}=e.$$;r&&r.m(t,n),l||k((()=>{const t=o.map(s).filter(a);c?c.push(...t):i(t),e.$$.on_mount=[]})),u.forEach(k)}function j(e,s){const t=e.$$;null!==t.fragment&&(i(t.on_destroy),t.fragment&&t.fragment.d(s),t.on_destroy=t.fragment=null,t.ctx=[])}function A(e,s){-1===e.$$.dirty[0]&&(v.push(e),$||($=!0,y.then(L)),e.$$.dirty.fill(0)),e.$$.dirty[s/31|0]|=1<<s%31}function E(s,a,n,l,o,c,m,d=[-1]){const p=r;g(s);const x=s.$$={fragment:null,ctx:null,props:c,update:e,not_equal:o,bound:t(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(p?p.$$.context:a.context||[]),callbacks:t(),dirty:d,skip_bound:!1,root:a.target||p.$$.root};m&&m(x.root);let v=!1;if(x.ctx=n?n(s,a.props||{},((e,t,...i)=>{const a=i.length?i[0]:t;return x.ctx&&o(x.ctx[e],x.ctx[e]=a)&&(!x.skip_bound&&x.bound[e]&&x.bound[e](a),v&&A(s,e)),t})):[],x.update(),v=!0,i(x.before_update),x.fragment=!!l&&l(x.ctx),a.target){if(a.hydrate){const e=function(e){return Array.from(e.childNodes)}(a.target);x.fragment&&x.fragment.l(e),e.forEach(u)}else x.fragment&&x.fragment.c();a.intro&&T(s.$$.fragment),z(s,a.target,a.anchor,a.customElement),L()}g(p)}class H{$destroy(){j(this,1),this.$destroy=e}$on(e,s){const t=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return t.push(s),()=>{const e=t.indexOf(s);-1!==e&&t.splice(e,1)}}$set(e){var s;this.$$set&&(s=e,0!==Object.keys(s).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function D(s){let t,i,a,n,r,g,x;return{c(){var e,s;t=m("nav"),i=m("img"),n=d(),r=m("div"),r.innerHTML='<hr class="t svelte-124t1hx" noshade=""/> \n        <hr class="m svelte-124t1hx" noshade=""/> \n        <hr class="b svelte-124t1hx" noshade=""/>',g=d(),x=m("ul"),x.innerHTML='<li class="svelte-124t1hx"><a href="/" class="svelte-124t1hx">Services</a></li> \n        <li class="svelte-124t1hx"><a href="/" class="svelte-124t1hx">About Us</a></li> \n        <li class="svelte-124t1hx"><a href="/" class="svelte-124t1hx">Contact Us</a></li>',e=i.src,s=a="media/banner.png",l||(l=document.createElement("a")),l.href=s,e!==l.href&&p(i,"src","media/banner.png"),p(i,"alt","ACK Hukuk Bürosu"),p(i,"class","svelte-124t1hx"),p(r,"class","ham svelte-124t1hx"),p(x,"class","svelte-124t1hx"),p(t,"class","svelte-124t1hx")},m(e,a){c(e,t,a),o(t,i),o(t,n),o(t,r),s[2](r),o(t,g),o(t,x),s[3](x)},p:e,i:e,o:e,d(e){e&&u(t),s[2](null),s[3](null)}}}function O(e,s,t){let i,a,n=!0;return a=document.querySelector("nav .ham"),i=document.querySelector("nav ul"),x((()=>{"none"!=a.style.display&&a.addEventListener("click",(()=>{n?(t(1,a.children[0].style.transform="translateY(0.30rem) rotate(30deg)",a),t(1,a.children[1].style.transform="translateX(-44%) rotate(90deg)",a),t(1,a.children[2].style.transform="translateY(-0.23rem) rotate(-30deg)",a),n=!1,t(0,i.style.display="block",i),t(0,i.style.transform="translateX(0px)",i),window.addEventListener("scroll",(e=>{t(1,a.children[0].style.transform="",a),t(1,a.children[1].style.transform="",a),t(1,a.children[2].style.transform="",a),n=!0,t(0,i.style.display="none",i),t(0,i.style.transform="",i)}))):(t(1,a.children[0].style.transform="",a),t(1,a.children[1].style.transform="",a),t(1,a.children[2].style.transform="",a),n=!0,t(0,i.style.display="none",i),t(0,i.style.transform="",i))}))})),[i,a,function(e){h[e?"unshift":"push"]((()=>{a=e,t(1,a)}))},function(e){h[e?"unshift":"push"]((()=>{i=e,t(0,i)}))}]}class N extends H{constructor(e){super(),E(this,e,O,D,n,{})}}function I(s){let t;return{c(){t=m("div"),t.innerHTML='<a class="phone svelte-inxc4o" href="tel:"><img src="media/phone.png" alt="phone" class="svelte-inxc4o"/></a> \n    \n    <a class="mail svelte-inxc4o" href="mailto:akifsahinkorkmaz@outlook.com"><img src="media/mail.png" alt="mail" class="svelte-inxc4o"/></a> \n\n    <a class="contact svelte-inxc4o" href="/">Contact Us</a>',p(t,"class","svelte-inxc4o")},m(e,i){c(e,t,i),s[1](t)},p:e,i:e,o:e,d(e){e&&u(t),s[1](null)}}}function F(e,s,t){let i;return x((()=>{let e=!1;var s;s=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(s)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(s.substr(0,4)))&&(e=!0),e||t(0,i.style.transform="translateX(-50%) rotate(-90deg) translateY(-1.8rem)",i)})),[i,function(e){h[e?"unshift":"push"]((()=>{i=e,t(0,i)}))}]}class B extends H{constructor(e){super(),E(this,e,F,I,n,{})}}function U(s){let t;return{c(){t=m("footer"),t.innerHTML='<a href="mailto:akifsahinkorkmaz@outlook.com" class="svelte-1lylgf9">akifsahinkorkmaz@outlook.com</a>  \n    <p class="svelte-1lylgf9">alorem law @2021</p> \n    <a href="https://github.com/akifsahinkorkmaz" class="svelte-1lylgf9">my github</a>',p(t,"class","svelte-1lylgf9")},m(e,s){c(e,t,s)},p:e,i:e,o:e,d(e){e&&u(t)}}}class X extends H{constructor(e){super(),E(this,e,null,U,n,{})}}function Y(s){let t,i,a,n,l,r,g,x,v,h,f;return h=new X({}),{c(){t=m("article"),i=m("div"),i.innerHTML='<div class="image svelte-gxs93x"><img src="media/bookshelf.jpg" alt="Book Shelf" class="svelte-gxs93x"/> \n            <div class="svelte-gxs93x"></div></div> \n        <div class="content svelte-gxs93x"><h1 class="svelte-gxs93x">ALOREM Law Firm</h1> \n            <h2 class="svelte-gxs93x">Lorem Ipsum Dolor!</h2> \n            <p class="svelte-gxs93x">Sit, amet consectetur adipisicing elit. Officia, laboriosam. Incidunt recusandae cupiditate veritatis, voluptates quidem voluptas id ea labore quas sint, delectus dolorem! Sequi sed corrupti delectus tempora. <a href="/" class="svelte-gxs93x">Learn more about us.</a></p></div> \n        <div class="services svelte-gxs93x"><h2 class="svelte-gxs93x">Our Services</h2> \n            <div class="svelte-gxs93x"><a href="/" class="svelte-gxs93x"><p class="svelte-gxs93x">Lorem Ipsum</p></a> \n                <a href="/" class="svelte-gxs93x"><p class="svelte-gxs93x">Dolor Sit Amet</p></a> \n                <a href="/" class="svelte-gxs93x"><p class="svelte-gxs93x">amet consectetur</p></a> \n                <a href="/" class="svelte-gxs93x"><p class="svelte-gxs93x">adipisicing</p></a> \n                <a href="/" class="svelte-gxs93x"><p class="svelte-gxs93x">Officia laboriosam</p></a> \n                <a href="/" class="svelte-gxs93x"><p class="svelte-gxs93x">Incidunt</p></a></div></div>',a=d(),n=m("div"),n.innerHTML='<h2 class="svelte-gxs93x">Our Team</h2> \n\n        <div class="members svelte-gxs93x"><hr noshade="" class="svelte-gxs93x"/> \n\n            <div class="member svelte-gxs93x"><img src="media/team1.png" alt="Team Member" class="svelte-gxs93x"/> \n                <h3 class="svelte-gxs93x">Atty. Lorem Ipsum Dolor</h3> \n                <p class="svelte-gxs93x">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus molestiae unde atque, quaerat id, nihil repudiandae eius sed ab perspiciatis perferendis earum similique aspernatur aliquid itaque ipsam? Explicabo, incidunt ea.</p></div> \n\n            <hr noshade="" class="svelte-gxs93x"/> \n            \n            <div class="member svelte-gxs93x"><img src="media/team2.png" alt="Team Member" class="svelte-gxs93x"/> \n                <h3 class="svelte-gxs93x">Atty. Sitamet Consectetur</h3> \n                <p class="svelte-gxs93x">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam suscipit totam quia vero tenetur quasi reiciendis est dolorum perferendis labore laboriosam asperiores hic, excepturi quam fugiat corporis doloremque minus adipisci?</p></div> \n            \n            <hr noshade="" class="svelte-gxs93x"/> \n\n            <div class="member svelte-gxs93x"><img src="media/team3.png" alt="Team Member" class="svelte-gxs93x"/> \n                <h3 class="svelte-gxs93x">Lwy. Magnam Suscipit</h3> \n                <p class="svelte-gxs93x">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus maiores nostrum excepturi fugit amet voluptate praesentium aliquid reprehenderit natus facilis reiciendis, blanditiis debitis repellat soluta id explicabo dicta sit consequuntur!</p></div> \n\n            <hr noshade="" class="svelte-gxs93x"/> \n\n            <div class="member svelte-gxs93x"><img src="media/team4.png" alt="Team Member" class="svelte-gxs93x"/> \n                <h3 class="svelte-gxs93x">Secy. Delectus Maiores</h3> \n                <p class="svelte-gxs93x">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi aliquid veritatis omnis ipsam rem distinctio eius qui quibusdam minus temporibus consequatur obcaecati cupiditate fugiat earum eligendi incidunt, a itaque inventore.</p></div> \n\n            <hr noshade="" class="svelte-gxs93x"/> \n            \n            <div class="member svelte-gxs93x"><img src="media/team5.png" alt="Team Member" class="svelte-gxs93x"/> \n                <h3 class="svelte-gxs93x">Secy. Nisi Aliquid</h3> \n                <p class="svelte-gxs93x">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quaerat ea ratione voluptatibus dignissimos ullam, sapiente ex tempore dolorem libero debitis nulla earum consequatur excepturi illum ipsa corrupti error autem.</p></div> \n            \n            <hr noshade="" class="svelte-gxs93x"/></div>',l=d(),r=m("div"),r.innerHTML='<h2 class="svelte-gxs93x">Recent Cases</h2> \n\n        <div class="cases svelte-gxs93x"><hr noshade="" class="svelte-gxs93x"/> \n\n            <div class="case svelte-gxs93x"><img src="media/case1.jpg" alt="Coffe Shop" class="svelte-gxs93x"/> \n                <h3 class="svelte-gxs93x">Coffe Shop vs Municipality</h3> \n                <p class="svelte-gxs93x">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus aliquid deserunt quibusdam nesciunt perferendis maxime incidunt. Qui aspernatur at optio ad illo amet, aut dolorem, quo sed voluptates consequuntur voluptate? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga dolor iste nisi quae, maiores neque rem veniam sapiente repudiandae quia sequi non aperiam ratione facere deserunt itaque illum possimus eligendi!</p></div> \n\n            <hr noshade="" class="svelte-gxs93x"/> \n\n            <div class="case svelte-gxs93x"><img src="media/case2.jpg" alt="Clothing Shop" class="svelte-gxs93x"/> \n                <h3 class="svelte-gxs93x">Clothing Co. vs Mall</h3> \n                <p class="svelte-gxs93x">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, consectetur provident temporibus dolorem possimus, at sapiente minus debitis modi nisi dolore deserunt laborum consequatur impedit corrupti facilis quaerat vel eum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis omnis provident quasi, aliquam perspiciatis ipsum quaerat deserunt quod voluptas dicta, veritatis ducimus vitae nostrum nam nihil adipisci id recusandae ea?</p></div> \n\n            <hr noshade="" class="svelte-gxs93x"/> \n\n            <div class="case svelte-gxs93x"><img src="media/case3.jpg" alt="Workers" class="svelte-gxs93x"/> \n                <h3 class="svelte-gxs93x">Workers vs Construction Co.</h3> \n                <p class="svelte-gxs93x">Lorem ipsum dolor sit amet, consectetur adipisicing elit. In numquam placeat cupiditate libero blanditiis aut ducimus! Corrupti quo sapiente numquam consequatur tenetur, nobis consectetur aperiam, vero sunt commodi recusandae libero? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium nihil, natus qui, tenetur porro repellat exercitationem aut ullam sit libero iste amet ipsum eligendi sunt sapiente illo placeat consectetur laboriosam.</p></div></div>',g=d(),x=m("div"),x.innerHTML='<h2 class="svelte-gxs93x">Disclaimer</h2> \n        <ul class="svelte-gxs93x"><li><p class="svelte-gxs93x">This is not a legitimate Law Firm&#39;s website.</p></li> \n            <li><p class="svelte-gxs93x">None of the contents of this website is real, all made up!</p></li> \n            <li><p class="svelte-gxs93x">This website is coded purely for artistic purposes.</p></li></ul> \n        <h2 class="svelte-gxs93x">Disclaimer</h2>',v=d(),C(h.$$.fragment),p(i,"id","landing"),p(i,"class","svelte-gxs93x"),p(n,"id","team"),p(n,"class","svelte-gxs93x"),p(r,"id","cases"),p(r,"class","svelte-gxs93x"),p(x,"id","disclaimer"),p(x,"class","svelte-gxs93x"),p(t,"class","svelte-gxs93x")},m(e,s){c(e,t,s),o(t,i),o(t,a),o(t,n),o(t,l),o(t,r),o(t,g),o(t,x),o(t,v),z(h,t,null),f=!0},p:e,i(e){f||(T(h.$$.fragment,e),f=!0)},o(e){S(h.$$.fragment,e),f=!1},d(e){e&&u(t),j(h)}}}function R(e){return x((()=>{setTimeout((()=>{window.confirm("This is an artistic project. See disclaimer below!")&&(window.location.href="#disclaimer")}),5e3)})),[]}class W extends H{constructor(e){super(),E(this,e,R,Y,n,{})}}function K(s){let t,i,a,n,l,r,g;return i=new N({}),n=new W({}),r=new B({}),{c(){t=m("main"),C(i.$$.fragment),a=d(),C(n.$$.fragment),l=d(),C(r.$$.fragment),p(t,"class","svelte-eujqkv")},m(e,s){c(e,t,s),z(i,t,null),o(t,a),z(n,t,null),o(t,l),z(r,t,null),g=!0},p:e,i(e){g||(T(i.$$.fragment,e),T(n.$$.fragment,e),T(r.$$.fragment,e),g=!0)},o(e){S(i.$$.fragment,e),S(n.$$.fragment,e),S(r.$$.fragment,e),g=!1},d(e){e&&u(t),j(i),j(n),j(r)}}}return new class extends H{constructor(e){super(),E(this,e,null,K,n,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
