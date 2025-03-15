/* 公历转农历代码思路：
1、建立农历年份查询表
2、计算输入公历日期与公历基准的相差天数
3、从农历基准开始遍历农历查询表，计算自农历基准之后每一年的天数，并用相差天数依次相减，确定农历年份
4、利用剩余相差天数以及农历每个月的天数确定农历月份
5、利用剩余相差天数确定农历哪一天
https://github.com/xm2by/fragment
 */ //农历节日
const LUNAR_HOLIDAY = {
    '0101': '春节',
    '0115': '元宵节',
    '0505': '端午节',
    '0707': '七夕',
    '0715': '中元节',
    '0815': '中秋节',
    '0909': '重阳节',
    1208: '腊八节',
    1224: '小年'
};

// 公历节日
const PUBLIC_HOLIDAY = {
    '0101': '元旦',
    '0214': '情人节',
    '0307': '女生节',
    '0308': '妇女节',
    '0312': '植树节',
    '0314': '白色情人',
    '0315': '消费者日',
    '0401': '愚人节',
    '0404': '复活节',
    '0501': '劳动节',
    '0504': '青年节',
    '0510': '母亲节',
    '0512': '护士节',
    '0601': '儿童节',
    '0620': '父亲节',
    '0701': '建党节',
    '0801': '建军节',
    '0910': '教师节',
    '0928': '孔子诞辰',
    1001: '国庆节',
    1006: '老人节',
    1024: '联合国日',
    1101: '万圣节',
    1125: '感恩节',
    1224: '平安夜',
    1225: '圣诞节'
};
const SOLAR_STERM = [
    '小寒',
    '大寒',
    '立春',
    '雨水',
    '惊蛰',
    '春分',
    '清明',
    '谷雨',
    '立夏',
    '小满',
    '芒种',
    '夏至',
    '小暑',
    '大暑',
    '立秋',
    '处暑',
    '白露',
    '秋分',
    '寒露',
    '霜降',
    '立冬',
    '小雪',
    '大雪',
    '冬至'
];
const SOLAR_STERM_INFO = [
    0, 1272480000, 2548020000, 3830160000, 5120220000, 6420840000, 7732020000, 9055260000, 10388940000, 11733060000, 13084320000, 14441580000, 15800580000, 17159340000,
    18513780000, 19861980000, 21201000000, 22529640000, 23846820000, 25152600000, 26447700000, 27733440000, 29011920000, 30285480000
];

// 农历1949-2100年查询表
const LUNAR_YEAR_ARR = [
    46423,
    //1949
    27808,
    46416,
    86869,
    19872,
    42416,
    83315,
    21168,
    43432,
    59728,
    27296,
    //1950-1959
    44710,
    43856,
    19296,
    43748,
    42352,
    21088,
    62051,
    55632,
    23383,
    22176,
    //1960-1969
    38608,
    19925,
    19152,
    42192,
    54484,
    53840,
    54616,
    46400,
    46752,
    103846,
    //1970-1979
    38320,
    18864,
    43380,
    42160,
    45690,
    27216,
    27968,
    44870,
    43872,
    38256,
    //1980-1989
    19189,
    18800,
    25776,
    29859,
    59984,
    27480,
    21952,
    43872,
    38613,
    37600,
    //1990-1999
    51552,
    55636,
    54432,
    55888,
    30034,
    22176,
    43959,
    9680,
    37584,
    51893,
    //2000-2009
    43344,
    46240,
    47780,
    44368,
    21977,
    19360,
    42416,
    86390,
    21168,
    43312,
    //2010-2019
    31060,
    27296,
    44368,
    23378,
    19296,
    42726,
    42208,
    53856,
    60005,
    54576,
    //2020-2029
    23200,
    30371,
    38608,
    19195,
    19152,
    42192,
    118966,
    53840,
    54560,
    56645,
    //2030-2039
    46496,
    22224,
    21938,
    18864,
    42359,
    42160,
    43600,
    111189,
    27936,
    44448,
    //2040-2049
    84835,
    37744,
    18936,
    18800,
    25776,
    92326,
    59984,
    27424,
    108228,
    43744,
    //2050-2059
    41696,
    53987,
    51552,
    54615,
    54432,
    55888,
    23893,
    22176,
    42704,
    21972,
    //2060-2069
    21200,
    43448,
    43344,
    46240,
    46758,
    44368,
    21920,
    43940,
    42416,
    21168,
    //2070-2079
    45683,
    26928,
    29495,
    27296,
    44368,
    84821,
    19296,
    42352,
    21732,
    53600,
    //2080-2089
    59752,
    54560,
    55968,
    92838,
    22224,
    19168,
    43476,
    41680,
    53584,
    62034,
    //2090-2099
    54560 //2100
];

const LUNAR_MONTH = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
const LUNAR_DAY = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '初', '廿'];
const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 公历转农历函数
function sloarToLunar(sy, sm, sd) {
    if (typeof sy == 'string') {
        let arr = sy.split('-');
        sy = Number(arr[0]);
        sm = Number(arr[1]);
        sd = Number(arr[2]);
    }

    // 公历节日
    let publicHoliday = (sm > 9 ? sm : '0' + sm) + '' + (sd > 9 ? sd : '0' + sd);
    if (PUBLIC_HOLIDAY.hasOwnProperty(publicHoliday)) {
        return PUBLIC_HOLIDAY[publicHoliday];
    }

    // 输入的月份减1处理
    sm -= 1;

    // 计算与公历基准的相差天数
    // Date.UTC()返回的是距离公历1970年1月1日的毫秒数,传入的月份需要减1
    let daySpan = (Date.UTC(sy, sm, sd) - Date.UTC(1949, 0, 29)) / (86400 * 1000) + 1;
    let ly;
    let lm;
    let ld; // 确定输出的农历年份
    for (let j = 0; j < LUNAR_YEAR_ARR.length; j++) {
        daySpan -= lunarYearDays(LUNAR_YEAR_ARR[j]);
        if (daySpan <= 0) {
            ly = 1949 + j;
            // 获取农历年份确定后的剩余天数
            daySpan += lunarYearDays(LUNAR_YEAR_ARR[j]);
            break;
        }
    }

    // 确定输出的农历月份
    for (let k = 0; k < lunarYearMonths(LUNAR_YEAR_ARR[ly - 1949]).length; k++) {
        daySpan -= lunarYearMonths(LUNAR_YEAR_ARR[ly - 1949])[k];
        if (daySpan <= 0) {
            // 有闰月时，月份的数组长度会变成13，因此，当闰月月份小于等于k时，lm不需要加1
            if (hasLeapMonth(LUNAR_YEAR_ARR[ly - 1949]) && hasLeapMonth(LUNAR_YEAR_ARR[ly - 1949]) <= k) {
                if (hasLeapMonth(LUNAR_YEAR_ARR[ly - 1949]) < k) {
                    lm = k;
                } else if (hasLeapMonth(LUNAR_YEAR_ARR[ly - 1949]) === k) {
                    lm = '闰' + k;
                } else {
                    lm = k + 1;
                }
            } else {
                lm = k + 1;
            }
            // 获取农历月份确定后的剩余天数
            daySpan += lunarYearMonths(LUNAR_YEAR_ARR[ly - 1949])[k];
            break;
        }
    }

    // 确定输出农历哪一天
    ld = daySpan;

    //农历节日
    let paraHoliday = (lm > 9 ? lm : '0' + lm) + '' + (ld > 9 ? ld : '0' + ld);
    if (LUNAR_HOLIDAY.hasOwnProperty(paraHoliday)) {
        return LUNAR_HOLIDAY[paraHoliday];
    }

    // TODO:除夕
    /*
  if (lm == 12) {
  	var theLastDay = lDate.isLeap ? leapDays(y) : monthDays(y, m); //农历当月最後一天
  	if (theLastDay == ld) {
  		return "除夕";
  	}
  }*/

    // 农历节气
    let temp = getSolarTerm(sy, sm + 1, sd);
    if (temp) {
        return temp;
    }

    // 将计算出来的农历月份转换成汉字月份，闰月需要在前面加上闰字
    if (hasLeapMonth(LUNAR_YEAR_ARR[ly - 1949]) && typeof lm === 'string' && lm.indexOf('闰') > -1) {
        lm = `闰${LUNAR_MONTH[/\d/.exec(lm) - 1]}`;
    } else {
        lm = LUNAR_MONTH[lm - 1];
    }

    // 将计算出来的农历年份转换为天干地支年
    //ly = getTianGan(ly) + getDiZhi(ly);
    ly = '';

    // 将计算出来的农历天数转换成汉字
    if (ld < 11) {
        ld = `${LUNAR_DAY[10]}${LUNAR_DAY[ld - 1]}`;
    } else if (ld > 10 && ld < 20) {
        ld = `${LUNAR_DAY[9]}${LUNAR_DAY[ld - 11]}`;
    } else if (ld === 20) {
        ld = `${LUNAR_DAY[1]}${LUNAR_DAY[9]}`;
    } else if (ld > 20 && ld < 30) {
        ld = `${LUNAR_DAY[11]}${LUNAR_DAY[ld - 21]}`;
    } else if (ld === 30) {
        ld = `${LUNAR_DAY[2]}${LUNAR_DAY[9]}`;
    }

    //console.log(ly, lm, ld);
    if (ld == '初一') {
        ld = lm + '月';
    }

    /*
  return {
  	lunarYear: ly,
  	LUNAR_MONTH: lm,
  	LUNAR_DAY: ld,
  }*/
    return ld;
}

// 计算农历年是否有闰月，参数为存储农历年的16进制
// 农历年份信息用16进制存储，其中16进制的最后1位可以用于判断是否有闰月
function hasLeapMonth(ly) {
    // 获取16进制的最后1位，需要用到&与运算符
    if (ly & 15) {
        return ly & 15;
    } else {
        return false;
    }
}

// 如果有闰月，计算农历闰月天数，参数为存储农历年的16进制
// 农历年份信息用16进制存储，其中16进制的第1位（0x除外）可以用于表示闰月是大月还是小月
function leapMonthDays(ly) {
    if (hasLeapMonth(ly)) {
        // 获取16进制的第1位（0x除外）
        return ly & 983040 ? 30 : 29;
    } else {
        return 0;
    }
}

// 计算农历一年的总天数，参数为存储农历年的16进制
// 农历年份信息用16进制存储，其中16进制的第2-4位（0x除外）可以用于表示正常月是大月还是小月
function lunarYearDays(ly) {
    let totalDays = 0;

    // 获取正常月的天数，并累加
    // 获取16进制的第2-4位，需要用到>>移位运算符
    for (let i = 32768; i > 8; i >>= 1) {
        let monthDays = ly & i ? 30 : 29;
        totalDays += monthDays;
    }
    // 如果有闰月，需要把闰月的天数加上
    if (hasLeapMonth(ly)) {
        totalDays += leapMonthDays(ly);
    }
    return totalDays;
}

// 获取农历每个月的天数
// 参数需传入16进制数值
function lunarYearMonths(ly) {
    let monthArr = [];

    // 获取正常月的天数，并添加到monthArr数组中
    // 获取16进制的第2-4位，需要用到>>移位运算符
    for (let i = 32768; i > 8; i >>= 1) {
        monthArr.push(ly & i ? 30 : 29);
    }
    // 如果有闰月，需要把闰月的天数加上
    if (hasLeapMonth(ly)) {
        monthArr.splice(hasLeapMonth(ly), 0, leapMonthDays(ly));
    }
    return monthArr;
}

// 将农历年转换为天干，参数为农历年

// 将农历年转换为地支，参数为农历年

/**
 * 节气（参数为公历)
 * @param {*} sy
 * @param {*} sm
 * @param {*} sd
 */
function getSolarTerm(sy, sm, sd) {
    sm -= 1;
    let solarTermStr = '';
    //月份乘2是因为每月平均2节气对应二十四节气加一考虑存在闰月
    let tmp1 = new Date(31556925974.7 * (sy - 1900) + SOLAR_STERM_INFO[sm * 2 + 1] + Date.UTC(1900, 0, 6, 2, 5));
    let tmp2 = tmp1.getUTCDate();
    if (tmp2 == sd) {
        solarTermStr = SOLAR_STERM[sm * 2 + 1];
    }
    tmp1 = new Date(31556925974.7 * (sy - 1900) + SOLAR_STERM_INFO[sm * 2] + Date.UTC(1900, 0, 6, 2, 5));
    tmp2 = tmp1.getUTCDate();
    if (tmp2 == sd) {
        solarTermStr = SOLAR_STERM[sm * 2];
    }
    if (sd > 1) {
        sd -= 1;
    } else {
        sm -= 1;
        sd = 31;
        if (sm < 0) {
            sy -= 1;
            sm = 11;
        }
    }
    return solarTermStr;
}
module.exports = {
    sloarToLunar
};
