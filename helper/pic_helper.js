/**
 * Notes: 图片处理相关函数
 * Ver : CCMiniCloud Framework 2.0.13 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2021-10-25 04:00:00
 */

function getWritePhotosAlbum(callback) {
    uni.getSetting({
        success: (res) => {
            console.log('res=', res);
            if (res.authSetting['scope.writePhotosAlbum']) {
                console.log('true');
                if (callback) {
                    callback();
                }
            } else if (res.authSetting['scope.writePhotosAlbum'] === undefined) {
                uni.showModal({
                    title: '提示',
                    content: '您未开启保存图片到相册的权限，请点击确定去开启权限！',
                    success: (res) => {
                        if (res.confirm) {
                            uni.authorize({
                                scope: 'scope.writePhotosAlbum',
                                success: (res) => {
                                    if (callback) {
                                        callback();
                                    }
                                    console.log('授权下载成功', res);
                                },
                                fail: (res) => {
                                    console.log('您没有授权 fail=', res);
                                    uni.showToast({
                                        title: '您没有授权，无法保存到相册',
                                        icon: 'none'
                                    });
                                }
                            });
                        } else {
                            console.log('取消了');
                        }
                    }
                });
            } else {
                uni.showModal({
                    title: '提示',
                    content: '您未开启保存图片到相册的权限，请点击确定去开启权限！',
                    success: (res) => {
                        if (res.confirm) {
                            uni.openSetting({
                                success: (res) => {
                                    uni.showToast({
                                        icon: 'none',
                                        title: '正在保存图片'
                                    });
                                    if (res.authSetting['scope.writePhotosAlbum']) {
                                        console.log('false success res=', res);
                                        if (callback) {
                                            callback();
                                        }
                                    } else {
                                        uni.showToast({
                                            title: '您没有授权，无法保存到相册！',
                                            icon: 'none'
                                        });
                                    }
                                },
                                fail: (res) => {
                                    console.log('false file res=', res);
                                }
                            });
                        } else {
                            uni.showToast({
                                title: '您没有授权，无法保存到相册',
                                icon: 'none'
                            });
                        }
                    }
                });
            }
        }
    });
}
module.exports = {
    getWritePhotosAlbum
};
