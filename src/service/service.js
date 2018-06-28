import axios from 'axios'
let HOST;
if(process.env.NODE_ENV  === 'development'){
	HOST = '/data_api/api/v1';
}else{
	HOST = 'xxx/api/v1';
}
const TEST_SERVER = 'http://dev.cocheer.cn/cloud/cocheer'
export const getRecommend = (source = 1,category = '',page = 1,limit = 20) => {
	const url = `${HOST}/qly/recommend`
	const method = 'get'
	const params = {
		source,
		category,
		page,
		limit
	}
	return axios({
		url,
		method,
		params
	})
}

export const getSongList = (source = 1,album_id,page,limit=20) => {
	const url = `${HOST}/qly/song/list`
	const method = 'get'
	const params = {
		source,
		album_id,
		page,
		limit
	}
	return axios({
		url,
		method,
		params
	})
}

export const getCategoryList = (page = 1, limit = 30) => {
	const url = `${TEST_SERVER}/categories`
	const method = 'get'
	const params = {
		page,
		limit
	}
	return axios({
		url,
		method,
		params
	})
}

export const getAlbumListByTag = (page=1,limit = 20, category_id) => {
	const url = `${TEST_SERVER}/cocheer_albums`
	const method = 'get'
	const params = {
		page,
		limit,
		category_id
	}
	return axios({
		url,
		method,
		params
	})
}

export const getAudiosByAlbumId = (page = 1,limit = 20, album_id) => {
	const url = `${TEST_SERVER}/audios`
	const method = 'get'
	const params = {
		page,
		limit,
		album_id
	}
	return axios({
		url,
		method,
		params
	})
}

export const getAlbumDetailByAlbumId = (album_id) => {
	const url = `${TEST_SERVER}/cocheer_albums/${album_id}`
	const method = 'get'
	const params = {
		
	}
	return axios({
		url,
		method,
		params
	})
}

export const getLatest = (source = 1, page , limit = 20) => {
	const url = `${HOST}/qly/recent`
	const method = 'get'
	const params = {
		source,
		page,
		limit
	}
	return axios({
		url,
		method,
		params
	})
}





