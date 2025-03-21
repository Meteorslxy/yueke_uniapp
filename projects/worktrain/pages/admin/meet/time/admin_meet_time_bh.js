const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const dataHelper = require('../../../../../../helper/data_helper.js');
const timeHelper = require('../../../../../../helper/time_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const AdminMeetBiz = require('../../../../biz/admin_meet_biz.js');
const projectSetting = require('../../../../public/project_setting.js');
module.exports = {
    data() {
        return {
            oprt: 'admin',
            daysTimeOptions: AdminMeetBiz.getDaysTimeOptions(),
            multiDoDay: [],
            //当前选择

            hasDays: [],
            //超时有数据(simple)
            lastHasDays: [],
            //超时有数据(full)
            hasJoinDays: [],
            //未超时有预约

            days: [],
            curIdx: -1,
            // 当前操作的日子索引
            curTimesIdx: -1,
            // 当前操作的时段索引

            curTimeLimitModalShow: false,
            curTimeIsLimit: false,
            // 当前操作是否限制人数
            curTimeLimit: 50,
            // 当前时段人数限制

            saveTempModalShow: false,
            formTempName: '',
            cancelModalShow: false,
            //删除对话框
            formReason: '' //取消理由
        };
    },
    methods: {
        _init: function () {
            let parent = pageHelper.getPrevPage(2);
            if (parent) {
                let formDaysSet = parent.data.formDaysSet;
                let days = [];
                let lastHasDays = [];
                let hasJoinDays = [];
                let now = timeHelper.time('Y-M-D');
                for (let k = 0; k < formDaysSet.length; k++) {
                    //已超时无法编辑, 有数据显示form
                    if (formDaysSet[k].day < now) {
                        lastHasDays.push(formDaysSet[k]);
                    } else {
                        days.push(formDaysSet[k]);
                        if (this._checkHasJoinCnt(formDaysSet[k].times)) {
                            hasJoinDays.push(formDaysSet[k].day);
                        }
                    }
                }
                this.setData({
                    hasDays: dataHelper.getArrByKey(lastHasDays, 'day'),
                    lastHasDays,
                    hasJoinDays,
                    days
                });
                this._syncCalData();
            }
        },
        _setHasJoinDays: function () {
            let days = this.days;
            let now = timeHelper.time('Y-M-D');
            let hasJoinDays = [];
            for (let k = 0; k < days.length; k++) {
                if (days[k].day < now) {
                    continue;
                } else {
                    if (this._checkHasJoinCnt(days[k].times)) {
                        hasJoinDays.push(days[k].day);
                    }
                }
            }
            this.setData({
                hasJoinDays
            });
        },
        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function () {},
        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function () {},
        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide: function () {},
        /**
         * 生命周期函数--监听页面卸载
         */
        onUnload: function () {},
        model: function (e) {
            pageHelper.model(this, e);
        },
        // 判断含有预约的日期
        _checkHasJoinCnt: function (times) {
            if (!times) {
                return false;
            }
            for (let k = 0; k < times.length; k++) {
                if (times[k].stat.succCnt) {
                    return true;
                }
            }
            return false;
        },
        _syncCalData: function (e) {
            // 同步日历选中
            let days = this.days;
            let multiDoDay = dataHelper.getArrByKey(days, 'day');
            this.setData({
                multiDoDay
            });
        },
        bindTimeAddTap: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let days = this.days;
            if (days[idx].times.length >= 20) {
                return pageHelper.showModal('最多可以添加20个时段');
            }
            days[idx].times.push(AdminMeetBiz.getNewTimeNode(days[idx].day));
            this.setData({
                days
            });
        },
        bindCancelMeetJoinCmpt: async function (e) {
            //取消已有预约
            let curIdx = this.curIdx;
            let curTimesIdx = this.curTimesIdx;
            let days = this.days;
            try {
                let parent = pageHelper.getPrevPage(2);
                if (!parent) {
                    return;
                }
                let params = {
                    reason: this.formReason,
                    meetId: parent.data.id,
                    timeMark: days[curIdx].times[curTimesIdx].mark
                };
                let opt = {
                    title: '预约记录取消中'
                };
                await cloudHelper.callCloudSumbit(this.oprt + '/meet_cancel_time_join', params, opt).then((res) => {
                    let callback = () => {
                        days[curIdx].times.splice(curTimesIdx, 1);
                        this.setData({
                            days,
                            cancelModalShow: false,
                            formReason: ''
                        });
                        this._setHasJoinDays();
                    };
                    pageHelper.showSuccToast('取消成功', 1500, callback);
                });
            } catch (err) {
                console.log('CatchClause', err);
                console.log('CatchClause', err);
                console.log(err);
            }
        },
        bindTimeDelTap: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let timesIdx = pageHelper.dataset(e, 'timesidx');
            let days = this.days;
            let node = days[idx].times[timesIdx];
            if (node.stat.succCnt) {
                let callback = async () => {
                    this.setData({
                        formReason: '',
                        curIdx: idx,
                        curTimesIdx: timesIdx,
                        cancelModalShow: true //显示对话框
                    });
                };

                pageHelper.showConfirm('该时段已有「' + node.stat.succCnt + '人」预约，若选择删除则将取消所有预约，请仔细确认！ 若不想取消，可以选择停止该时段', callback);
            } else {
                let callback = () => {
                    days[idx].times.splice(timesIdx, 1);
                    this.setData({
                        days
                    });
                };
                pageHelper.showConfirm('是否要删除该时间段？', callback);
            }
        },
        bindTimeStatusSwitch: function (e) {
            let idx = pageHelper.dataset(e, 'idx');
            let timesIdx = pageHelper.dataset(e, 'timesidx');
            let days = this.days;
            let status = days[idx].times[timesIdx].status;
            if (status == 0) {
                days[idx].times[timesIdx].status = 1;
                this.setData({
                    days
                });
            } else {
                let yes = () => {
                    days[idx].times[timesIdx].status = 0;
                    this.setData({
                        days
                    });
                };
                pageHelper.showConfirm('是否要停止该时间段的预约？停止后，已有预约记录仍将保留', yes);
            }
        },
        bindDaysTimeStartCmpt: function (e) {
            let start = e.detail.join(':');
            let idx = pageHelper.dataset(e, 'idx');
            let timesIdx = pageHelper.dataset(e, 'timesidx');
            let days = this.days;
            let end = days[idx].times[timesIdx].end;
            if (start >= end) {
                return pageHelper.showModal('开始时间不能大于等于结束时间');
            }
            days[idx].times[timesIdx].start = start;
            this.setData({
                days
            });
        },
        bindDaysTimeEndCmpt: function (e) {
            let end = e.detail.join(':');
            let idx = pageHelper.dataset(e, 'idx');
            let timesIdx = pageHelper.dataset(e, 'timesidx');
            let days = this.days;
            let start = days[idx].times[timesIdx].start;
            if (start >= end) {
                return pageHelper.showModal('开始时间不能大于等于结束时间');
            }
            days[idx].times[timesIdx].end = end;
            this.setData({
                days
            });
        },
        switchModel: function (e) {
            pageHelper.switchModel(this, e, 'bool');
        },
        bindSaveTempCmpt: async function (e) {
            try {
                let name = this.formTempName;
                if (name.length <= 0) {
                    return pageHelper.showNoneToast('请填写模板名称');
                }
                if (name.length > 20) {
                    return pageHelper.showNoneToast('模板名称不能超过20个字哦');
                }
                let days = this.days;
                let times = days[this.curIdx].times;
                if (times.length <= 0) {
                    return pageHelper.showNoneToast('至少需要包含一个时段');
                }
                if (times.length > 20) {
                    return pageHelper.showNoneToast('时段不能超过20个');
                }
                let temps = [];
                for (let k = 0; k < times.length; k++) {
                    let node = {};
                    node.start = times[k].start;
                    node.end = times[k].end;
                    node.isLimit = times[k].isLimit;
                    node.limit = times[k].limit;
                    temps.push(node);
                }
                let opt = {
                    title: '模板保存中'
                };
                let params = {
                    name,
                    times: temps
                };
                await cloudHelper.callCloudSumbit(this.oprt + '/meet_temp_insert', params, opt).then((res) => {
                    pageHelper.showSuccToast('保存成功');
                    this.setData({
                        saveTempModalShow: false,
                        formTempName: ''
                    });
                });
            } catch (err) {
                console.log('CatchClause', err);
                console.log('CatchClause', err);
                console.log(err);
            }
        },
        bindTimeLimitSetCmpt: function (e) {
            let days = this.days;
            let idx = this.curIdx;
            let timesIdx = this.curTimesIdx;
            if (this.curTimesIdx == -1) {
                // 全天
                for (let k = 0; k < days[idx].times.length; k++) {
                    days[idx].times[k].isLimit = this.curTimeIsLimit;
                    days[idx].times[k].limit = this.curTimeLimit;
                }
            } else {
                // 某时间段
                let node = days[idx].times[timesIdx];
                node.isLimit = this.curTimeIsLimit;
                node.limit = this.curTimeLimit;
                days[idx].times[timesIdx] = node;
            }
            this.setData({
                days,
                curTimeLimitModalShow: false
            });
        },
        bindShowTimeLimitModalTap: function (e) {
            let curIdx = pageHelper.dataset(e, 'idx');
            let curTimesIdx = pageHelper.dataset(e, 'timesidx');
            let days = this.days;
            if (curTimesIdx == -1) {
                // 全天
                this.setData({
                    curIdx,
                    curTimesIdx: -1,
                    curTimeIsLimit: false,
                    curTimeLimit: 50,
                    curTimeLimitModalShow: true
                });
            } else {
                // 时间段
                let node = days[curIdx].times[curTimesIdx];
                let curTimeIsLimit = node.isLimit;
                let curTimeLimit = node.limit;
                this.setData({
                    curIdx,
                    curTimesIdx,
                    curTimeIsLimit,
                    curTimeLimit,
                    curTimeLimitModalShow: true
                });
            }
        },
        _selectTemp: function (e) {
            let curIdx = pageHelper.dataset(e, 'idx');
            if (this._checkHasJoinCnt(this.days[curIdx].times)) {
                return pageHelper.showModal('该日已有用户预约，不能选用模板。若确定要选用模板，请先删除有预约的时段');
            }
            this.setData({
                curIdx
            });
            uni.navigateTo({
                url: '../temp/' + this.oprt + '_meet_temp'
            });
        },
        url: function (e) {
            pageHelper.url(e, this);
        },
        _saveTempModal: function (e) {
            let curIdx = pageHelper.dataset(e, 'idx');
            let days = this.days;
            if (days[curIdx].times.length <= 0) {
                return pageHelper.showModal('该日期下没有设置时段，无法保存为模板，请先添加时段');
            }
            this.setData({
                saveTempModalShow: true,
                curIdx
            });
        },
        _copyDaySetToAll: function (e) {
            //  复制到所有
            let curIdx = pageHelper.dataset(e, 'idx');
            let days = this.days;
            let day = days[curIdx].day;
            let temps = days[curIdx].times;
            let callback = () => {
                for (let k = 0; k < days.length; k++) {
                    if (this._checkHasJoinCnt(days[k].times)) {
                        continue;
                    } //自己和有记录不复制

                    let times = [];
                    for (let j in temps) {
                        let node = AdminMeetBiz.getNewTimeNode(days[k].day);
                        node.start = temps[j].start;
                        node.end = temps[j].end;
                        node.limit = temps[j].limit;
                        node.isLimit = temps[j].isLimit;
                        times.push(node);
                    }
                    days[k].times = times;
                }
                this.setData({
                    days
                });
            };
            pageHelper.showConfirm('确认将「' + day + '」下的时段设置复制到其他日期下吗? (原有时段将被清除，如已有预约记录则该日的所有时段将不被修改)', callback);
        },
        bindDaySetTap: async function (e) {
            let itemList = ['选用模板配置', '保存为模板', '删除该日期', '复制到所有日期'];
            uni.showActionSheet({
                itemList,
                success: async (res) => {
                    let idx = res.tapIndex;
                    if (idx == 0) {
                        // 选用模板配置
                        this._selectTemp(e);
                    }
                    if (idx == 1) {
                        // 保存为模板
                        this._saveTempModal(e);
                    }
                    if (idx == 2) {
                        //  删除
                        let curIdx = pageHelper.dataset(e, 'idx');
                        if (this._checkHasJoinCnt(this.days[curIdx].times)) {
                            return pageHelper.showModal('该日已有用户预约，不能直接删除。若确定要删除，请先删除有预约的时段');
                        }
                        let callback = () => {
                            let days = this.days;
                            days.splice(curIdx, 1);
                            this.setData({
                                days
                            });
                            this._syncCalData();
                        };
                        pageHelper.showConfirm('确认删除该日期吗?', callback);
                    }
                    if (idx == 3) {
                        //复制到所有
                        this._copyDaySetToAll(e);
                    }
                },
                fail: function (res) {}
            });
        },
        bindTimeSetTap: async function (e) {
            let itemList = ['复制到所有日期', '选用模板配置', '保存为模板'];
            uni.showActionSheet({
                itemList,
                success: async (res) => {
                    let idx = res.tapIndex;
                    if (idx == 0) {
                        // 复制到所有
                        this._copyDaySetToAll(e);
                    }
                    if (idx == 1) {
                        // 选用模板配置
                        this._selectTemp(e);
                    }
                    if (idx == 2) {
                        // 保存为模板
                        this._saveTempModal(e);
                    }
                },
                fail: function (res) {}
            });
        },
        bindDataCalendarClickCmpt: function (e) {
            // 数据日历点击
            let clickDays = e.detail.days;
            if (!clickDays) {
                return;
            }
            let days = this.days;
            let retDays = [];
            for (let k = 0; k < clickDays.length; k++) {
                let dayExist = false;
                for (let j in days) {
                    if (days[j].day == clickDays[k]) {
                        // 节点存在
                        retDays.push(days[j]);
                        dayExist = true;
                        break;
                    }
                }

                // 节点不存在
                if (!dayExist) {
                    let dayDesc = timeHelper.fmtDateCHN(clickDays[k]) + ' (' + timeHelper.week(clickDays[k]) + ')';
                    let dayNode = projectSetting.MEET_NEW_NODE_DAY;
                    let times = [];
                    for (let n = 0; n < dayNode.length; n++) {
                        times.push(AdminMeetBiz.getNewTimeNode(clickDays[k], dayNode[n]));
                    }
                    let node = {
                        day: clickDays[k],
                        dayDesc,
                        times
                    };
                    retDays.push(node);
                }
            }
            this.setData({
                days: retDays
            });
        },
        onPageScroll: function (e) {
            if (e.scrollTop > 100) {
                this.setData({
                    topShow: true
                });
            } else {
                this.setData({
                    topShow: false
                });
            }
        },
        bindClearReasonTap: function (e) {
            this.setData({
                formReason: ''
            });
        },
        bindTopTap: function () {
            uni.pageScrollTo({
                scrollTop: 0
            });
        },
        bindSaveTap: function () {
            let parent = pageHelper.getPrevPage(2);
            if (!parent) {
                pageHelper.showNoneToast('前序页面不存在');
                return;
            }
            let days = this.days;
            let getDays = [];
            if (!projectSetting.MEET_CAN_NULL_TIME) {
                // 是否允许无时段日期
                for (let k = 0; k < days.length; k++) {
                    if (days[k].times.length > 0) {
                        getDays.push(days[k]);
                    }
                }
            } else {
                getDays = days;
            }
            let formDaysSet = this.lastHasDays.concat(getDays);
            parent.setData({
                formDaysSet
            });
            uni.navigateBack();
        }
    }
};
