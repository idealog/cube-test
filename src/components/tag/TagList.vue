<template>
	<section class="wrapper">
		<!-- <div class="set" v-for="item in list">
			<div class="item" style="flex:.2;position:relative">
				<div style="position:relative;height:100%;overflow:hidden">
					<div class="item-vertical">
						<img src="sss"/>
						<h3>
							{{item.title}}
						</h3>
					</div>
				</div>
			</div>
			<div class="item">
				<ul class="set_wrapper">
					<li v-for="sub in item.tag_list" class="tag_item" @click.stop="active(sub,item.bg_color)">
						<span v-bind:style="sub.style">{{sub.name}}</span>
					</li>
				</ul>
			</div>
		</div> -->
		<div>
			<ul class="set_wrapper">
				<li v-for="item in category_list" class="tag_item" :class="{'active':selected_list.indexOf(item.category_name) > -1}"  @click.stop="active(item)">
					<span >{{item.category_name}}</span>
				</li>
			</ul>
		</div>
	</section>
</template>
<script>
	import {getCategoryList} from '@/service/service'
	export default{
		data(){
			return {
				selected_list:[], //选择过的类别名
				category_list:[],
				list:[
					{
						title:'功能',
						bg_color:'rgb(255,145,144)',
						tag_list: [
							{
								id:0,
								name:'安全教育',
								style:{
									color:'rgb(255,145,144)',
									background:'white',
									border: '1px solid rgb(255,145,144)'
								}
							},
							{
								id:0,
								name:'情商培养',
								style:{
									color:'rgb(255,145,144)',
									background:'white',
									border: '1px solid rgb(255,145,144)'
								}
							},
							{
								id:0,
								name:'语言表达',
								style:{
									color:'rgb(255,145,144)',
									background:'white',
									border: '1px solid rgb(255,145,144)'
								}
							},
							{
								id:0,
								name:'情绪管理',
								style:{
									color:'rgb(255,145,144)',
									background:'white',
									border: '1px solid rgb(255,145,144)'
								}
							},
							{
								id:0,
								name:'习惯养成',
								style:{
									color:'rgb(255,145,144)',
									background:'white',
									border: '1px solid rgb(255,145,144)'
								}
							},
							{
								id:0,
								name:'安全教育',
								style:{
									color:'rgb(255,145,144)',
									background:'white',
									border: '1px solid rgb(255,145,144)'
								}
							},
							{
								id:0,
								name:'艺术修养',
								style:{
									color:'rgb(255,145,144)',
									background:'white',
									border: '1px solid rgb(255,145,144)'
								}
							},
							{
								id:0,
								name:'性格培养',
								style:{
									color:'rgb(255,145,144)',
									background:'white',
									border: '1px solid rgb(255,145,144)'
								}
							},
							{
								id:0,
								name:'社交能力',
								style:{
									color:'rgb(255,145,144)',
									background:'white',
									border: '1px solid rgb(255,145,144)'
								}
							},
							{
								id:0,
								name:'益智教育',
								style:{
									color:'rgb(255,145,144)',
									background:'white',
									border: '1px solid rgb(255,145,144)'
								}
							}

						]
					},
					{
						title:'年龄',
						bg_color:'rgb(116,187,237)',
						tag_list: [

							{
								id:0,
								name:'0-2岁',
								style:{
									color:'rgb(116,187,237)',
									background:'white',
									border: '1px solid rgb(116,187,237)'
								}
							},
							{
								id:0,
								name:'3岁+',
								style:{
									color:'rgb(116,187,237)',
									background:'white',
									border: '1px solid rgb(116,187,237)'
								}
							},
							{
								id:0,
								name:'6岁+',
								style:{
									color:'rgb(116,187,237)',
									background:'white',
									border: '1px solid rgb(116,187,237)'
								}
							},
							{
								id:0,
								name:'全龄精选',
								style:{
									color:'rgb(116,187,237)',
									background:'white',
									border: '1px solid rgb(116,187,237)'
								}
							}
						]
					},
					{
						title:'类型',
						bg_color:'rgb(67,213,184)',
						tag_list: [

							{
								id:0,
								name:'科普',
								style:{
									color:'rgb(67,213,184)',
									background:'white',
									border: '1px solid rgb(67,213,184)'
								}
							},
							{
								id:0,
								name:'国学',
								style:{
									color:'rgb(67,213,184)',
									background:'white',
									border: '1px solid rgb(67,213,184)'
								}
							},
							{
								id:0,
								name:'通话',
								style:{
									color:'rgb(67,213,184)',
									background:'white',
									border: '1px solid rgb(67,213,184)'
								}
							},
							{
								id:0,
								name:'成语',
								style:{
									color:'rgb(67,213,184)',
									background:'white',
									border: '1px solid rgb(67,213,184)'
								}
							},
							{
								id:0,
								name:'英语',
								style:{
									color:'rgb(67,213,184)',
									background:'white',
									border: '1px solid rgb(67,213,184)'
								}
							},
							{
								id:0,
								name:'名著',
								style:{
									color:'rgb(67,213,184)',
									background:'white',
									border: '1px solid rgb(67,213,184)'
								}
							}

						]
					},
					{
						title:'场景',
						bg_color: 'rgb(176,67,213)',
						tag_list: [

							{
								id:0,
								name:'起早',
								style:{
									color:'rgb(176,67,213)',
									background:'white',
									border: '1px solid rgb(176,67,213)'
								}
							},
							{
								id:0,
								name:'哄睡',
								style:{
									color:'rgb(176,67,213)',
									background:'white',
									border: '1px solid rgb(176,67,213)'
								}
							},
							{
								id:0,
								name:'哭闹',
								style:{
									color:'rgb(176,67,213)',
									background:'white',
									border: '1px solid rgb(176,67,213)'
								}
							},
							{
								id:0,
								name:'吃饭',
								style:{
									color:'rgb(176,67,213)',
									background:'white',
									border: '1px solid rgb(176,67,213)'
								}
							},
							{
								id:0,
								name:'生病',
								style:{
									color:'rgb(176,67,213)',
									background:'white',
									border: '1px solid rgb(176,67,213)'
								}
							},
							{
								id:0,
								name:'洗澡',
								style:{
									color:'rgb(176,67,213)',
									background:'white',
									border: '1px solid rgb(176,67,213)'
								}
							}
						]
					}
				]
			}
		},
		mounted(){
			if(this.$store.state.selected_category_list && this.$store.state.selected_category_list.length > 0){
				this.selected_list = this.$store.state.selected_category_list
			}
			getCategoryList().then(res => {
				if(res && res.data && res.data.status === 0){
					this.category_list = res.data.data
					this.$store.state.category_list = this.category_list
				}
			})
		},
		methods:{
			active(item){
				if(this.selected_list.indexOf(item.category_name) === -1){
					this.selected_list.push(item.category_name)
					this.$store.state.selected_category_list = this.selected_list
				}else{
					const index = this.selected_list.indexOf(item.category_name)
					this.selected_list.splice(index,1)
					this.$store.state.selected_category_list = this.selected_list
				}
			}
			/*active(sub,color){
				if(!sub.active){
					sub.active = true
					sub.style.background = color
					sub.style.color = 'white'
				}else{
					sub.active = false
					sub.style.background = 'white'
					sub.style.color = color
				}
			}*/
		}

	}
</script>

<style scoped>
	.wrapper{
		padding: 1rem 0 0 1rem;
	}
	.set{
		display: -webkit-flex;
		margin-top:2rem;
	}
	.item{
		flex: 1;
	}
	.set_wrapper{
		flex-flow:row wrap;
		display: -webkit-flex;
	}

	.tag_item{
		padding: .6rem ;
		margin-bottom:1rem;
	}

	.tag_item span{
		padding: .5rem;
		border: 1px solid red;
		border-radius: 1rem;
		/* background: red; */
		background: white;
		font-size: .9rem;
		/* color:white; */
		color: red;
	}
	.tag_item.active span{
		background:red;
		color: white;
	}
	.item-vertical{
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
</style>