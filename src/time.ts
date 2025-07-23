/**
 * 获取当前时间的unix时间戳
 * @returns 当前时间戳，单位为秒
 */
export const unixNow = () => {
    return Math.floor(new Date().getTime() / 1000);
};

/**
 * 格式化日期
 * @param date 待格式化的日期对象 
 * @param format 格式化字符串，如"yyyy-MM-dd HH:mm:ss"
 * @returns 格式化后的日期字符串
 */
export const formatDate = (date: Date, format: string) => {
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (match) => {
        switch (match) {
            case "yyyy":
                return date.getFullYear().toString();
            case "MM":
                return (date.getMonth() + 1).toString();
            case "dd":
                return date.getDate().toString();
            case "HH":
                return date.getHours().toString();
            case "mm":
                return date.getMinutes().toString();
            case "ss":
                return date.getSeconds().toString();
            default:
                return "";
        }
    });
}
