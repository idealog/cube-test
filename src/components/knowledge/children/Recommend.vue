<template>
	<section class="out-wrapper">
		<div class="recommend-wrapper">
			<h1 class="title">今日推荐</h1>
			<p class="datetime">
				{{today}}
			</p>
			<div class="item">
				<div class="inline-item">
					<h2>已完成任务{{count}}篇</h2>
					<p class="tip">完成今日阅读可提高宝贝能力噢</p>
				</div>
				<div class="inline-item right"><span class="button">点播全部</span></div>
			</div>

			<ul>
				<li v-for="item in recommend_list" class="album_item" @click.stop="goDetail(item)">
					<div class="flex-container">
						<span class="flex-item" style="line-height:1.5rem">
							为您推荐 《{{item.album_title}}》
						</span>
						<span class="flex-item more" style="text-align:right;flex:.3;line-height:1.5rem">
							查看更多
						</span>
					</div>
					<div class="album_img" v-bind:style='{"background-image": `url(${item.icon})`,"background-size":"100%","background-repeat":"no-repeat"}' >
					</div>
				</li>
			</ul>
		</div>
		
	</section>
</template>

<script>
	import {getRecommend} from '@/service/service'
	export default{
		data(){
			return {
				today:'',
				count: 0,
				recommend_list:[]
			}
		},
		mounted(){
			this.today =  this.getDateTime()
			getRecommend(1).then(res => {
				if(res && res.data && res.data.data && res.data.status === 0){
					this.recommend_list = res.data.data.data
					console.log(this.recommend_list)
				}
			})
		},
		methods:{
			goDetail(item){
				this.$router.push({path:'/songlist',query:{"album_id":item.album_id}})
			},
			getDateTime(){
				const year = new Date().getYear() + 1900
				let month = new Date().getMonth() + 1
				if(month < 10){
					month = `0${month}`
				}
				let day = new Date().getDate()
				if(day < 10){
					day = `0${day}`
				}
				return `${year}.${month}.${day}`
			}
		}
	}
</script>

<style scoped>
	.out-wrapper{
		position: absolute;
		width: 100%;
	}
	.recommend-wrapper{
		margin-top:1.3rem;
		padding: 1rem;

	}
	.title{
		font-size: 2rem;
		font-weight: bold;
	}
	.datetime{
		margin-top:.6rem;
		color:rgba(0,0,0,.7);
	}
	.item{
		display: block;
		margin-top:2rem;
	}
	.inline-item{
		display: inline-block;
		height: 4rem;
	}
	.tip{
		margin-top:.5rem;
		color:rgb(170,170,170);
	}
	.right{
		float:right;
	}
	.button{
		display: inline-block;
		height: 2.5rem;
		color:white;
		line-height: 2.5rem;
		padding:0 1rem 0 1rem;
		border-radius:1.5rem;
		background:rgb(251,68,46);
	}
	.album_item{
		margin-top:1rem;
	}
	.more{
		float:right;
	}
	.album_img{
		height: 15rem;
		width: 100%;
		background: rgb(200,200,200);
		margin-top:.7rem;
	}
	.flex-container{
		display: -webkit-flex;
	}
	.flex-item{
		flex: 1;
	}
</style>