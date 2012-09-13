/*
   http://www.github.com/tapquo/lungo/blob/master/LICENSE.txt
 @version   2.0
 @link      https://github.com/TapQuo/Lungo.js

 @author   Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 @author   Guillermo Pascual <pasku@tapquo.com> || @pasku1
*/
var Lungo=Lungo||{};Lungo.VERSION="2.0";Lungo.Attributes||(Lungo.Attributes={});Lungo.Data||(Lungo.Data={});Lungo.Sugar||(Lungo.Sugar={});Lungo.View||(Lungo.View={});Lungo.Boot||(Lungo.Boot={});Lungo.Device||(Lungo.Device={});Lungo.ready||(Lungo.ready=Quo().ready);Lungo.init=function(a){Lungo.Boot.Resources.init(a.resources);Lungo.Boot.Events.init();Lungo.Boot.Data.init();Lungo.Boot.Section.init();Lungo.Boot.Article.init()};Lungo.Core=function(a,f){var e=Array.prototype,h=function(b,c){return f.isOwnProperty(b,c)},d=function(b){return f.toType(b)},g=function(b){return e.slice.call(b,0)};return{log:function(b,c){a.Core.isMobile()||console[b===1?"log":b===2?"warn":"error"](c)},execute:function(){var b=g(arguments),c=b.shift();d(c)==="function"&&c.apply(null,b)},bind:function(b,c){return function(){return c.apply(b,g(arguments))}},mix:function(){for(var b=b||{},c=0,k=arguments.length;c<k;c++){var i=arguments[c],j;for(j in i)if(h(i,
j))b[j]=i[j]}return b},isOwnProperty:h,toType:d,toArray:g,isMobile:function(){return f.isMobile()},environment:function(){return f.environment()},orderByProperty:function(b,c,k){var i=k==="desc"?-1:1;return b.sort(function(j,m){return j[c]<m[c]?-i:j[c]>m[c]?i:0})},parseUrl:function(b){var c=b.lastIndexOf("#");if(c>0)b=b.substring(c);else if(c===-1)b="#"+b;return b},findByProperty:function(b,c,k){for(var i=null,j=0,m=b.length;j<m;j++){var n=b[j];if(n[c]==k){i=n;break}}return i}}}(Lungo,Quo);Lungo.dom=function(a){return $$(a)};Lungo.Service=function(a,f){var e={MINUTE:"minute",HOUR:"hour",DAY:"day"},h=function(d,g){var b=false,c=a.Data.Storage.persistent("lungojs_service_cache");if(c){c=c[d];b=(new Date).getTime();c=(new Date(c)).getTime();var k=b-c;b=g.split(" ");c=b[1];k=k/1E3/60;if(c.indexOf(e.HOUR)>=0)k/=60;else if(c.indexOf(e.DAY)>=0)k=k/60/24;b=k<b[0]?true:false}return b};return{get:function(d,g,b,c){return f.get(d,g,b,c)},post:function(d,g,b,c){return f.post(d,g,b,c)},json:function(d,g,b){return f.json(d,g,b)},cache:function(d,
g,b,c,k){var i=d+f.serializeParameters(g);if(h(i,b)){if(d=a.Data.Storage.persistent(i))return c.call(c,d)}else return f.get(d,g,function(j){var m=a.Data.Storage.persistent("lungojs_service_cache")||{};m[i]=new Date;a.Data.Storage.persistent("lungojs_service_cache",m);a.Data.Storage.persistent(i,j);c.call(c,j)},k)},Settings:f.ajaxSettings}}(Lungo,Quo);Lungo.Constants={ELEMENT:{SECTION:"section",ARTICLE:"article",ASIDE:"aside",BODY:"body",DIV:"div",LIST:"<ul></ul>",LI:"li",SPAN:"<span>&nbsp;</span>"},CLASS:{ACTIVE:"active",ASIDE:"aside",SHOW:"show",HIDE:"hide",CURRENT:"current",RIGHT:"right",LEFT:"left",HORIZONTAL:"horizontal",SMALL:"small"},TRIGGER:{LOAD:"load",UNLOAD:"unload"},ATTRIBUTE:{ID:"id",HREF:"href",TITLE:"title",ARTICLE:"article",CLASS:"class",WIDTH:"width",HEIGHT:"height",PIXEL:"px",PERCENT:"%",TARGET:"target",FIRST:"first",LAST:"last",
EMPTY:""},BINDING:{START:"{{",END:"}}",KEY:"value",PARSER:/\{{.*?\}}/gi},ERROR:{CREATE_SCROLL:"ERROR: Impossible to create a <scroll> without ID.",BINDING_DATA_TYPE:"ERROR: Processing the type of binding data.",BINDING_TEMPLATE:"ERROR: Binding Template not exists >> ",BINDING_LIST:"ERROR: Processing parameters for list binding.",DATABASE:"ERROR: Connecting to Data.Sql.",DATABASE_TRANSACTION:"ERROR: Data.Sql >> ",ROUTER:"ERROR: The target does not exists >>",LOADING_RESOURCE:"ERROR: Loading resource: "}};Lungo.Element={sections:null,Current:{section:null,article:null,aside:null},asides:null,toolbars:null};Lungo.Events=function(a){return{init:function(f){for(event in f){var e=event.indexOf(" ");if(e>0){var h=event.substring(0,e);e=event.substring(e+1);a.dom(e).on(h,f[event])}}}}}(Lungo);Lungo.Notification=function(a,f){var e=[],h=null,d=null,g=a.Constants.BINDING,b={BODY:"body",NOTIFICATION:".notification",MODAL:".notification .window",MODAL_HREF:".notification .window a",WINDOW_CLOSABLE:".notification > .url .close",CONFIRM_BUTTONS:".notification .confirm a.button"},c={MODAL:"modal",VISIBLE:"visible",SHOW:"show",WORKING:"working",INPUT:"input"},k=function(){d.removeClass(c.SHOW);setTimeout(function(){h.style("display","none").removeClass("url").removeClass("confirm").removeClass("modal")},
290)},i=function(l,o,r,s,t,u){j(false);d.addClass(s||"info").addClass("special notify");m(p(l,o,r));n(t,u)},j=function(l,o){h.style("display")==="none"&&h.show();l&&h.addClass(c.MODAL)||h.removeClass(c.MODAL);d.removeClass(c.SHOW).removeClass(c.WORKING);d.removeClass("url").removeClass("notify").removeClass("confirm").removeClass("special").removeClass("working");d.removeClass("error").removeClass("alert").removeClass("success");o&&d.addClass(c.WORKING)},m=function(l){d.html(l);setTimeout(function(){d.addClass(c.SHOW)},
1)},n=function(l,o){l!==f&&l!==0&&setTimeout(function(){k();o&&setTimeout(o,300)},l*1E3)},p=function(l,o,r){return'<span class="icon '+r+'"></span><strong>'+l+"</strong><small>"+o+"</small>"},q=function(l,o){return'<a href="#" data-callback="'+o+'" class="button '+l.color+'" data-icon="'+l.icon+'">'+l.label+"</a>"};a.dom(b.BODY).append('<div class="notification"><div class="window"></div></div>');h=a.dom(b.NOTIFICATION);d=h.children(".window");(function(){d.tap(function(){d.hasClass("notify")&&k()});
a.dom(b.CONFIRM_BUTTONS).tap(function(){var l=a.dom(this);(l=e[l.data("callback")].callback)&&l.call(l);k()});a.dom(b.WINDOW_CLOSABLE).tap(k)})();return{show:function(l,o,r,s,t,u){j(true,s);m(p(l,o,r));n(t,u)},hide:k,error:function(l,o,r,s,t){i(l,o,r,"error",s,t)},alert:function(l,o,r,s,t){i(l,o,r,"alert",s,t)},success:function(l,o,r,s,t){i(l,o,r,"success",s,t)},confirm:function(l){e=l;j(false);var o="<p>"+p(l.title,l.description,l.icon)+"</p><hr/>";o+=q(l.accept,"accept");o+=q(l.cancel,"cancel");
d.addClass("special confirm");m(o)},html:function(l,o){j(true);d.addClass("url");l+=o?'<span class="icon close"></span>':"";m(l)},loading:function(){j(true);var l=a.Attributes.Data.Loading.html.replace(g.START+g.KEY+g.END,"icon loading white");m(l)}}}(Lungo);Lungo.Fallback=function(a){return{androidInputs:function(f,e){environment=a.Core.environment();if(environment.isMobile&&environment.os.name==="android"&&environment.os.version<"4")for(var h=a.dom(f+" input, "+f+" textarea, "+f+" select"),d=0,g=h.length;d<g;d++)e?h[d].removeAttribute("disabled"):h[d].setAttribute("disabled","disabled")},positionFixed:function(f){environment=a.Core.environment();environment.isMobile&&environment.os.name==="ios"&&environment.os.version>="4.2"&&f.style("position","fixed")}}}(Lungo);Lungo.Router=function(a){var f=a.Constants.CLASS,e=a.Constants.ELEMENT,h=a.Constants.TRIGGER,d=a.Constants.ATTRIBUTE,g=function(b){b=a.Core.parseUrl(b);var c=a.Element.Current.section;if(b!=="#"+c.attr("id")?true:false){var k=a.Element.sections.siblings(e.SECTION+b);if(k.length>0){c.removeClass(f.SHOW).addClass(f.HIDE);k.addClass(f.SHOW);a.Element.Current.section=k;a.Element.Current.article=k.find(e.ARTICLE+"."+f.CURRENT);a.Router.History.add(b);c.trigger(h.UNLOAD);k.trigger(h.LOAD)}}};return{section:g,
article:function(b,c,k){c=a.Core.parseUrl(c);var i=a.Element.Current.article;if(c!=="#"+i.attr("id")?true:false){g(b);b=a.Element.Current.section.find(e.ARTICLE+c);if(b.length>0){i.parent("section").attr("id")===b.parent("section").attr("id")?i.removeClass(f.CURRENT):a.Element.Current.section.children(e.ARTICLE).removeClass(f.CURRENT);b.addClass(f.CURRENT);a.Element.Current.article=b;a.View.Article.switchNavItems(c);a.View.Article.switchReferenceItems(c,a.Element.Current.section);k&&a.View.Article.title(k.data(d.TITLE))}}},
aside:function(b,c){c=a.Core.parseUrl(c);a.View.Aside.toggle(c)},back:function(){var b=a.Element.Current.section;b.removeClass(f.SHOW);a.Router.History.removeLast();target=a.Element.sections.siblings(e.SECTION+a.Router.History.current());target.removeClass(f.HIDE).addClass(f.SHOW);var c=a.Element.Current.section=target;b.trigger(h.UNLOAD);c.trigger(h.LOAD)}}}(Lungo);Lungo.Router.History=function(){var a=[],f=function(){return a[a.length-1]};return{add:function(e){e!==f()&&a.push(e)},current:f,removeLast:function(){a.length-=1}}}();Lungo.View.Resize=function(a){var f=a.Constants.ATTRIBUTE;return{toolbars:function(){if(!a.Element.toolbars)a.Element.toolbars=a.dom(".toolbar nav, .groupbar");for(var e=a.Element.toolbars,h=0,d=e.length;h<d;h++){var g=a.dom(e[h]),b=g.children();g=100/g.children().length;b.style(f.WIDTH,g+f.PERCENT)}}}}(Lungo);Lungo.View.Article=function(a){var f=a.Constants.CLASS,e=a.Constants.ATTRIBUTE,h={NAVIGATION_ITEM:'a[href][data-target="article"]',REFERENCE_LINK:" a[href][data-article]",TITLE_OF_ARTICLE:"header .title, footer .title",ASIDE_REFERENCE_LIST:"li a.current, li.current"};return{title:function(d){d&&a.Element.Current.section.find(h.TITLE_OF_ARTICLE).text(d)},switchReferenceItems:function(d,g){d=d.replace("#","");for(var b=g.find(h.REFERENCE_LINK),c=0,k=b.length;c<k;c++){var i=a.dom(b[c]);i.data(e.ARTICLE)===
d?i.show():i.hide()}},switchNavItems:function(d){a.Element.Current.section.find(h.NAVIGATION_ITEM).removeClass(f.CURRENT);d='a[href="'+d+'"][data-target="article"]';a.Element.Current.section.find(d).addClass(f.CURRENT);if(a.Element.Current.aside){aside=a.Element.Current.aside;aside.find(h.ASIDE_REFERENCE_LIST).removeClass(f.CURRENT);aside.find(d).addClass(f.CURRENT).parent().addClass(f.CURRENT)}}}}(Lungo);Lungo.View.Aside=function(a){var f=a.Constants.ELEMENT,e=a.Constants.CLASS,h=a.Constants.ATTRIBUTE,d=function(b){var c=null,k=a.Element.asides.length;if(k==1){if("#"+a.Element.asides[0].id==b)c=a.dom(a.Element.asides[0])}else if(k>1)c=a.Element.asides.siblings(f.ASIDE+b);return c},g=function(b){b=b.attr(h.CLASS);var c="";if(b){c+=b.indexOf(e.RIGHT)>-1?e.RIGHT:"";c+=b.indexOf(e.SMALL)>-1?e.SMALL:""}return c};return{toggle:function(b){if(aside=d(b))aside.hasClass(e.SHOW)?a.View.Aside.hide():a.View.Aside.show(aside);
aside=null},show:function(b){if(a.Core.toType(b)=="string")b=d(b);if(b){a.Element.Current.aside=b;var c=g(b);b.addClass(e.SHOW);a.Element.Current.section.addClass(c).addClass(e.ASIDE)}},hide:function(){var b=a.Element.Current.aside;if(b){a.Element.Current.section.removeClass(e.ASIDE);var c=g(b);c&&a.Element.Current.section.removeClass(c);setTimeout(function(){b.removeClass(e.SHOW);a.Element.Current.aside=null},250)}}}}(Lungo);Lungo.View.Element=function(a){var f=a.Constants.ATTRIBUTE,e=a.Constants.BINDING,h={BUBBLE:".bubble.count",PROGRESS_VALUE:" .value",PROGRESS_PERCENTAGE:" .value .label"};return{count:function(d,g){var b=a.dom(d);if(b)if(g>0){var c=b.children(h.BUBBLE);if(c.length>0)c.html(g);else{c=Lungo.Attributes.Data.Count.html.replace(e.START+e.KEY+e.END,g);b.append(c)}}else b.children(h.BUBBLE).remove()},progress:function(d,g,b){if(a.dom(d)){g+=f.PERCENT;a.dom(d+h.PROGRESS_VALUE).style(f.WIDTH,g);a.dom(d+h.PROGRESS_PERCENTAGE).html(b?
g:f.EMPTY)}},loading:function(d,g){var b=a.dom(d);if(b)if(g){var c=Lungo.Attributes.Data.Loading.html.replace(e.START+e.KEY+e.END,g);b.append(c)}else b.children(".loading").remove()}}}(Lungo);Lungo.View.Template=function(a){var f=a.Constants.ERROR,e={};return{create:function(h,d){e[h]=d},exists:function(h){return e[h]?true:false},get:function(h){return e[h]},render:function(h,d,g){if(a.View.Template.exists(d))a.dom(h).html(this.markup(d,g));else throw Error(f.BINDING_TEMPLATE+d);},markup:function(h,d){var g=this.get(h);return a.View.Template.Binding.process(g,d)},html:function(h,d){return a.View.Template.Binding.process(h,d)}}}(Lungo);Lungo.View.Template.Binding=function(a){var f=a.Constants.BINDING,e=a.Constants.ERROR,h=function(d,g){var b,c;for(c in d)if(a.Core.isOwnProperty(d,c)&&d[c]!==null){b=RegExp(f.START+c+f.END,"g");g=g.replace(b,d[c])}return g.replace(f.PARSER,"")};return{process:function(d,g){var b=a.Core.toType(g);if(b==="array"){b="";for(var c=0,k=g.length;c<k;c++)b+=h(g[c],d);return b}else if(b==="object")return h(g,d);else throw Error(e.BINDING_DATA_TYPE);},dataAttribute:function(d,g){var b=d.data(g.tag);if(b){b=
g.html.replace(f.START+f.KEY+f.END,b);d.prepend(b)}}}}(Lungo);Lungo.View.Template.List=function(a){var f=a.Constants.ERROR;return{create:function(e){e.container=a.dom(e.el).children().first();var h=false,d=!!e.container.length>0,g=a.View.Template.exists(e.template);if(d&&g){d=a.Core.toType(e.data);if(d==="array"||d==="object")h=true}else throw Error(f.BINDING_LIST);if(h){if(e.order&&e.order.field&&e.order.type)e.data=a.Core.orderByProperty(e.data,e.order.field,e.order.type);e.data=e.data;a.View.Template.render(e.container.selector,e.template,e.data)}},append:function(e){var h=
a.View.Template.markup(e.template,e.data);a.dom(e.el).children().first().append(h)},prepend:function(e){var h=a.View.Template.markup(e.template,e.data);a.dom(e.el).children().first().prepend(h)}}}(Lungo);Lungo.Data.Cache=function(a,f){var e={},h=function(g){return arguments.length===1?e[g]:e[arguments[0]]?e[arguments[0]][arguments[1]]:f},d=function(g){return e[g]?true:false};return{set:function(g,b){e[g]=d(g)?a.Core.mix(h(g),b):b},get:h,remove:function(g){if(arguments.length===1)delete e[g];else delete e[arguments[0]][arguments[1]]},exists:d}}(Lungo);Lungo.Data.Sql=function(a){var f=a.Constants.ERROR,e={name:"lungo_db",version:"1.0",size:65536,schema:[]},h=null,d=function(i,j){a.Core.log(1,"lng.Data.Sql >> "+i);h.transaction(function(m){m.executeSql(i,[],function(n,p){b(j,p)},function(n){n.executedQuery=i;k.apply(null,arguments)})})},g=function(i,j){var m="",n;for(n in i)if(a.Core.isOwnProperty(i,n)){var p=i[n];if(m)m+=" "+j+" ";m+=n+"=";m+=isNaN(p)?'"'+p+'"':p}return m},b=function(i,j){a.Core.toType(i)==="function"&&setTimeout(i,100,j)},c=function(i,
j){var m="",n="",p;for(p in j)if(a.Core.isOwnProperty(j,p)){var q=j[p];m+=m?", "+p:p;if(n)n+=", ";n+=isNaN(q)?'"'+q+'"':q}d("INSERT INTO "+i+" ("+m+") VALUES ("+n+")")},k=function(i,j){throw Error(f.DATABASE_TRANSACTION+j.code+": "+j.message+" \n Executed query: "+i.executedQuery);};return{init:function(i){e=a.Core.mix(e,i);if(h=openDatabase(e.name,e.version,e.name,e.size)){i=e.schema;var j=i.length;if(j)for(var m=0;m<j;m++){var n=i[m];n.drop===true&&d("DROP TABLE IF EXISTS "+n.name);var p=n.name;
n=n.fields;var q="",l=void 0;for(l in n)if(a.Core.isOwnProperty(n,l)){if(q)q+=", ";q+=l+" "+n[l]}d("CREATE TABLE IF NOT EXISTS "+p+" ("+q+");")}}else throw Error(f.DATABASE);},select:function(i,j,m){j=j?" WHERE "+g(j,"AND"):"";d("SELECT * FROM "+i+j,function(n){for(var p=[],q=0,l=n.rows.length;q<l;q++)p.push(n.rows.item(q));b(m,p)})},insert:function(i,j){if(a.Core.toType(j)==="object")c(i,j);else for(row in j)c(i,j[row])},update:function(i,j,m){i="UPDATE "+i+" SET "+g(j,",");if(m)i+=" WHERE "+g(m,
"AND");d(i)},drop:function(i,j){var m=j?" WHERE "+g(j,"AND"):"";d("DELETE FROM "+i+m+";")},execute:d}}(Lungo);Lungo.Data.Storage=function(){var a={PERSISTENT:"localStorage",SESSION:"sessionStorage"},f=function(e,h,d){e=window[e];if(d){e=e;d=d;d=JSON.stringify(d);e.setItem(h,d)}else{d=d;d=e.getItem(h);return JSON.parse(d)}};return{session:function(e,h){return f(a.SESSION,e,h)},persistent:function(e,h){return f(a.PERSISTENT,e,h)}}}(Lungo);Lungo.Attributes.Data={Search:{tag:"search",selector:".list",html:'<li class="search {{value}}"><input type="search" placeholder="Search..."><a href="#" class="button" data-icon="search"></a></li>'},Search:{tag:"search",selector:"*",html:'<input type="search" placeholder="{{value}}"/><a href="#" class="button" data-icon="search"></a>'},Count:{tag:"count",selector:"*",html:'<span class="bubble count">{{value}}</span>'},Progress:{tag:"progress",selector:"*",html:'<div class="progress">                    <span class="bar"><span class="value" style="width:{{value}};"><span class="label"></span></span></span>                </div>'},
Label:{tag:"label",selector:"a",html:"<abbr>{{value}}</abbr>"},Icon:{tag:"icon",selector:"*",html:'<span class="icon {{value}}"></span>'},Image:{tag:"image",selector:"*",html:'<img src="{{value}}" class="icon" />'},Title:{tag:"title",selector:"header, footer, article",html:'<span class="title centered">{{value}}</span>'},Loading:{tag:"loading",selector:"*",html:'<div class="loading {{value}}">                    <span class="top"></span>                    <span class="right"></span>                    <span class="bottom"></span>                    <span class="left"></span>                </div>'},
Back:{tag:"back",selector:"header, footer",html:'<nav class="left"><a href="#back" data-target="section" class="left"><span class="icon {{value}}"></span></a></nav>'}};Lungo.Boot.Resources=function(a,f){var e=a.Constants.ELEMENT,h=a.Constants.ERROR,d={SECTION:"sections",TEMPLATE:"templates",SCRIPT:"scripts"},g=function(b){return f.ajax({url:b,async:false,dataType:"html",error:function(){throw Error(h.LOADING_RESOURCE+b);}})};return{init:function(b){for(resource_key in b){var c=resource_key,k=b[resource_key];for(index in k){var i=/http/.test(k[index])?k[index]:"app/resources/"+c+"/"+k[index];try{var j=g(i);switch(c){case d.SECTION:a.Core.toType(j)==="string"&&a.dom(e.BODY).append(j);
break;case d.TEMPLATE:var m=document.createElement(e.DIV);m.innerHTML=j;var n=a.dom(m.firstChild).data("template");n&&a.View.Template.create(n,j)}}catch(p){a.Core.log(3,p.message)}}}a.Element.sections=a.dom(e.SECTION);a.Element.asides=a.dom(e.ASIDE)}}}(Lungo,Quo);Lungo.Boot.Stats=function(a){var f=function(){a.Service.post("http://www.lungojs.com/stats/",{name:a.App.get("name"),version:a.App.get("version"),icon:a.App.get("icon")},function(){})};return{init:function(){a.Core.isMobile()&&f()}}}(Lungo);Lungo.Boot.Layout=function(a){var f=null,e=null,h=a.Constants.ELEMENT,d=a.Constants.ATTRIBUTE,g=function(){if(!location.hash||!f.addEventListener){f.scrollTo(0,1);var b=1,c=setInterval(function(){if(e.body){clearInterval(c);b="scrollTop"in e.body?e.body.scrollTop:1;f.scrollTo(0,b===1?0:1)}},15);f.addEventListener("load",function(){setTimeout(function(){f.scrollTo(0,b===1?0:1)},0)},false)}};return{init:function(){if(a.Core.isMobile()){f=window;e=f.document;if(f.innerHeight==356){a.dom(h.BODY).style(d.HEIGHT,
416+d.PIXEL);g()}}}}}(Lungo);Lungo.Boot.Events=function(a){var f=a.Constants.ATTRIBUTE,e=a.Constants.ELEMENT,h={DOCUMENT:document,WINDOW:window,HREF_TARGET:"a[href][data-target]",HREF_TARGET_FROM_ASIDE:"aside a[href][data-target]",CURRENT_SECTION:"section.aside, section.current"},d=function(c){a.View.Resize.toolbars();c.preventDefault()},g=function(c){c.preventDefault();c=a.dom(this);switch(c.data(f.TARGET)){case e.SECTION:c=c.attr(f.HREF);b();c=a.Core.parseUrl(c);c==="#back"?a.Router.back():a.Router.section(c);break;case e.ARTICLE:var k=
a.Router.History.current(),i=c.attr(f.HREF);a.Router.article(k,i,c);break;case e.ASIDE:k=a.Router.History.current();c=c.attr(f.HREF);a.Router.aside(k,c)}},b=function(c){window.innerWidth<768&&a.View.Aside.hide();c&&c.preventDefault()};return{init:function(){a.dom(h.WINDOW).on("resize",d);a.dom(h.HREF_TARGET).tap(g);a.dom(h.HREF_TARGET_FROM_ASIDE).tap(b)}}}(Lungo);Lungo.Boot.Data=function(a){return{init:function(){var f=a.Attributes.Data,e;for(e in f)if(a.Core.isOwnProperty(f,e))for(var h=f[e],d=a.dom(h.selector),g=0,b=d.length;g<b;g++){var c=a.dom(d[g]);a.View.Template.Binding.dataAttribute(c,h)}}}}(Lungo);Lungo.Boot.Section=function(a){var f=a.Constants.ELEMENT,e=a.Constants.CLASS,h=a.Constants.ATTRIBUTE;return{init:function(){var d=a.Element.sections.first();a.Element.Current.section=d;a.Element.Current.article=d.children(f.ARTICLE).first();var g="#"+d.attr(h.ID);d.addClass(e.CURRENT);a.Router.History.add(g);d=0;for(g=a.Element.sections.length;d<g;d++){var b=a.dom(a.Element.sections[d]),c=b.children(f.ARTICLE).first();c.addClass(e.CURRENT);(c=c.attr(h.ID))&&a.View.Article.switchReferenceItems(c,b)}d=
null;g=0;for(b=a.Element.asides.length;g<b;g++){d=a.dom(a.Element.asides[g]);d.children(f.ARTICLE).addClass(e.CURRENT)}a.View.Resize.toolbars()}}}(Lungo);Lungo.Boot.Article=function(a){var f=a.Constants.ATTRIBUTE,e=a.Constants.ELEMENT,h={LIST_IN_ARTICLE:"article.list, aside.list",CHECKBOX_IN_ARTICLE:".checkbox, .radio"},d=function(c,k){for(var i=a.dom(c),j=0,m=i.length;j<m;j++){var n=a.dom(i[j]);a.Core.execute(k,n)}},g=function(c){if(c.children().length===0){c.attr(f.ID);c.append(e.LIST)}},b=function(c){c.append(e.SPAN)};return{init:function(){d(h.LIST_IN_ARTICLE,g);d(h.CHECKBOX_IN_ARTICLE,b)}}}(Lungo);
