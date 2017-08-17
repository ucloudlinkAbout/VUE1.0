/**
 * Created by chenwenxiao on 2017/1/12.
 */
new Vue({
    el: '#app',
    data: function () {
        return {
            title: '',
            titleDesc: '',
            devieceData: {
                iMac: {
                    pd: 62,
                    owidth: 1489,
                    iwidth: 1366,
                    txt:'参考分辨率 1366 * 768',
                    img: '/doc/images/device/iMac.png',
                    iheight: 770
                },
                iPad: {
                    pd: '137px 0px 0px 61px',
                    owidth: 890,
                    iwidth: 768,
                    txt:'参考分辨率 768 * 1024',
                    img: '/doc/images/device/iPad.png',
                    iheight: 1005
                },
                'iPad-V': {
                    pd: '87px 0 0 121px',
                    owidth: 1265,
                    iwidth: 1024,
                    txt:'参考分辨率 1024 * 768',
                    img: '/doc/images/device/iPad_2.png',
                    iheight: 745
                },
                'iPad-pro': {
                    pd: '108px 0px 0px 46px',
                    owidth: 860,
                    iwidth: 768,
                    txt:'参考分辨率 768 * 1024',
                    img: '/doc/images/device/iPad-pro.png',
                    iheight: 1005
                },
                'iPad-pro-V': {
                    pd: '68px 0px 0px 88px',
                    owidth: 1200,
                    iwidth: 1024,
                    txt:'参考分辨率 1024 * 768',
                    img: '/doc/images/device/iPad-pro_2.png',
                    iheight: 745
                },
                'iPad-mini': {
                    pd: '137px 0px 0px 61px',
                    owidth: 890,
                    iwidth: 768,
                    txt:'参考分辨率 768 * 1024',
                    img: '/doc/images/device/iPad-mini.png',
                    iheight: 1005
                },
                'iPad-mini-V': {
                    pd: '85px 0px 0px 118px',
                    owidth: 1260,
                    iwidth: 1024,
                    txt:'参考分辨率 1024 * 768',
                    img: '/doc/images/device/iPad-mini_2.png',
                    iheight: 745
                },
                'iPhone6': {
                    pd: '134px 0px 0px 31px',
                    owidth: 450,
                    iwidth: 388,
                    txt:'参考分辨率 375 * 667',
                    img: '/doc/images/device/iPhone-6.png',
                    iheight: 668
                },
                'iPhone6s': {
                    pd: '161px 0px 0px 38px',
                    owidth: 450,
                    iwidth: 377,
                    txt:'参考分辨率 364 * 646',
                    img: '/doc/images/device/iPhone-se.png',
                    iheight: 647
                }
            }
        }
    },
    methods: {
        selectDevice: function (e) {
            var that = this;
            var ee = e.currentTarget.attributes['data-type'].value;
            that.title = e.currentTarget.attributes['title'].value;
            that.titleDesc = that.devieceData[ee].txt;
            $('#frameWork').css({
                'width': that.devieceData[ee].iwidth,
                'height': that.devieceData[ee].iheight
            });
            $('#abc').css({
                'width': that.devieceData[ee].owidth,
                'padding': that.devieceData[ee].pd,
                'background-image': 'url("' + that.devieceData[ee].img + '")'
            });
        }
    },
    ready: function () {
        this.$els.pcc.click();
        $('#frameWork').attr('src','/login?' + new Date().getTime());
    }
});