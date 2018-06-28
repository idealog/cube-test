<template>
	<div>
		<div class="search_wrapper">
			<cube-input class="border"
			  v-model="search_text"
			  :placeholder="placeholder"
			  :type="type"
			  :maxlength="maxlength"
			  :readonly="readonly"
			  :disabled="disabled"
			  :autofocus="autofocus"
			  :autocomplete="autocomplete"
			  :clearable="clearable"
			  :eye="eye"
			 style="border-radius:3rem"></cube-input>
		</div>
						
		<div ref="categories">
			<ul class="flex_container">
				<li class="flex_category_item" v-for="item in category_list" @click.stop="goPath(item)">
					<img :src="item.icon" />
					<h3 class="head_title"><span style="font-size:.85rem" :class="{active: item.name == active_tag_item.name}">{{item.name || item.category_name}}</span></h3>
				</li>
			</ul>
		</div>

		<div class="container"> 
			<cube-scroll   ref="scroll" :options="options" @pulling-up="onPullingUp">
				<!-- <div>
					<ul class="flex_container">
						<li class="flex_category_item" v-for="item in selected_category_list">
							<span class="tag">{{item}}</span>
						</li>
					</ul>
				</div> -->
				<!-- <div class="search_wrapper">
					<cube-input class="border"
					  v-model="search_text"
					  :placeholder="placeholder"
					  :type="type"
					  :maxlength="maxlength"
					  :readonly="readonly"
					  :disabled="disabled"
					  :autofocus="autofocus"
					  :autocomplete="autocomplete"
					  :clearable="clearable"
					  :eye="eye"
					 style="border-radius:3rem"></cube-input>
				</div>
								
				<div>
					<ul class="flex_container">
						<li class="flex_category_item" v-for="item in category_list" @click.stop="goPath(item)">
							<img :src="item.icon" />
							<h3><span style="font-size:.85rem" :class="{active: item === active_tag_item}">{{item.name || item.category_name}}</span></h3>
						</li>
					</ul>
				</div> -->
				<div class="scroll-content">
					<ul>
						<li class="item more" v-for="item,index in album_list" @click.stop="goSongList(item)">
							<img class="title_img" :src="item.icon" />
							<div class="content">
								<h3 class="title">{{index+1}}、{{item.album_title || item.album_name}}</h3>
								<p class="attr"><img src="sss" /><span>能力值 +{{item.ability || 10}}</span></p>
								<p class="attr"><img src="sss"/> <span>{{item.album_count}}</span></p>
							</div>
						</li>
					</ul>
				</div>
			</cube-scroll>
		 </div>
	</div>
</template>


<script>
	import {getLatest,getAudiosByAlbumId,getAlbumListByTag} from '@/service/service'
	export default{
		data(){
			return {
				active_tag_item:'',
				loading: true,
				options: {
	                scrollbar: {
	                    fade: true
	                },
	                pullUpLoad: {
	                    threshold: 90,
	                    text:'refresh success'
	                },
	                txt: {
			           more: 'Load more',
			           noMore: 'No more data'
			        }
	            },
	           /* options: {
			        pullDownRefresh: {
			          threshold: 90,
			          stop: 40,
			          txt: 'Refresh success'
			        }
			      },*/
				placeholder: '搜索专辑',
				type: 'text',
				maxlength: 60,
				disabled: false,
				autofocus: false,
				autocomplete: true,
				clearable: true,
				eye: false,
				readonly:false,
				search_text: null,
				category_list:[
					{
						name:'最新',
						icon:'',
						tag:'latest'
					},
					{
						name:'全部',
						icon:'',
						path:'/taglist'
					}
				],
				selected_category_list:[
					'安全教育',
					'情商培养',
					'叫早',
					'哄睡'
				],
				album_list:[
					/*{
						title: '火灾来了怎么办',
						ability: 20,
						song_count: 10

					},{
						title: '做个受欢迎的小朋友',
						ability: 30,
						song_count: 10
					},{
						title:'咕噜咕噜',
						ability: 50,
						song_count: 10
					},
					{
						title: '火灾来了怎么办',
						ability: 20,
						song_count: 10

					},{
						title: '做个受欢迎的小朋友',
						ability: 30,
						song_count: 10
					},{
						title:'咕噜咕噜',
						ability: 50,
						song_count: 10
					}*/
				],
				page: 1,
				active_tag:'latest',
				category_id:'',
				temp:[]
			}
		},
		mounted(){
			//this.height = document.body.clientHeight + 'px'
			//this.getAlbumList()
			if(this.$store.state &&!this.$store.state.active_tag_item){
				this.active_tag_item = this.category_list[0]
			}else{
				this.active_tag_item = this.$store.state.active_tag_item
			}

			console.log(this.$store.state.category_list)
			for(let i= 0; i< this.$store.state.category_list.length; i++){
				if(this.$store.state.category_list[i].category_name === this.active_tag_item.name){
					this.category_id = this.$store.state.category_list[i].id
				}
			}

			//this.active_tag_item = this.category_list[0]
			this.getData()
			if(this.$store.state.selected_category_list && this.$store.state.selected_category_list.length > 0){
				for(let i =0 ; i< this.$store.state.selected_category_list.length; i++){
					//this.category_list.push(this.$store.state.selected_category_list[i])
					this.category_list.splice(1,0,{
						name: this.$store.state.selected_category_list[i]
					})
				}
				console.log(this.category_list)
				//this.category_list.push()
			}
			/*this.album_list = [
				{
					title: '火灾来了怎么办',
					ability: 20,
					song_count: 10
				}
			]*/
		},
		watch: {
			search_text:function(value){
				if(!value){
					console.log(this.temp)
					if(this.temp.length > 0){
						this.album_list = this.temp
						return
					}
				}
				console.log(value)
				//this.temp = this.album_list
				var list = this.album_list.filter(item => {
					console.log(item.album_title)
					if(item.album_title){
						return item.album_title.toLowerCase().indexOf(value) != -1
					}
					if(item.album_name){
						return item.album_name.toLowerCase().indexOf(value) != -1
					}
				})
				console.log(list)
				this.album_list = list
			}
		},
		methods:{
			getData(){
				/*this.$refs.scroll.forceUpdate()*/
				if(this.active_tag_item.name === '最新'){
					getLatest(1,this.page).then(res => {
						console.log(res.data)
						if(res && res.data && res.data.status === 0 && res.data.data){
							if(res.data.data.data.length > 0){
								this.$refs.scroll.forceUpdate(true)
								this.album_list = res.data.data.data
							}else{
								this.$refs.scroll.forceUpdate()
							}
							this.temp = this.album_list
							this.page++
						}else{
							this.$refs.scroll.forceUpdate()
						}
					})
				}else{
					getAlbumListByTag(this.page,20,this.category_id).then(res => {
						console.log(res.data)
						if(res && res.data && res.data.status === 0 && res.data.data){
							//if(res.data.data.length > 0){
								this.$refs.scroll.forceUpdate(true)
								this.album_list = [...this.album_list,...res.data.data]
							/*}else{
								this.$refs.scroll.forceUpdate()
							}*/
							this.temp = this.album_list
							this.page++
						}else{
							this.$refs.scroll.forceUpdate()
						}
					})
				}
			},
			goPath(item){
				if(item.path){
					this.$router.push({path:item.path})
				}

				this.$refs.scroll.scrollToElement(this.$refs.categories,0,true,true,'bounce') //复位

				if(item.name !== '最新'){
					if(this.active_tag_item != item){
						this.page = 1
						this.album_list = []
						this.active_tag_item = item
						if(!item.path){
							this.$store.state.active_tag_item = item
						}
						this.$refs.scroll.forceUpdate(true)
						this.active_tag = item.name
					}
					console.log(this.$store.state.category_list)
					if(this.$store.state.category_list && this.$store.state.category_list.length > 0){
						for(let i = 0; i< this.$store.state.category_list.length; i++){
							if(this.$store.state.category_list[i].category_name === item.name){
								this.category_id = this.$store.state.category_list[i].id
								getAlbumListByTag(this.page,20,this.category_id).then(res => {
									console.log(res.data)
									if(res && res.data && res.data.status === 0 && res.data.data){
										this.$refs.scroll.forceUpdate(true)
										this.album_list = res.data.data
										this.page++
									}else{
										this.$refs.scroll.forceUpdate()
									}
								})
							}
						}
					}
				}

				if(item.name === '最新'){
					this.page = 1
					this.album_list = []
					this.active_tag = 'latest'
					this.active_tag_item = item
					if(!item.path){
						this.$store.state.active_tag_item = item
					}
					this.getData()
				}
				
			},

			goSongList(item){
				console.log(this.active_tag_item)
				if(this.active_tag_item.name != '最新'){
					this.$router.push({path:'/songlist',query:{album_id:item.id,category_name:this.active_tag_item.name}})
				}else{
					this.$router.push({path:'/songlist',query:{album_id:item.album_id}})
				}
			},
			onPullingUp(){
				//this.getAlbumList()
				/*console.log('pull')
				if(this.album_list.length === 0){
					this.$refs.scroll.forceUpdate();
				}else{
					this.$refs.scroll.forceUpdate(true);
				}*/
				/*setTimeout(() => {
					if(Math.random() < 0.5){
						this.getAlbumList()
					}else{
						this.$refs.scroll.forceUpdate();
					}
				},1000)*/
				this.getData()
			},
			getAlbumList(){
				let album_list = [
					{
						title: '火灾来了怎么办',
						ability: 20,
						song_count: 10,
						path:'/albumlist'

					},{
						title: '做个受欢迎的小朋友',
						ability: 30,
						song_count: 10,
						path:'/albumlist'
					},{
						title:'咕噜咕噜',
						ability: 50,
						song_count: 10,
						path:'/albumlist'
					},
					{
						title:'哈哈哈啊哈',
						ability: 50,
						song_count: 10,
						path:'/albumlist'
					},
					{
						title:'饿啊饿啊饿饿',
						ability: 50,
						song_count: 10,
						path:'/albumlist'
					}
					/*{
						title: '火灾来了怎么办',
						ability: 20,
						song_count: 10

					},{
						title: '做个受欢迎的小朋友',
						ability: 30,
						song_count: 10
					},{
						title:'咕噜咕噜',
						ability: 50,
						song_count: 10
					}*/
				]
				this.loading = false
				/*let rand = Math.random()
				if(rand < .5){
					album_list = []
				}*/
				if(album_list.length === 0){
					this.$refs.scroll.forceUpdate()
					return
				}else{
					this.$refs.scroll.forceUpdate(true)
					this.album_list = [...this.album_list, ...album_list]
				}
				
			}
		}
	}
</script>

<style scoped>
	.container{
		height: 70vh; 
		padding-bottom:2rem;
	}
	.wrapper{
		height: 780px;
	}
	.search_wrapper{
		padding: 1rem 1rem 1rem 1rem;
	}
	.border{
		border-radius: .5rem;
	}
	.flex_container{
		display: -webkit-flex;
		padding: 0 1rem 0 1rem;
		flex-flow: row wrap;
		justify-content: flex-start;
	}
	.flex_category_item{
		flex: 0 0 20%;
		text-align: center;
		margin-bottom:1rem;
	}
	.flex_category_item img{
		width: 3rem;
		height: 3rem;
		background: rgb(200,200,200);
	}
	.flex_category_item h3{
		margin-top:.5rem;
		margin-bottom:.5rem;
	}
	.flex_category_item span{
		padding-bottom: .5rem;
	}
	.tag{
		padding: .2rem .5rem .2rem .5rem;
		border:1px solid rgb(220,220,220);
		border-radius: 1rem;
		background: rgb(220,220,220);
	}
	.item{
		padding: 0 1rem 1rem 1rem;
	}
	.title_img{
		width: 3rem;
		height: 3rem;
		display: inline-block;
	}
	.content{
		margin-left:.5rem;
		display: inline-block;
		border-bottom:  1px solid rgb(235,235,235);
		width: calc(100% - 4rem);
		padding-bottom: 1rem;
		padding-top:.5rem;
	}
	.title{
		margin-bottom:.4rem;
	}
	.attr{
		font-size: .8rem;
		color:rgb(166,166,166);
	}
	.attr span{
		margin-left: .5rem;
	}

	.active{
		color:red;
		/* border-bottom:.2rem solid red; */
	}

	.head_title{
		overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 1;
	    -webkit-box-orient: vertical;
	}
</style>