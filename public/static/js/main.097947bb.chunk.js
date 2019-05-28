(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{29:function(e,t,a){e.exports=a(58)},58:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(27),c=a.n(s),i=a(65),l=a(2),o=a(3),m=a(5),u=a(4),d=a(6),p=a(66),h=a(63),f=a(62),v=a(61),g=a(14),b=a.n(g),E=new(function(){function e(){Object(l.a)(this,e),this.auth=b.a.create({baseURL:"https://recipease-ironhack.herokuapp.com",withCredentials:!0})}return Object(o.a)(e,[{key:"signup",value:function(e){var t=e.username,a=e.password;return this.auth.post("/auth/signup",{username:t,password:a}).then(function(e){return e.data})}},{key:"login",value:function(e){var t=e.username,a=e.password;return this.auth.post("/auth/login",{username:t,password:a}).then(function(e){return e.data})}},{key:"logout",value:function(){return this.auth.post("/auth/logout",{}).then(function(e){return e.data})}},{key:"me",value:function(){return this.auth.get("/auth/me").then(function(e){return e.data})}}]),e}()),N=r.a.createContext(),y=N.Consumer,C=N.Provider,k=function(e){return function(t){function a(){return Object(l.a)(this,a),Object(m.a)(this,Object(u.a)(a).apply(this,arguments))}return Object(d.a)(a,t),Object(o.a)(a,[{key:"render",value:function(){var t=this;return r.a.createElement(y,null,function(a){return r.a.createElement(e,Object.assign({login:a.login,signup:a.signup,user:a.user,logout:a.logout,isLoggedin:a.isLoggedin},t.props))})}}]),a}(n.Component)},O=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={isLoggedin:!1,user:null,isLoading:!0},a.signup=function(e){var t=e.username,n=e.password;E.signup({username:t,password:n}).then(function(e){a.setState({isLoggedin:!0,user:e})}).catch(function(e){var t=e.response.data;a.setState({message:t.statusMessage})})},a.login=function(e){var t=e.username,n=e.password;E.login({username:t,password:n}).then(function(e){a.setState({isLoggedin:!0,user:e})}).catch(function(){})},a.logout=function(){E.logout().then(function(){a.setState({isLoggedin:!1,user:null})}).catch(function(){})},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;E.me().then(function(t){e.setState({isLoggedin:!0,user:t,isLoading:!1})}).catch(function(){e.setState({isLoggedin:!1,user:null,isLoading:!1})})}},{key:"render",value:function(){var e=this.state,t=e.isLoading,a=e.isLoggedin,n=e.user;return t?r.a.createElement("div",null,"Loading"):r.a.createElement(C,{value:{isLoggedin:a,user:n,login:this.login,logout:this.logout,signup:this.signup}},this.props.children)}}]),t}(n.Component),j=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).handleToggleNav=function(){a.setState({navCollapsed:!a.state.navCollapsed})},a.handleLogout=function(){a.handleToggleNav(),a.props.logout()},a.state={location:null,navCollapsed:!0},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.state.navCollapsed,t=this.props.isLoggedin;return r.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light bg-light sticky-top"},r.a.createElement("div",{className:"container"},r.a.createElement(v.a,{className:"navbar-brand",to:"/",onClick:this.handleToggleNav},r.a.createElement("img",{src:"/logo.svg",width:"30",height:"30",className:"d-inline-block align-top pr-1",alt:""}),"Recipease"),r.a.createElement("button",{"data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",className:"navbar-toggler collapsed",onClick:this.handleToggleNav,type:"button"},r.a.createElement("span",{className:"navbar-toggler-icon"})),r.a.createElement("div",{className:(e?"collapse":"")+" navbar-collapse"},r.a.createElement("ul",{className:"navbar-nav mr-auto"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(v.a,{className:"nav-link",to:"/",onClick:this.handleToggleNav},"Home ",r.a.createElement("span",{className:"sr-only"},"(current)"))),r.a.createElement("li",{className:"nav-item"},r.a.createElement(v.a,{className:"nav-link",to:"/recipes",onClick:this.handleToggleNav},"Recipes")),t?r.a.createElement("li",{className:"nav-item"},r.a.createElement(v.a,{className:"nav-link",to:"/profile",onClick:this.handleToggleNav},"Profile")):null),t?r.a.createElement("button",{className:"btn btn-outline-primary my-2 my-sm-0",type:"submit",onClick:this.handleLogout},"Logout"):r.a.createElement("ul",{className:"navbar-nav"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(v.a,{className:"nav-link",to:"/login"},r.a.createElement("button",{className:"btn btn-outline-primary",type:"submit",onClick:this.handleToggleNav},"Login"))),r.a.createElement("li",{className:"nav-item"},r.a.createElement(v.a,{className:"nav-link",to:"/signup"},r.a.createElement("button",{className:"btn btn-primary",type:"submit",onClick:this.handleToggleNav},"Sign up")))))))}}]),t}(n.Component),S=Object(f.a)(k(j)),I=function(e){function t(){return Object(l.a)(this,t),Object(m.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("footer",{className:"navbar fixed-bottom navbar-light bg-light"},r.a.createElement("div",{className:"container p-0"},r.a.createElement("span",{className:"navbar-text small",href:"/"},"\xa9 Recipease - Scott Mallinson 2019.")))}}]),t}(n.Component),w=a(12),R=new(function(){function e(){Object(l.a)(this,e),this.recipe=b.a.create({baseURL:"".concat("https://recipease-ironhack.herokuapp.com","/recipes"),withCredentials:!0})}return Object(o.a)(e,[{key:"getAllRecipes",value:function(){return this.recipe.get("/").then(function(e){return e.data})}},{key:"createRecipe",value:function(e){return this.recipe.post("/create",e).then(function(e){return e.data})}},{key:"uploadRecipeImage",value:function(e){return this.recipe.post("/create/image",e).then(function(e){return e.data})}},{key:"updateRecipe",value:function(e){return this.recipe.put("/update",e).then(function(e){return e.data})}},{key:"saveRecipe",value:function(e){return this.recipe.put("/save",e).then(function(e){return e.data})}},{key:"recipesByAllIngredients",value:function(e){return this.recipe.post("/search",e).then(function(e){return e.data})}},{key:"getRecipeById",value:function(e){return this.recipe.get("/".concat(e)).then(function(e){return e.data})}},{key:"search",value:function(e){return this.recipe.get("/search?s=".concat(e)).then(function(e){return e.data})}}]),e}()),x=k(function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).handleSearch=function(e){var t=e.target,n=t.name,r=t.value;a.setState(Object(w.a)({},n,r)),R.search(e.target.value).then(function(e){a.setState({recipes:e})}).catch(function(e){return console.log(e)})},a.state={searchTerm:"",recipes:[]},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("form",null,r.a.createElement("input",{className:"form-control",type:"text",autoFocus:!0,autoComplete:"off",name:"searchTerm",value:this.state.searchTerm,placeholder:"Find a recipe",onChange:function(t){return e.handleSearch(t)}})),r.a.createElement("ul",{className:"list-unstyled pt-2"},this.state.recipes.map(function(e){return r.a.createElement("li",{className:"media mt-2",key:e._id},r.a.createElement("img",{src:e.photoUrl,className:"mr-3",width:"100",alt:"..."}),r.a.createElement("div",{className:"media-body"},r.a.createElement("h5",{className:"mt-0 mb-1"},r.a.createElement(v.a,{to:{pathname:"/recipes/".concat(e._id),state:{selectedRecipe:e}}},e.name)),e.description))})))}}]),t}(n.Component)),_=k(function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(m.a)(this,Object(u.a)(t).call(this))).state={recipes:[]},e}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;R.getAllRecipes().then(function(t){e.setState({recipes:t})}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){return r.a.createElement("div",{className:"container py-5"},r.a.createElement("h1",{className:"display-4"},"Recipes"),r.a.createElement("div",{className:"jumbotron bg-light d-flex align-items-center"},r.a.createElement("div",{className:"container"},r.a.createElement("p",{className:"lead"},"Search our database by recipe name or ingredient."),r.a.createElement(x,{pantry:this.state.pantry}),r.a.createElement("hr",{className:"my-4"}),r.a.createElement(v.a,{className:"form-control btn btn-outline-secondary",to:"/recipes/create"},"Contribute a recipe"))),this.state.recipes.map(function(e){return r.a.createElement("div",{key:e._id,className:"card mb-3"},r.a.createElement("div",{className:"row no-gutters"},r.a.createElement("div",{className:"col-md-4"},r.a.createElement("img",{src:e.photoUrl,className:"card-img",alt:"..."})),r.a.createElement("div",{className:"col-md-8"},r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},r.a.createElement(v.a,{to:{pathname:"/recipes/".concat(e._id),state:{selectedRecipe:e}}},e.name)),r.a.createElement("p",{className:"card-text"},e.description)))))}))}}]),t}(n.Component)),D=a(8),L=k(function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){var t=e.target,n=t.name,r=t.value;a.setState(Object(w.a)({},n,r))},a.fileOnchange=function(e){var t=e.target.files[0],n=new FormData;n.append("recipease",t),R.uploadRecipeImage(n).then(function(e){a.setState({photoUrl:e,disable:!1})}).catch(function(e){return console.log(e)})},a.state={creatorId:a.props.user._id,name:"",description:"",photoUrl:"",duration:"",ingredients:[{name:"",quantity:""}],instructions:[],servings:"",disable:!0},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"handleItemChange",value:function(e,t){var a=this.state.ingredients,n=Object(D.a)(a);n.map(function(a,n,r){return n===t?r[n][e.target.name]=e.target.value:null}),this.setState({ingredients:n})}},{key:"handleItemRemove",value:function(e,t){e.preventDefault(),this.state.ingredients.splice(t,1),this.setState({ingredients:this.state.ingredients})}},{key:"addItem",value:function(e,t){e.preventDefault(),this.setState({ingredients:[].concat(Object(D.a)(this.state.ingredients),[{name:"",quantity:""}])})}},{key:"handleInstructionChange",value:function(e,t){var a=this.state.instructions,n=Object(D.a)(a);n.map(function(a,n,r){return n===t?r[n]=e.target.value:null}),this.setState({instructions:n})}},{key:"handleInstructionRemove",value:function(e,t){e.preventDefault(),this.state.instructions.splice(t,1),this.setState({instructions:this.state.instructions})}},{key:"addInstruction",value:function(e,t){e.preventDefault(),this.setState({instructions:[].concat(Object(D.a)(this.state.instructions),[""])})}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=this.state,a=t.creatorId,n=t.name,r=t.description,s=t.photoUrl,c=t.duration,i=t.ingredients,l=t.instructions,o=t.servings;R.createRecipe({creatorId:a,name:n,description:r,photoUrl:s,duration:c,ingredients:i,instructions:l,servings:o}).then(function(e){return console.log(e)}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){var e=this,t=this.state.disable;return r.a.createElement("div",{className:"container py-5"},r.a.createElement("h1",{className:"display-4"},"Add your recipe"),r.a.createElement("form",null,r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"name"},"Name"),r.a.createElement("input",{id:"name",name:"name",placeholder:"Recipe name",type:"text",required:"required",className:"form-control",value:this.state.name,onChange:function(t){return e.handleChange(t)},autoComplete:"off"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"description"},"Description"),r.a.createElement("textarea",{id:"description",name:"description",cols:"40",rows:"5","aria-describedby":"descriptionHelpBlock",required:"required",className:"form-control",value:this.state.description,onChange:function(t){return e.handleChange(t)}}),r.a.createElement("span",{id:"descriptionHelpBlock",className:"form-text text-muted"},"Provide a description of the recipe.")),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"photo"},"Upload recipe photo"),r.a.createElement("input",{type:"file",className:"form-control-file",id:"photo",onChange:this.fileOnchange})),r.a.createElement("div",{className:"form-row"},r.a.createElement("div",{className:"col"},r.a.createElement("label",{htmlFor:"duration"},"Duration"),r.a.createElement("input",{id:"duration",name:"duration",type:"text",required:"required",className:"form-control",value:this.state.duration,onChange:function(t){return e.handleChange(t)},placeholder:"Enter a value in minutes",autoComplete:"off"})),r.a.createElement("div",{className:"col"},r.a.createElement("label",{htmlFor:"servings"},"Servings"),r.a.createElement("input",{id:"servings",name:"servings",type:"text",required:"required",className:"form-control",value:this.state.servings,onChange:function(t){return e.handleChange(t)},placeholder:"E.g. number of people this would serve",autoComplete:"off"}))),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"ingredients_1"},"Ingredients"),this.state.ingredients.map(function(t,a){return r.a.createElement("div",{className:"form-row",key:a},r.a.createElement("div",{className:"col"},r.a.createElement("input",{className:"form-control",onChange:function(t){return e.handleItemChange(t,a)},value:t.name,name:"name",placeholder:"Ingredient name",autoComplete:"off"})),r.a.createElement("div",{className:"col"},r.a.createElement("input",{className:"form-control",onChange:function(t){return e.handleItemChange(t,a)},value:t.quantity,name:"quantity",placeholder:"Quantity required",autoComplete:"off"})),r.a.createElement("div",{className:"col"},r.a.createElement("button",{className:"btn btn-warning",onClick:function(t){return e.handleItemRemove(t,a)}},r.a.createElement("i",{className:"far fa-trash-alt"}))))})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{type:"submit",className:"btn btn-primary",onClick:function(t){return e.addItem(t)}},r.a.createElement("i",{className:"fas fa-plus"})," Add ingredient")),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"instructions_!"},"Instructions"),this.state.instructions.map(function(t,a){return r.a.createElement("div",{className:"form-row",key:a},r.a.createElement("div",{className:"col"},r.a.createElement("textarea",{className:"form-control",onChange:function(t){return e.handleInstructionChange(t,a)},value:t})),r.a.createElement("div",{className:"col"},r.a.createElement("button",{className:"btn btn-warning",onClick:function(t){return e.handleInstructionRemove(t,a)}},r.a.createElement("i",{className:"far fa-trash-alt"}))))})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{type:"submit",className:"btn btn-primary",onClick:function(t){return e.addInstruction(t)}},r.a.createElement("i",{className:"fas fa-plus"})," Add instruction")),r.a.createElement("div",{className:"form-group"},t?r.a.createElement("button",{name:"submit",type:"submit",className:"btn btn-success",disabled:!0},r.a.createElement("i",{className:"fas fa-cloud"})," Save recipe"):r.a.createElement("button",{name:"submit",type:"submit",className:"btn btn-success",onClick:function(t){return e.handleSubmit(t)}},r.a.createElement("i",{className:"fas fa-cloud"})," Save recipe"))))}}]),t}(n.Component)),F=a(26),q=k(function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){var t=e.target,n=t.name,r=t.value;a.setState(Object(w.a)({},n,r))},a.fileOnchange=function(e){var t=e.target.files[0],n=new FormData;n.append("recipease",t),R.uploadRecipeImage(n).then(function(e){a.setState({photoUrl:e,disable:!1})}).catch(function(e){return console.log(e)})},a.state={_id:a.props.match.params.id,hasRecipe:!1,editable:!1,editing:!1,disable:!0},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"handleSaveRecipe",value:function(e){var t=this;e.preventDefault();var a=this.state.recipe._id,n=this.props.user._id;R.saveRecipe({recipeId:a,userId:n}).then(function(e){return t.props.user.savedRecipes=e.data.savedRecipes}).catch(function(e){return console.log(e)})}},{key:"handleEditRecipe",value:function(e){e.preventDefault(),this.setState({editing:!this.state.editing})}},{key:"handleItemChange",value:function(e,t){var a=this.state.ingredients,n=Object(D.a)(a);n.map(function(a,n,r){return n===t?r[n][e.target.name]=e.target.value:null}),this.setState({ingredients:n})}},{key:"handleItemRemove",value:function(e,t){e.preventDefault(),this.state.ingredients.splice(t,1),this.setState({ingredients:this.state.ingredients})}},{key:"addItem",value:function(e,t){e.preventDefault(),this.setState({ingredients:[].concat(Object(D.a)(this.state.ingredients),[{name:"",quantity:""}])})}},{key:"handleInstructionChange",value:function(e,t){var a=this.state.instructions,n=Object(D.a)(a);n.map(function(a,n,r){return n===t?r[n]=e.target.value:null}),this.setState({instructions:n})}},{key:"handleInstructionRemove",value:function(e,t){e.preventDefault(),this.state.instructions.splice(t,1),this.setState({instructions:this.state.instructions})}},{key:"addInstruction",value:function(e,t){e.preventDefault(),this.setState({instructions:[].concat(Object(D.a)(this.state.instructions),[""])})}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var a=this.state,n=a._id,r=a.creatorId,s=a.name,c=a.description,i=a.photoUrl,l=a.duration,o=a.ingredients,m=a.instructions,u=a.servings;R.updateRecipe({_id:n,creatorId:r,name:s,description:c,photoUrl:i,duration:l,ingredients:o,instructions:m,servings:u}).then(function(e){return t.setState({editing:!1})}).catch(function(e){return console.log(e)})}},{key:"componentDidMount",value:function(){var e=this;R.getRecipeById(this.state._id).then(function(t){var a=t.creatorId,n=t.name,r=t.description,s=t.photoUrl,c=t.duration,i=t.ingredients,l=t.instructions,o=t.servings,m=t.created_at,u=t.updated_at;e.setState({creatorId:a,name:n,description:r,photoUrl:s,duration:c,ingredients:i,instructions:l,servings:o,created_at:F(m).format("h:mma on Do MMMM YYYY"),updated_at:F(u).format("h:mma on D MMMM YYYY"),hasRecipe:!0}),e.props.user&&e.props.user._id===e.state.creatorId&&e.setState({editable:!0})}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){var e=this,t=this.state.disable;return console.log(this.props),this.state.hasRecipe?r.a.createElement("div",{className:"container p-0 py-5"},r.a.createElement("div",{className:"card mb-3"},r.a.createElement("img",{src:this.state.photoUrl,className:"card-img",alt:"..."}),r.a.createElement("div",{className:"card-body"},r.a.createElement("h1",{className:"card-title"},this.state.name),r.a.createElement("p",{className:"lead card-text"},this.state.description),r.a.createElement("div",{className:"d-flex justify-content-between mb-3"},this.state.editable?r.a.createElement("button",{className:"btn btn-outline-secondary",type:"submit",onClick:function(t){return e.handleEditRecipe(t)}},"Edit recipe"):null,this.props.isLoggedin?r.a.createElement("button",{className:"btn btn-success",type:"submit",onClick:function(t){return e.handleSaveRecipe(t)}},"Save recipe"):null),this.state.editing?r.a.createElement("form",null,r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"name"},"Name"),r.a.createElement("input",{id:"name",name:"name",placeholder:"Recipe name",type:"text",required:"required",className:"form-control",value:this.state.name,onChange:function(t){return e.handleChange(t)},autoComplete:"off"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"description"},"Description"),r.a.createElement("textarea",{id:"description",name:"description",cols:"40",rows:"5","aria-describedby":"descriptionHelpBlock",required:"required",className:"form-control",value:this.state.description,onChange:function(t){return e.handleChange(t)}}),r.a.createElement("span",{id:"descriptionHelpBlock",className:"form-text text-muted"},"Provide a description of the recipe.")),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"photo"},"Upload recipe photo"),r.a.createElement("input",{type:"file",className:"form-control-file",id:"photo",onChange:this.fileOnchange})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"duration"},"Duration"),r.a.createElement("input",{id:"duration",name:"duration",type:"text",required:"required",className:"form-control",value:this.state.duration,onChange:function(t){return e.handleChange(t)},autoComplete:"off"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"servings"},"Servings"),r.a.createElement("input",{id:"servings",name:"servings",type:"text",required:"required",className:"form-control",value:this.state.servings,onChange:function(t){return e.handleChange(t)},autoComplete:"off"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"ingredients_1"},"Ingredients"),this.state.ingredients.map(function(t,a){return r.a.createElement("div",{className:"form-row",key:a},r.a.createElement("div",{className:"col"},r.a.createElement("input",{className:"form-control",onChange:function(t){return e.handleItemChange(t,a)},value:t.name,name:"name",autoComplete:"off"})),r.a.createElement("div",{className:"col"},r.a.createElement("input",{className:"form-control",onChange:function(t){return e.handleItemChange(t,a)},value:t.quantity,name:"quantity",autoComplete:"off"})),r.a.createElement("div",{className:"col"},r.a.createElement("button",{className:"btn btn-warning",onClick:function(t){return e.handleItemRemove(t,a)}},r.a.createElement("i",{className:"far fa-trash-alt"}))))})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{type:"submit",className:"btn btn-primary",onClick:function(t){return e.addItem(t)}},r.a.createElement("i",{className:"fas fa-plus"})," Add ingredient")),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"instructions_!"},"Instructions"),this.state.instructions.map(function(t,a){return r.a.createElement("div",{className:"form-row",key:a},r.a.createElement("div",{className:"col"},r.a.createElement("textarea",{className:"form-control",onChange:function(t){return e.handleInstructionChange(t,a)},value:t})),r.a.createElement("div",{className:"col"},r.a.createElement("button",{className:"btn btn-warning",onClick:function(t){return e.handleInstructionRemove(t,a)}},r.a.createElement("i",{className:"far fa-trash-alt"}))))})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{type:"submit",className:"btn btn-primary",onClick:function(t){return e.addInstruction(t)}},r.a.createElement("i",{className:"fas fa-plus"})," Add instruction")),r.a.createElement("div",{className:"form-row"},r.a.createElement("div",{className:"col"},r.a.createElement("button",{type:"submit",className:"btn btn-danger",onClick:function(t){return e.handleEditRecipe(t)}},"Cancel changes")),r.a.createElement("div",{className:"col"},t?r.a.createElement("button",{name:"submit",type:"submit",className:"btn btn-success",disabled:!0},r.a.createElement("i",{className:"fas fa-cloud"})," Save recipe"):r.a.createElement("button",{name:"submit",type:"submit",className:"btn btn-success",onClick:function(t){return e.handleSubmit(t)}},r.a.createElement("i",{className:"fas fa-cloud"})," Save recipe")))):r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"Duration: ",this.state.duration," minutes"),r.a.createElement("p",null,"Servings: ",this.state.servings),r.a.createElement("h2",null,"Ingredients"),r.a.createElement("ul",{className:"list-unstyled"},this.state.ingredients.map(function(e,t){return r.a.createElement("li",{key:t},r.a.createElement("strong",null,e.quantity)," ",e.name)})),r.a.createElement("h2",null,"Instructions"),r.a.createElement("ol",{className:"pl-3"},this.state.instructions.map(function(e,t){return r.a.createElement("li",{key:t},e)})),r.a.createElement("p",{className:"card-text"},r.a.createElement("small",{className:"text-muted"},"Last updated at ",this.state.updated_at)))))):null}}]),t}(n.Component)),U=new(function(){function e(){Object(l.a)(this,e),this.user=b.a.create({baseURL:"".concat("https://recipease-ironhack.herokuapp.com","/user"),withCredentials:!0})}return Object(o.a)(e,[{key:"getUser",value:function(e){return this.user.get("/profile/".concat(e)).then(function(e){return e.data})}},{key:"updatePantry",value:function(e){return this.user.put("/pantry",e).then(function(e){return e.data})}}]),e}()),A=k(function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).handleLucky=function(e){e.preventDefault();var t=a.state.pantry.map(function(e){return e.item});R.recipesByAllIngredients({ingredients:t}).then(function(e){a.setState({recipes:e})}).catch(function(e){return console.log(e)})},a.handleSearchByIngredients=function(e){e.preventDefault();var t=a.state.selectedIngredients;R.recipesByAllIngredients({searchForItems:t}).then(function(e){a.setState({recipes:e,performSearch:!0})}).catch(function(e){return console.log(e)})},a.handleCheckChange=function(e){var t=null;a.state.selectedIngredients.includes(e.target.name)?(t=a.state.selectedIngredients.indexOf(e.target.name),a.state.selectedIngredients.splice(t,1)):a.state.selectedIngredients.push(e.target.name),a.state.selectedIngredients.length>0?a.setState({searchIngredients:!1}):a.setState({searchIngredients:!0})},a.state={pantry:[],recipes:[],selectedIngredients:[],performSearch:!1,searchIngredients:!0},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"handleItemChange",value:function(e,t){var a=this.state.pantry,n=Object(D.a)(a);n.map(function(a,n,r){return n===t?r[n][e.target.name]=e.target.value:null}),this.setState({pantry:n})}},{key:"handleItemRemove",value:function(e,t){e.preventDefault(),this.state.pantry.splice(t,1),this.setState({pantry:this.state.pantry})}},{key:"addItem",value:function(e,t){e.preventDefault(),this.setState({pantry:[].concat(Object(D.a)(this.state.pantry),[{item:"",quantity:""}])})}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var a=this.props.user._id,n=this.state.pantry;U.updatePantry({_id:a,pantry:n}).then(function(e){t.setState({pantry:e.pantry})}).catch(function(e){return console.log(e)})}},{key:"componentDidUpdate",value:function(e,t){this.state.recipes.length>t.recipes.length&&window.scroll(0,document.body.clientHeight)}},{key:"componentDidMount",value:function(){var e=this;U.getUser(this.props.user._id).then(function(t){e.setState({pantry:t.pantry})}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"container p-0"},this.state.pantry.map(function(t,a){return r.a.createElement("div",{className:"form-row",key:a},r.a.createElement("div",{className:"col"},r.a.createElement("input",{className:"form-control",onChange:function(t){return e.handleItemChange(t,a)},value:t.item,name:"item",placeholder:"Item name",autoComplete:"off"})),r.a.createElement("div",{className:"col"},r.a.createElement("input",{className:"form-control",onChange:function(t){return e.handleItemChange(t,a)},value:t.quantity,name:"quantity",placeholder:"Quantity",autoComplete:"off"})),r.a.createElement("div",{className:"col"},r.a.createElement("input",{className:"form-control",type:"checkbox",name:t.item,onChange:function(t){return e.handleCheckChange(t,a)}})),r.a.createElement("div",{className:"col"},r.a.createElement("button",{className:"btn btn-warning",onClick:function(t){return e.handleItemRemove(t,a)}},r.a.createElement("i",{className:"far fa-trash-alt"}))))}),r.a.createElement("div",{className:"form-row"},r.a.createElement("div",{className:"col-auto"},r.a.createElement("button",{className:"btn btn-outline-primary",type:"submit",onClick:function(t){return e.addItem(t)}},r.a.createElement("i",{className:"fas fa-plus"})," Add item")),r.a.createElement("div",{className:"col-auto"},r.a.createElement("button",{className:"btn btn-success",type:"submit",onClick:function(t){return e.handleSubmit(t)}},r.a.createElement("i",{className:"fas fa-cloud"})," Save items"))),r.a.createElement("div",{className:"form-row"},r.a.createElement("div",{className:"col"},r.a.createElement("button",{className:"btn btn-primary",type:"submit",onClick:function(t){return e.handleSearchByIngredients(t)},disabled:this.state.searchIngredients},r.a.createElement("span",{className:"badge badge-light"},this.state.selectedIngredients.length)," ingredients selected"))),this.state.performSearch?r.a.createElement("h2",null,this.state.recipes.length," recipes uses the selected ingredients"):null,this.state.recipes.map(function(e){return r.a.createElement("div",{className:"card mb-3",key:e._id._id},r.a.createElement("div",{className:"row no-gutters"},r.a.createElement("div",{className:"col-md-4"},r.a.createElement("img",{src:e._id.photoUrl,className:"card-img",alt:"..."})),r.a.createElement("div",{className:"col-md-8"},r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},r.a.createElement(v.a,{to:{pathname:"/recipes/".concat(e._id._id)}},e._id.name)," ",r.a.createElement("span",{className:"badge badge-info"},e.matches," ingredients matched")),r.a.createElement("p",{className:"card-text"},e._id.description)))))}))}}]),t}(n.Component)),M=k(function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).state={createdRecipes:[],savedRecipes:[]},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;U.getUser(this.props.user._id).then(function(t){e.setState({createdRecipes:t.createdRecipes,savedRecipes:t.savedRecipes})}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){return r.a.createElement("div",{className:"container py-5"},r.a.createElement("h1",{className:"display-4"},"Hi, ",this.props.user.username),r.a.createElement("nav",null,r.a.createElement("div",{className:"nav nav-tabs",id:"nav-tab",role:"tablist"},r.a.createElement("a",{className:"nav-item nav-link active",id:"nav-pantry-tab","data-toggle":"tab",href:"#nav-pantry",role:"tab","aria-controls":"nav-pantry","aria-selected":"false"},"Pantry"),r.a.createElement("a",{className:"nav-item nav-link",id:"nav-created-tab","data-toggle":"tab",href:"#nav-created",role:"tab","aria-controls":"nav-created","aria-selected":"true"},"Created recipes"),r.a.createElement("a",{className:"nav-item nav-link",id:"nav-saved-tab","data-toggle":"tab",href:"#nav-saved",role:"tab","aria-controls":"nav-saved","aria-selected":"false"},"Saved recipes"))),r.a.createElement("div",{className:"tab-content",id:"nav-tabContent"},r.a.createElement("div",{className:"tab-pane fade show active pt-3",id:"nav-pantry",role:"tabpanel","aria-labelledby":"nav-pantry-tab"},r.a.createElement(A,null)),r.a.createElement("div",{className:"tab-pane fade pt-3",id:"nav-created",role:"tabpanel","aria-labelledby":"nav-created-tab"},this.state.createdRecipes.map(function(e){return r.a.createElement("div",{key:e._id,className:"card mb-3"},r.a.createElement("div",{className:"row no-gutters"},r.a.createElement("div",{className:"col-md-4"},r.a.createElement("img",{src:e.photoUrl,className:"card-img",alt:"..."})),r.a.createElement("div",{className:"col-md-8"},r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},r.a.createElement(v.a,{to:{pathname:"/recipes/".concat(e._id),state:{selectedRecipe:e}}},e.name)),r.a.createElement("p",{className:"card-text"},e.description)))))})),r.a.createElement("div",{className:"tab-pane fade pt-3",id:"nav-saved",role:"tabpanel","aria-labelledby":"nav-saved-tab"},this.state.savedRecipes.map(function(e){return r.a.createElement("div",{key:e._id,className:"card mb-3"},r.a.createElement("div",{className:"row no-gutters"},r.a.createElement("div",{className:"col-md-4"},r.a.createElement("img",{src:e.photoUrl,className:"card-img",alt:"..."})),r.a.createElement("div",{className:"col-md-8"},r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},r.a.createElement(v.a,{to:{pathname:"/recipes/".concat(e._id),state:{selectedRecipe:e}}},e.name)),r.a.createElement("p",{className:"card-text"},e.description)))))}))))}}]),t}(n.Component)),T=k(function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={username:"",password:""},a.handleFormSubmit=function(e){e.preventDefault();var t=a.state,n=t.username,r=t.password;a.props.signup({username:n,password:r})},a.handleChange=function(e){var t=e.target,n=t.name,r=t.value;a.setState(Object(w.a)({},n,r))},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.state,t=e.username,a=e.password;return r.a.createElement("div",{className:"container py-5"},r.a.createElement("h1",{className:"display-4"},"Sign up"),r.a.createElement("form",{onSubmit:this.handleFormSubmit},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"username"},"Username"),r.a.createElement("input",{type:"text",className:"form-control",id:"username",placeholder:"Enter username",name:"username",value:t,onChange:this.handleChange,autoComplete:"off"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("input",{type:"password",className:"form-control",id:"password",placeholder:"Password",name:"password",value:a,onChange:this.handleChange,autoComplete:"off"})),r.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Sign up"),r.a.createElement("div",{className:"form-group"},r.a.createElement("p",null,"Already have account?",r.a.createElement(v.a,{to:"/login"}," Login")))))}}]),t}(n.Component)),B=k(function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={username:"",password:""},a.handleFormSubmit=function(e){e.preventDefault();var t=a.state,n=t.username,r=t.password;a.props.login({username:n,password:r})},a.handleChange=function(e){var t=e.target,n=t.name,r=t.value;a.setState(Object(w.a)({},n,r))},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.state,t=e.username,a=e.password;return r.a.createElement("div",{className:"container py-5"},r.a.createElement("h1",{className:"display-4"},"Login"),r.a.createElement("form",{onSubmit:this.handleFormSubmit},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"username"},"Username"),r.a.createElement("input",{type:"text",className:"form-control",id:"username",placeholder:"Enter username",name:"username",value:t,onChange:this.handleChange,autoComplete:"off"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("input",{type:"password",className:"form-control",id:"password",placeholder:"Password",name:"password",value:a,onChange:this.handleChange,autoComplete:"off"})),r.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Login")))}}]),t}(n.Component)),P=a(26),Y=k(function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).state={recipes:[],pantry:[]},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;R.getAllRecipes().then(function(t){e.setState({recipes:t})}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"jumbotron bg-light vw-100 d-flex align-items-center"},r.a.createElement("div",{className:"container"},r.a.createElement("h1",{className:"display-4"},"Recipease"),r.a.createElement("p",{className:"lead"},"Recipes for the time conscious."),r.a.createElement("hr",{className:"my-4"}),r.a.createElement("p",null,"Search our vast database of ",r.a.createElement("strong",null,this.state.recipes.length)," recipes by name or ingredient."),r.a.createElement(x,{pantry:this.state.pantry}))),r.a.createElement("div",{className:"container pb-5"},r.a.createElement("h2",null,"Freshest recipes"),r.a.createElement("div",{className:"card-deck"},this.state.recipes.reverse().slice(0,3).map(function(e){return r.a.createElement("div",{className:"card",key:e._id},r.a.createElement("img",{src:e.photoUrl,className:"card-img-top",alt:"..."}),r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},r.a.createElement(v.a,{to:{pathname:"/recipes/".concat(e._id),state:{selectedRecipe:e}}},e.name)),r.a.createElement("p",{className:"card-text"},e.description),r.a.createElement("p",{className:"card-text"},r.a.createElement("small",{className:"text-muted"},"Last updated ",P(e.updated_at).fromNow()))))}))))}}]),t}(n.Component)),H=a(18),J=a(64);var Q=k(function(e){var t=e.component,a=e.isLoggedin,n=Object(H.a)(e,["component","isLoggedin"]);return r.a.createElement(h.a,Object.assign({},n,{render:function(e){return a?r.a.createElement(t,e):r.a.createElement(J.a,{to:"/login"})}}))});var z=k(function(e){var t=e.component,a=e.isLoggedin,n=Object(H.a)(e,["component","isLoggedin"]);return r.a.createElement(h.a,Object.assign({},n,{render:function(e){return a?r.a.createElement(J.a,{to:"/profile"}):r.a.createElement(t,e)}}))}),G=function(e){function t(){return Object(l.a)(this,t),Object(m.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(O,null,r.a.createElement(S,null),r.a.createElement(p.a,null,r.a.createElement(Q,{exact:!0,path:"/recipes/create",component:L}),r.a.createElement(h.a,{exact:!0,path:"/recipes/:id",component:q}),r.a.createElement(z,{path:"/signup",component:T}),r.a.createElement(z,{path:"/login",component:B}),r.a.createElement(Q,{path:"/profile",component:M}),r.a.createElement(Q,{path:"/pantry",component:A}),r.a.createElement(h.a,{exact:!0,path:"/recipes",component:_}),r.a.createElement(h.a,{exact:!0,path:"/search",component:x}),r.a.createElement(h.a,{exact:!0,path:"/",component:Y})),r.a.createElement(I,null))}}]),t}(n.Component);c.a.render(r.a.createElement(i.a,null,r.a.createElement(G,null)),document.getElementById("root"))}},[[29,1,2]]]);
//# sourceMappingURL=main.097947bb.chunk.js.map