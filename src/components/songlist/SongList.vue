<template>
	<section class="wrapper">
		<div class="header-container">
			<img :src="album_icon" class="flex-item" style="flex:.6;background:grey" alt="图片">
			<div class="flex-item" style="margin-left:1rem;padding:.6rem">
				<h3>{{album_title}}<img src="sss"/></h3>
				<div class="attr">
					<div>
						<img src="sss" /> <span> 能力值+30</span>
					</div>
					<div>
						<img src="sss" /> <span> {{album_count}}首</span>
					</div>
				</div>
				<div>
					<span class="button">
						播放全部
					</span>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="hwrapper">
				<div class="hitem">
					<span :class="{active:activeTag === 'introduce'}" @click.stop="switchTag('introduce')">简介</span>
				</div>
				<div class="hitem">
					<span  :class="{active:activeTag === 'songlist'}" @click.stop="switchTag('songlist')">节目</span>
				</div>
			</div>
		</div>

		<div v-show="activeTag === 'introduce'">
			<p class="introduce" v-if="introduce">{{introduce}}</p>
			<p style="padding: 1rem;text-align:center" v-if="!introduce">暂无介绍</p>
		</div>
		<div style="height:70vh">
			<cube-scroll   ref="scroll" :options="options" @pulling-up="onPullingUp">
				<div v-show="activeTag === 'songlist'">
					<ul class="content-wrapper"> 
						<li class="content-item" v-for="item,index in content">
							<div class="item" >
								<h3>{{index+1}}、{{item.title || item.audio_name}}</h3>
								<p style="margin-top:.2rem">
									<img src="sss"/>
									<span class="attr-item">能力值 +{{item.ablity}}</span>
									<span class="attr-item">{{item.duration}}</span>
								</p>	
							</div>
							<div class="item" style="text-align:right;color:red;flex:.4">
								<span class="listen">试听</span> <img src="sss" @click.stop="send(item,index)" />
							</div>
						</li>
					</ul>
				</div>
			</cube-scroll>
		</div>
	</section>
		
</template>
<script>
	import {getSongList,getAudiosByAlbumId,getAlbumDetailByAlbumId} from '@/service/service'
	export default{
		data(){
			return {
				options:{
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
				activeTag: 'songlist',
				introduce: '',
				page: 1,
				album_id: '',
				album_icon: '',
				album_title:'',
				album_count:'',
				content:[

				],
				category_name:''
			}
		},
		mounted(){
			this.album_id = this.$route.query.album_id
			this.category_name = this.$route.query.category_name
			if(!this.category_name){
				this.getData(1,this.album_id,this.page).then(res => {
					if(res.length > 0){
						this.content = [...this.content,...res]
						this.page++
					}
				}).catch(e => {
					console.log(e)
				})
			}else{
				this.getAlbumDetail()
				this.getDataByCategoryName(this.page,20,this.album_id).then(res => {
					this.content =  [...this.content,...res]
					this.page++
				})
			}
		},
		methods:{
			getAlbumDetail(){
				getAlbumDetailByAlbumId(this.album_id).then(res => {
					if(res && res.data && res.data.status === 0){
						this.album_title = res.data.data.album_name
						this.album_icon = res.data.data.icon
						this.album_count = res.data.data.album_count
						console.log(res.data)
					}
				})
			},
			getDataByCategoryName(page,limit,album_id){
				return getAudiosByAlbumId(page,limit,album_id).then(res => {
					if(res && res.data && res.data.status === 0){
						console.log(res.data)
						return Promise.resolve(res.data.data)
					}else{
						return Promise.reject(null)
					}
				})
			},
			getData(source,album_id,page){
				if(this.category_name){
					return getAudiosByAlbumId(this.page,20,this.album_id).then(res => {
						if(res && res.data && res.data.status === 0){
							console.log(res.data)
							return Promise.resolve(res.data.data)
						}else{
							return Promise.reject(null)
						}
					})
				}else{
					return getSongList(source,album_id,page).then(res => {
						if(res && res.data && res.data.status === 0 && res.data.data){
							this.introduce = res.data.data.album_intro 
							this.album_icon = res.data.data.icon
							this.album_title = res.data.data.album_title
							this.album_count = res.data.data.total_count
							return Promise.resolve(res.data.data.data)
						}else{
							return Promise.reject(null)
						}
					})
				}	
			},
			switchTag(tag){
				this.activeTag = tag
			},
			onPullingUp(){
				this.getData(1,this.album_id,this.page).then(res => {
					this.$refs.scroll.forceUpdate(true)
					if(res.length > 0){
						this.content = [...this.content,...res]
						this.page++
					}
				}).catch(e => {
					this.$refs.scroll.forceUpdate()
				})
			},
			send(item,index){
				alert('已推送')
			}
		}
	}
</script>

<style scoped>
	.wrapper{
		
	}
	.header-container{
		padding: 1rem;
		display: -webkit-flex;
		border-bottom: .2rem solid rgb(235,235,235);
	}
	.content-wrapper{
		padding: 0 1rem 0 1rem;
	}
	.flex-item{
		flex: 1;
		height: 8rem;
		width: 8rem;
		display: inline-block;
	}
	.attr{
		padding: 1rem 0 1rem 0;
		font-size: .9rem;
		color: rgb(166,166,166);
	}
	.button{
		display: inline-block;
		height: 1.6rem;
		color:white;
		line-height: 1.6rem;
		padding:0 .6rem 0 .6rem;
		border-radius:1.5rem;
		background:rgb(251,68,46);
		font-size: .9rem;
	}
	.hwrapper{
		padding: .9rem 5rem .9rem 5rem  ;
		display: -webkit-flex;
		border-bottom:  1px solid rgb(235,235,235);
	}
	.hitem{
		flex: 1;
		text-align: center;
	}
	.active{
		padding: .8rem 0 .8rem 0;
		border-bottom:.2rem solid red;
	}
	.introduce{
		text-indent: 2em;
		padding: 1rem;
	}
	.content-item{
		/* padding: 1rem; */
		padding: 1rem 0 1rem 0;
		display: block;
		display: -webkit-flex;
		border-bottom:  1px solid rgb(235,235,235);
	}
	.item{
		flex: 1;
	}
	.listen{
		border: 1px solid red;
		padding: .2rem .4rem .2rem .4rem;
		border-radius: .8rem;
		font-size: .9rem;
	}
	.attr-item{
		font-size: .9rem;
		color: rgb(166,166,166);
	}
</style>