const state = {
    userInfo: null,
    types: [
        {
            type: 1,
            title: '玄幻'
        },
        {
            type: 2,
            title: '修真'
        },
        {
            type: 3,
            title: '都市'
        },
        {
            type: 4,
            title: '历史'
        },
        {
            type: 5,
            title: '游戏'
        }
    ],
    cover: false,
    menu: false,
    currentCpt: 1,
    night: false,
    nightText: '夜间',
    font: false,
    fontSize: 16,
    currentStyle: 'style1',
    styles: ['style1', 'style2', 'style3', 'style4', 'style5']
}
export default state;
