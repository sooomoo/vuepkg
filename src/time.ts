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
    const fnDate = typeof date === "number" ? new Date(date * 1000) : date; 
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (match) => {
        switch (match) {
            case "yyyy":
                return fnDate.getFullYear().toString();
            case "MM":
                return (fnDate.getMonth() + 1).toString().padStart(2, "0");
            case "dd":
                return fnDate.getDate().toString().padStart(2, "0");
            case "HH":
                return fnDate.getHours().toString().padStart(2, "0");
            case "mm":
                return fnDate.getMinutes().toString().padStart(2, "0");
            case "ss":
                return fnDate.getSeconds().toString().padStart(2, "0");
            default:
                return "";
        }
    });
}
