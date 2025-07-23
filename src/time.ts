/**
 * 获取当前时间的unix时间戳
 * @returns 当前时间戳，单位为秒
 */
export const unixNow = () => {
    return Math.floor(new Date().getTime() / 1000);
};

/**
 * 格式化日期
 * @param date 待格式化的日期对象，或 Unix时间戳，单位为秒
 * @param format 格式化字符串，如"yyyy-MM-dd HH:mm:ss"
 * @returns 格式化后的日期字符串
 */
export const formatDate = (date: Date | number, format: string) => {
    const fnDate = typeof date === "number" ? new Date(date) : date; 
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (match) => {
        switch (match) {
            case "yyyy":
                return fnDate.getFullYear().toString();
            case "MM":
                return (fnDate.getMonth() + 1).toString();
            case "dd":
                return fnDate.getDate().toString();
            case "HH":
                return fnDate.getHours().toString();
            case "mm":
                return fnDate.getMinutes().toString();
            case "ss":
                return fnDate.getSeconds().toString();
            default:
                return "";
        }
    });
}
