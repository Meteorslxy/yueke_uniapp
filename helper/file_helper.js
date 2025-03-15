/**
 * Notes: 文件处理相关函数
 * Ver : CCMiniCloud Framework 2.7.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-02-05 04:00:00
 */
const pageHelper = require('./page_helper.js');
const timeHelper = require('./time_helper.js');
async function openFile(fileNode) {
    let url = fileNode.path;
    let type = fileNode.type;
    let name = fileNode.name;
    let ext = url.toLowerCase().substring(url.lastIndexOf('.') + 1);
    if (ext == 'doc' || ext == 'docx' || ext == 'xls' || ext == 'xlsx' || ext == 'ppt' || ext == 'pptx' || ext == 'pdf') {
        openDoc(name, url, '.' + ext, true);
    } else if (type == 'image') {
        uni.previewImage({
            current: url,
            // 当前显示图片的http链接
            urls: [url]
        });
    } else if (type == 'video') {
        uni.previewMedia({
            current: 0,
            // 当前显示图片的http链接
            sources: [
                {
                    url: url,
                    // 需要预览的视频http链接列表
                    type: 'video'
                }
            ]
        });
    } else {
        pageHelper.showModal('不支持预览此文件');
    }
}

// directName:是否用name作为文件名
async function openDoc(name, url, ext = '.xlsx', directName = false) {
    if (!url.includes('cloud://') && (url.includes('tmp') || url.includes('temp') || url.includes('wxfile'))) {
        // 本地临时文件直接打开
        uni.openDocument({
            showMenu: true,
            filePath: url,
            success: function (res) {
                console.log('打开文档成功');
            }
        });
        return;
    } else if (url.includes('cloud://')) {
        const cloudHelper = require('./cloud_helper.js');
        url = await cloudHelper.getTempFileURLOne(url);
    }
    uni.showLoading({
        title: '文件下载中'
    });
    let filePath = directName ? uni.env.USER_DATA_PATH + '/' + name : uni.env.USER_DATA_PATH + '/' + name + timeHelper.time('YMDhms') + ext;
    uni.downloadFile({
        url,
        //fileID:' ',
        filePath,
        success: function (res) {
            uni.hideLoading();
            if (res.statusCode != 200) {
                return pageHelper.showModal('打开文件失败，请重试或者采取别的下载方式');
            }
            const filePath = res.filePath;
            uni.openDocument({
                showMenu: true,
                filePath: filePath,
                success: function (res) {
                    console.log('打开文档成功');
                }
            });
        },
        fail: function (err) {
            uni.hideLoading();
            console.log(err);
            pageHelper.showModal('打开文件失败，请重试或者采取别的下载方式');
        }
    });
}
module.exports = {
    openDoc,
    openFile
};
