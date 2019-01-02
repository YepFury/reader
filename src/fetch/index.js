import axios from 'axios';
import qs from 'qs';

const request = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
})

request.interceptors.request.use(config => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data)
    }
    return config;
})

request.interceptors.response.use(response => {
    return response.data;
})

// 获取书本列表
export const getBookList = () => {
    return new Promise((resolve, reject) => {
        request.get('/booklist').then(response => {
            resolve(response);
        }, err => {
            reject(err);
        })
    })
}

// 获取某一类
export const getBookType = (type) => {
    return new Promise((resolve, reject) => {
        request.get(`/type?type=${type}`).then(response => {
            resolve(response);
        }, err => {
            reject(err);
        })
    })
}

// 获取某本书
export const getBook = (id) => {
    return new Promise((resolve, reject) => {
        request.get(`/booklist?id=${id}`).then(res => {
            resolve(res);
        })
    })
}

// 获取章节列表
export const getTitleList = (id) => {
    return new Promise((resolve, reject) => {
        request.get(`/booktitles?id=${id}`).then(res => {
            resolve(res);
        })
    })
}

// 获取书本
export const getBookContent = (book, chapter) => {
    return new Promise((resolve, reject) => {
        request.get(`/book?book=${book}&id=${chapter}`).then(res => {
            resolve(res);
        })
    })
}

// 获取书架
export const getShelf = (userId) => {
    return new Promise((resolve, reject) => {
        request.get(`/shelf?userId=${userId}`).then(res => {
            resolve(res);
        })
    })
}

// 加入书架
export const postShelf = (userId, userInfo) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/inShelf',
            method: 'post',
            data: {
                userId: userId,
                userInfo: userInfo
            }
        }).then(res => {
            resolve(res);
        })
    })
}

// 检查是否在书架
export const checkShelf = (userId, bookId) => {
    return new Promise((resolve, reject) => {
        request.get(`/checkShelf?userId=${userId}&bookId=${bookId}`).then(res => {
            resolve(res);
        })
    })
}
// 搜索
export const search = (keyword) => {
    return new Promise((resolve, reject) => {
        request.get('/search', {
            params: {
                keyword: keyword
            }
        }).then(res => {
            resolve(res);
        })
    })
}
// 获取最近阅读记录
export const getLate = (userId, bookId) => {
    return new Promise((resolve, reject) => {
        request.get('/late', {
            params: {
                userId: userId,
                bookId: bookId
            }
        }).then(res => {
            resolve(res);
        })
    })
}
// 添加到最近阅读记录
export const postLately = (userId, bookId, chapterId) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/lately',
            method: 'post',
            data: {
                userId: userId,
                bookId: bookId,
                chapterId: chapterId
            }
        }).then(res => {
            resolve(res);
        })
    })
}

// 登录
export const login = (username, password) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/login',
            method: 'post',
            data: {
                user: username,
                pwd: password
            }
        }).then(res => {
            resolve(res);
        })
    })
}

// 注册
export const register = (params) => {
    return new Promise((resolve, reject) => {
        request({
            url: '/register',
            method: 'post',
            data: params
        }).then(res => {
            resolve(res);
        })
    })
}

